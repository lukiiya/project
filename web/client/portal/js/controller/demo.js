define(function(require,exports) {

	exports.init = init;
	exports._init = _init;
	
	require('external/vue');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var demoView = require('view/demo');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {

	}

	function setMain(view) {
		//之前的风格
		var data = {
			static1: '静态1',
			static2: '静态2',
			name1: '名字1',
			name2: '名字2',
			message1: '消息1',
			message2: '消息2',
			message3: '消息3',
			message4: '消息4'
		};
		view.setContent(demoView.content(data));
		//使用vue
		var app = new Vue({
			el: '#myContent',
			data: data
		});
		//模拟数据改变
		setTimeout(function() {
			app.name1 = '变化的名字1';
			app.name2 = '变化的名字2';
			app.message1 = '变化的消息1';
			app.message2 = '变化的消息2';
			app.message3 = '变化的消息3';
			app.message4 = '变化的消息4';
		}, 3000);
	}

	function setContent() {

	}
});