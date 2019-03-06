define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var downloadView = require('view/download');
	var auto = null;

	function init(view) {
		auto = !!common.getUrlParam("auto") || false;
		setMain(view);
		setContent();
	}

	function _init(view) {
		auto = null;	
	}

	function setMain(view) {
		if (common.isAndroidBrowser() || common.isIosBrowser()) {
			showMobile(view);
		} else {
			showPc(view);
		}
		if (auto) {
			download();
		}
	}

	function showPc(view) {
		var options = {
			className: 'pcDownload'
		}
		main.setMain(view, options);
		main.setContent(downloadView.pc({
			IMG_PATH: IMG_PATH
		}));
		$("#androidQrCode").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			$("#androidQrCode").fadeOut(function(){
				$("#androidQrCode").removeClass("show");
			});
		});
		$("#iosQrCode").off().on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			$("#iosQrCode").fadeOut(function(){
				$("#iosQrCode").removeClass("show");
			});
		});
		$('#androidBtn').off().on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			$("#androidQrCode").fadeIn(function(){
				$("#androidQrCode").addClass("show");
			});
		});	
		$('#iphoneBtn').off().on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			$("#iosQrCode").fadeIn(function(){
				$("#iosQrCode").addClass("show");
			});
		});	
	}

	function showMobile(view) {
	    var options = {
			className: 'mobileDownload'
		}
	    main.setMain(view, options);
		main.setContent(downloadView.mobile({
			IMG_PATH: IMG_PATH
		}));
		$("#mobileDownAndriod").click(function(){
			common.locationUrl('http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/android/com.shaimii.apk');
		});
		$("#mobileDownIos").on('click', function() {
			common.locationUrl('https://itunes.apple.com/us/app/id1154395135?l=zh&ls=1&mt=8');
		})
	}

	function download() {
//		if (common.isWeixinBrowser() && common.isAndroidBrowser()) {
//			common.locationUrl('http://app.qq.com/#id=detail&appid=1105618504');
//			return;
//		}
//		if (common.isIosBrowser()) {
//			common.locationUrl('https://itunes.apple.com/us/app/shai-mi-chang-sai-shi-yu-ce/id1144475279?l=zh&ls=1&mt=8');
//		} else if (common.isAndroidBrowser()) {
//			common.locationUrl('http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/android/com.shaimii_1.5.0.apk');
//		} else {
//			common.locationUrl('http://app.qq.com/#id=detail&appid=1105618504')	
//		}
		common.locationUrl('http://a.app.qq.com/o/simple.jsp?pkgname=com.shaimichang.myapplication');
	}

	function setContent() {

	}

});