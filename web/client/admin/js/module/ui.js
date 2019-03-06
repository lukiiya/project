define(function(require,exports){

	exports.clear = clear;
	exports.showMask = showMask;
	exports.closeMask = closeMask;
	exports.showLoading = showLoading;
	exports.closeLoading = closeLoading;
	exports.showNotice = showNotice;
	exports.showAlert = showAlert;
	exports.closeAlert = closeAlert;
	exports.showWindow = showWindow;
	exports.closeWindow= closeWindow;
	exports.showConfirm = showConfirm;
	exports.closeConfirm = closeConfirm;
	exports.showPagination = showPagination;

	var uiView = require('view/ui');

	function clear(){
		$(".mask").remove();
		//清除body留下的弹框
		for(var name in exports){
			if(/^close/ig.test(name)){
				if(isFunction(exports[name]))exports[name]();
			}
		}
	}

	function showMask(options){
		options = options || {};
		var id = options.id || "bodyMask";
		var zIndex = options.zIndex || 2;
		var opacity = options.opacity || 0.6;
		var onClick = (isFunction(options.onClick) && options.onClick) || function(){};
		$("body").children(".mask").each(function(){
			if(id == this.id)$(this).remove();
		});
		$("body").append(uiView.mask({
			id: id,
			zIndex: zIndex,
			opacity: opacity,
			filter: opacity*100,
			canClose: isFunction(options.onClick)
		}));
		$("#"+id).off().on("click",function(e){
			e.preventDefault();
			e.stopPropagation();
			onClick();
		});
	}

	function closeMask(options){
		options = options || {};
		var id = options.id || "bodyMask";
		$("#"+id).remove();
	}

	function showLoading(time){
		time = time || 10*1000;
		closeLoading();
		$("body").append(uiView.loading());
		showLoading.timer = setTimeout(closeLoading, time);	
	}

	function closeLoading() {
		clearTimeout(showLoading.timer);
		$("#loadingBox").remove();		
	}

	function showNotice(text, time) {
		time = time || 1000;
		$("#noticeBox").remove();
		var data = {
			text: text
		}
		$("body").append(uiView.notice(data));
		$("#noticeBox").fadeIn(500, function() {
			clearTimeout(showNotice.timer);
			showNotice.timer = setTimeout(function() {
				$("#noticeBox").fadeOut(1000);
			},time);
 		});
	}

	function showAlert(text, sureFun) {
		text = $.trim(text) || "";
		sureFun = sureFun || function() {};
		closeAlert();
		var data = {
			text: text
		}
		$("body").append(uiView.alert(data));
		$("#alertBtn").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			sureFun();
			closeAlert();
		});
	}

	function closeAlert(){
		$("#alertBox").remove();
	}

	function showWindow(options) {
		options = options || {};
		var html = $.trim(options.html) || "";
		closeWindow();
		var data = {
			html: html
		}
		$("body").append(uiView.window(data));
		$("#closeWindow").on('click', closeWindow);
	}

	function closeWindow(){
		$("#windowBox").remove();
	}

	function showConfirm(text, sureFun, cancelFun) {
		text = $.trim(text) || "";
		sureFun = sureFun || function() {};
		cancelFun = cancelFun || function() {};
		closeConfirm();
		var data = {
			text: text
		}
		$("body").append(uiView.confirm(data));
		$("#sureBtn").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			sureFun();
		});
		$("#cancelBtn").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			cancelFun();
			closeConfirm();
		});
	}

	function closeConfirm(){
		$("#confirmBox").remove();
	}

	function showPagination(options) {
		var pageNum = options.pageNum;
		var pageSize = options.pageSize;
		var totalCount = options.totalCount;
		var pageCodeId = options.pageCodeId;
		var pageCodeFun = options.pageCodeFun;
		var pageSum = Math.ceil(totalCount/pageSize);
		var start = 1;
		var end = 0;
		var upPageStyle = "";
		var downPageStyle = "";
		var html = [];
		if(pageNum > 1){
			upPageStyle = "visibility:visible";
		}else {
			upPageStyle = "visibility:hidden";
		}
		if(pageSum == pageNum){
			downPageStyle = "visibility:hidden";
		}else {
			downPageStyle = "visibility:visible";
		}
		if (pageSum <= 0) {
			upPageStyle = "visibility:hidden";	
			downPageStyle = "visibility:hidden";
		}
		if(pageNum > 4)start = pageNum - 4;
		if(start + 8 <= pageSum)end = start + 8;
		else {
			end = pageSum;
			start = end-8;
		}
		if(start <= 0)start = 1;
		html.push('<p class="page"><span class="totalBox">总计<span class="total">'+totalCount+'</span>条</span>');
		html.push('<input style="');
		html.push(upPageStyle);
		html.push('" pageNum="'+(pageNum-1)+'" class="btn" type="button" value="上一页"/>');
		var detail = []
		for(var i = start; i <= end; i++){
			detail.push('<span class="num '+(i==pageNum?'active':'')+'" pageNum="'+i+'">'+i+'</span>');
		}
		//显示开始和结束页码
		if(detail.length == 9){
			if(start>1){
				detail[0] = '<span class="num" pageNum="1">1</span>';
				detail[1] = '<span class="cut">···</span>';
			}
			if(end<pageSum){
				detail[8] = '<span class="num" pageNum="'+pageSum+'">'+pageSum+'</span>';
				detail[7] = '<span class="cut">···</span>';
			}
		}
		html.push(detail.join(''));
		html.push('<input style="');
		html.push(downPageStyle);
		html.push('" pageNum="'+(pageNum+1)+'" class="btn" type="button" value="下一页" />');
		html.push('</p>');
		//if(pageSum < 2)html = "";
		//else html = html.join('');
		html = html.join('');
		$("#"+pageCodeId).html(html);
		$("#"+pageCodeId+" [pageNum]").off();
		$("#"+pageCodeId+" [pageNum]").on("click",pageCodeFun);
	}
});