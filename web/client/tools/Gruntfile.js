
var modulePath = "./js/";

require(modulePath+'template');
var child_process = require('child_process');
var fs = require('fs');
var iconv = require('iconv-lite');
iconv.extendNodeEncodings();

function trim(str){
	if (typeof(str) != 'string')return str;
	return str.replace(/(^\s*)|(\s*$)/g,"");
}

function tplComplie(action, filepath, target){
	fs.readFile(filepath,"utf8",function(err,data){
		if(err)throw err;
		var lastIndex = filepath.lastIndexOf("\\");
		var fileName = filepath.substr(lastIndex+1);
		var tplFilePath = filepath.substring(0,lastIndex+1).replace(/\\html\\/,"\\js\\view\\");
		var tplFileName = fileName.replace(/\.html/,".js");
		if (!fs.existsSync(tplFilePath)) {
			fs.mkdirSync(tplFilePath);
		}
		//console.info("@@@@@\n\n\n");
		console.info("源文件："+filepath);
		//console.info("模版路径"+tplFilePath);
		//console.info("模版名称："+tplFileName);
		//console.info("模版文件："+tplFilePath+tplFileName);
		//console.info("\n\n\n@@@@@");
		//根id, 目的是防止自定义标签，嵌套自己引起死循环
		var customTag = function(id,str) {
			var newStr = str.replace(reg3, function(str, $1, $2) {
				var curId = trim($1) || trim($2) || '';
				var curTag = trim(tagMap[curId]);
				if (curTag && curId != id) {
					str = curTag;
				}
				return str;
			});
			if (newStr != str) {
				newStr = customTag(id,newStr);
			}
			return newStr;
		}
		var complie = "";
		var reg1 = /<script[^<>]*?type=["']text\/html["'][^<>]*?id=["'][^<>]*?["'][^<>]*?>[\d\D]*?<\/script>/g;
		var reg2 = /<script[^<>]*?type=["']text\/html["'][^<>]*?id=["']([^<>]*?)["'][^<>]*?>([\d\D]*?)<\/script>/;
		var reg3 = /<(\w+)[^<>]*?>[^<>]*<\/\1>|<(\w+)[^<>]*?\/>/g;//自定义标签
		var scripts = trim(data).match(reg1);
		var tpls = [];
		var tagMap = {};
		if(scripts){
			for(var i = 0, length = scripts.length; i < length; i++){
				var temp = scripts[i].match(reg2);
				if(temp && temp.length == 3){
					var id = trim(temp[1]);
					var code = trim(temp[2]);
					tpls.push({id:id,code:code});
					tagMap[id] = code;
				}	
			}
		}
		var expo = [];
		var funs = [];
		for(var i = 0, length = tpls.length; i < length; i++){
			expo.push('exports.'+tpls[i].id+'='+tpls[i].id+';');
			var temp = template.compile(customTag(tpls[i].id,tpls[i].code)).toString();
			temp = 'function '+tpls[i].id+'($data){return ('+temp+').call(templateUtils,$data).toString()}';
			funs.push(temp);	
		}
		var code = [];
		if(target != 'publish')code.push('define(function(require,exports){');
		code.push(fs.readFileSync(modulePath+"templateUtils.js","utf8"));
		code.push(expo.join(""));
		code.push(funs.join(""));
		if(target != 'publish')code.push('});');
		complie = code.join('');
		fs.writeFile(tplFilePath+tplFileName,complie,"utf8",function(err){
			if(err)throw err;
			console.info("模版文件："+tplFilePath+tplFileName+" 编译成功！");
		});
	});
}

module.exports = function(grunt) {

	grunt.initConfig((function(){
		var curTime = grunt.template.today("yyyymmddHHMMss");
		var myTask = grunt.option('myTask') || "";
		var myTarget = grunt.option('myTarget') || "";
		var myEnv = grunt.option('myEnv') || "";
		var myDesc = grunt.option('myDesc') || "";
		if(myDesc.length > 20)myDesc = myDesc.substr(0,20);
		var config = {};

		//watch插件
		config.watch = {};
		config.watch[myTarget] = {
			files: '../'+myTarget+'/html/**/*.html'
		};

		//clean插件
		config.clean = {
        	options: {
        		force : true
        	}
        };
        config.clean[myTarget] = ['../'+myTarget+'/publish/'+myEnv+'/*'];

        //copy插件
        config.copy = {};
		config.copy[myTarget+'-html'] = {
    		options: {
				process: function(content, srcpath) {
					content = content.replace(/ENV\s*?=\s*?(["']).*?\1/g,'ENV = "'+myEnv+'-debug"');
					content = content.replace(/<script\s*?src\s*?=\s*?(["'])\.\/js\/access\/([^\\]*?)\.js\1/g,'<script src="./js/$2.js"');
					return content;
				}
			},
			expand: true,
			flatten: true,
			cwd: '../'+myTarget,
			src: ['*.html'],
    		dest: '../'+myTarget+'/publish/'+myEnv
		}
		config.copy[myTarget+'-access'] = {
    		expand: true,
    		cwd: '../'+myTarget+'/js/access',
    		src: '**/*.js',
    		dest: '../'+myTarget+'/publish/'+myEnv+'/js/raw'
    	};
		config.copy[myTarget] = {
    		expand: true,
    		cwd: '../'+myTarget,
    		src: ['**','!*.html','!html/**','!js/**','!publish/**','!tools/**'],
    		dest: '../'+myTarget+'/publish/'+myEnv
    	};

    	//uglify插件
    	config.uglify = {
        	options: {
        		mangle: true, //是否混淆变量名
        	}
        };
        config.uglify[myTarget] = {
        	options: {
				sourceMap: true,
                sourceMapName: function(path) {
                	return path.replace('/js/', '/js/map/')+'.map';
                }
        	},
			files: [{
				expand: true,
				cwd: '../'+myTarget+'/publish/'+myEnv+'/js/raw',
				src: ['**/*.js'],
				dest: '../'+myTarget+'/publish/'+myEnv+'/js'
			}]
		};

		//concat插件
		config.concat = {
			options: {
				process: function(src, filepath) {
					var id = filepath.replace(/^.*\/js\/(.*)\.js$/,'$1');
					src = src.replace(/define\s*?\(\s*?function\s*?\(/,"define('"+id+"',function(");
					return src;
				}
			}
		};
		config.concat[myTarget] = {
			files: {}	
		};
		config.concat[myTarget]['files']['../'+myTarget+'/publish/'+myEnv+'/js/raw/cgi.js'] = ['../'+myTarget+'/js/cgi/**/*.js'];
		config.concat[myTarget]['files']['../'+myTarget+'/publish/'+myEnv+'/js/raw/controller.js'] = ['../'+myTarget+'/js/controller/**/*.js'];
		//external.js都是外部插件,都已经是压缩过的,只需要合并就好,没必要再压缩(浪费打包时间)
		config.concat[myTarget]['files']['../'+myTarget+'/publish/'+myEnv+'/js/external.js'] = ['../'+myTarget+'/js/external/sea.js','../'+myTarget+'/js/external/**/*.js'];
		config.concat[myTarget]['files']['../'+myTarget+'/publish/'+myEnv+'/js/raw/module.js'] = ['../'+myTarget+'/js/module/**/*.js'];
		config.concat[myTarget]['files']['../'+myTarget+'/publish/'+myEnv+'/js/raw/view.js'] = ['../'+myTarget+'/js/view/**/*.js'];

		//compress插件
		config.compress = {};
		config.compress[myTarget] = {
			options: {
				archive: '../'+myTarget+'/publish/history/'+myEnv+'/'+(myDesc+curTime)+'.zip'
			},
			files: [
				{expand: true, cwd: '../'+myTarget+'/publish/'+myEnv, src: ["**"], dest: (myDesc+curTime)}
			]
		};
		return config;
	})());

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-compress');

	grunt.registerTask('cmd', '命令行任务', function() {
		var length = arguments.length;
		if(length <= 0){
			console.log("cmd参数有误");
			return;
		}
		var cmd = "";
		var args = [];
		var options = {
			encoding: "gbk"	
		}
		for (var i = 0; i < length; i++) {
			if(i == 0)cmd = arguments[i];
			else args.push(arguments[i]);
		}
		var done = this.async();
		child_process.execFile(cmd, args, options, function(error, stdout, stderr){
			var result = error ? stderr : stdout;
			console.log(result);
			done(true);	
		});	
	});

	grunt.registerTask('taskMaster', '前端工具', function() {
		var myTask = trim(grunt.option('myTask')) || "";
		var myTarget = trim(grunt.option('myTarget')) || "";
		var myEnv = trim(grunt.option('myEnv')) || "";
		var myDesc = trim(grunt.option('myDesc')) || "";
		var myHistory = trim(grunt.option('myHistory')) || "";
		if(myTask == ""){
			grunt.log.writeln('运行任务不能为空');
			return;
		}
		if(myTarget == ""){
			grunt.log.writeln('运行任务目标不能为空');
			return;
		}
		if(myTask == "watch"){
			grunt.log.writeln('开始运行 "模版编译" 任务');
			grunt.task.run('watch:'+myTarget);
		}else if(myTask == "jsCompress"){
			grunt.log.writeln('开始运行 "js压缩" 任务');
			grunt.task.run('uglify:jsCompress');
		}else if(myTask == "packet"){
			if(myEnv == ""){
				grunt.log.writeln('运行任务目标环境不能为空');
				return;
			}
			var cleanTask = grunt.config.get("clean") || {};
			var publishPath = (cleanTask[myTarget] || "").toString().replace(/\/[^\/]*?$/,'');
			if(publishPath == ""){
				grunt.log.writeln("发布目录不能为空");	
				return;
			}
			var taskList = [];
			//清空发布目录
			taskList.push('clean:'+myTarget);
			//拷贝根目录所有入口html到发布目录
			taskList.push('copy:'+myTarget+'-html');
			//拷贝css,img,sprite,other等等..到发布目录
			taskList.push('copy:'+myTarget);
			//拷贝access里的js文件,到发布的js/raw目录
			taskList.push('copy:'+myTarget+'-access');
			//合并js里的"非入口"的js文件,到发布的js/raw目录
			taskList.push('concat:'+myTarget);
			//压缩发布目录里的js/raw的js到发布目录
			taskList.push('uglify:'+myTarget);
			grunt.task.run(taskList);
		}else if(myTask == "publish"){
			if(myEnv == ""){
				grunt.log.writeln('运行任务目标环境不能为空');
				return;
			}
			var cleanTask = grunt.config.get("clean") || {};
			var publishPath = (cleanTask[myTarget] || "").toString().replace(/\/[^\/]*?$/,'');
			if(publishPath == ""){
				grunt.log.writeln("发布目录不能为空");	
				return;
			}
			var publishHistoryPath = publishPath.replace('publish/'+myEnv,'publish/history/'+myEnv);
			var taskList = [];
			var localPath = '..\\'+publishPath.replace(/\//g, '\\');
			var cosPath = null;
			if (myTarget == 'portal') {
				cosPath = '/'+myEnv+'/shaimi';	
			} else if (myTarget == 'admin') {
				cosPath = '/'+myEnv+'/shaimiAdmin';
			}
			if (!cosPath) {
				grunt.log.writeln("cosPath变量设置异常");	
				return;	
			}
			var cosDbPath = '.\\cos_sync\\db';
			taskList.push('cmd:./SlikSvn/bin/svn.exe:update:'+publishPath);
			taskList.push('cmd:./SlikSvn/bin/svn.exe:add:--force:'+publishPath);
			taskList.push('cmd:./SlikSvn/bin/svn.exe:commit:'+publishPath+':-m:'+myDesc);
			//cos操作
			taskList.push('cmd:./SlikSvn/bin/svn.exe:update:'+cosDbPath);
			taskList.push('cmd:.\\cos_sync\\start_cos_sync.bat:'+localPath+':'+cosPath);
			taskList.push('cmd:./SlikSvn/bin/svn.exe:add:--force:'+cosDbPath);
			taskList.push('cmd:./SlikSvn/bin/svn.exe:commit:'+cosDbPath+':-m:'+myDesc);
			if (!!myHistory === true) {
				taskList.push('compress:'+myTarget);
				taskList.push('cmd:./SlikSvn/bin/svn.exe:update:'+publishHistoryPath);
				taskList.push('cmd:./SlikSvn/bin/svn.exe:add:--force:'+publishHistoryPath);
				taskList.push('cmd:./SlikSvn/bin/svn.exe:commit:'+publishHistoryPath+':-m:'+myDesc);
			}
			grunt.task.run(taskList);
		}
	});

	grunt.event.on('watch',tplComplie);
};