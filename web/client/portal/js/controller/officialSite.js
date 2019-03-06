define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var officialSiteView = require('view/officialSite');
	var auto = null;

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
			
	}

	function setMain(view) {
		var options = {
			title: '晒米场官网',
			className: 'officialSite'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		if (common.isAndroidBrowser() || common.isIosBrowser()) {
			showMobile(data);
		} else {
			showPc(data);
		}
	}

	function setContent() {

	}
	
	function showPc(data) {
		main.setContent(officialSiteView.pc(data));
		$("#hoverCode,#topCode").hover(function(e) {
			e.preventDefault();
			e.stopPropagation();
			$("#topCode").show();
		},function (e) { 
			e.preventDefault();
			e.stopPropagation();
            $("#topCode").hide();  
        });
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
		$('#topAndroidBtn,#bottomAndroidBtn').off().on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			$("#androidQrCode").fadeIn(function(){
				$("#androidQrCode").addClass("show");
			});
		});	
		$('#topIphoneBtn,#bottomIphoneBtn').off().on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			$("#iosQrCode").fadeIn(function(){
				$("#iosQrCode").addClass("show");
			});
		});	
	}
	
	function showMobile(data) {
		main.setContent(officialSiteView.mobile(data));
		$("#mobileTopDownAndriod,#mobileBottomDownAndriod").click(function(){
			common.locationUrl('http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/android/com.shaimii.apk');
		});
		$("#mobileTopDownIos,#mobileBottomDownIos").on('click', function() {
			common.locationUrl('https://itunes.apple.com/us/app/id1154395135?l=zh&ls=1&mt=8');
		})
	}
});