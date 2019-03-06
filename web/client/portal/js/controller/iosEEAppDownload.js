define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var iosEEAppDownloadView = require('view/iosEEAppDownload');

	function init(view) {
		setMain(view);
		setContent();
	}

	function _init(view) {
			
	}

	function setMain(view) {
		var options = {
			title: "苹果企业版下载",
			className: 'iosAppDownload'
		}
		var data = {
			IMG_PATH: IMG_PATH
		}
		main.setMain(view, options);
		main.setContent(iosEEAppDownloadView.content(data));
//		$("#download").on('click', function() {
//			common.locationUrl('');
//		})
	}

	function setContent() {

	}
});