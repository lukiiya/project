define(function(require,exports){

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var userCgi = require('cgi/user');
	var channelCgi = require('cgi/channel');
	var userListView = require('view/userList');
	var pageNum = null;
	var pageSize = null;

	function init(view) {
		pageNum = 1;
		pageSize = 10;
		setMain(view);
		setContent();
	}

	function _init(view){
		pageNum = null;
		pageSize = null;
	}

	function setMain(view) {
		var options = {
			title: "用户列表",
			className: 'user_mgmt',
		}
		main.setMain(view, options);
		main.setContent(userListView.content());
		$("#searchSubmit").on('click', searchSubmit);
	}


	function setContent() {
		getChannelList();
		getUserList();
	}

	function searchSubmit() {
		pageNum = 1;
		getUserList();	
	}

	function getChannelList() {
		var options = {
			pageNum: 1,
			pageSize: 100
		}
		channelCgi.getChannelList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			var html = [];
			html.push('<option value="">渠道(全部)</option>');
			html.push('<option value="0">平台</option>');
			for (var i = 0, length = list.length; i < length; i++) {
				var ob = list[i] || {};
				var channel = parseInt(ob.channel) || 0;
				if (channel <= 0) {
					continue;
				}
				var nickName = ob.nickName || '';
				var realName = ob.realName || '';
				var remark = ob.remark || '';
				var userName = nickName;
				if (realName) {
					userName += '(' + realName +  ')';	
				}
				if (!userName) {
					userName = remark;
				}
				userName = userName.replace(/['"\n<>]/g, '');
				html.push('<option value="' + channel + '">' + userName + '</option>');
			}
			html.push('<option value="-1">红包充值</option>');
			html.push('<option value="-2">体彩</option>');
			html.push('<option value="-3">福彩</option>');
			$('#channel').html(html.join(''));
		});
	}

	function getUserList() {
		var userName = trim($('#userName').val()) || null;
		var phone = trim($('#phone').val()) || null;
		var userRight = parseInt($('#userRight').val());
		var subscribe = parseInt($('#subscribe').val());
		var forbid = parseInt($('#forbid').val());
		var source = parseInt($('#source').val());
		var channel = parseInt($('#channel').val());
		if (isNaN(userRight)) {
			userRight = undefined;
		}
		if (isNaN(subscribe)) {
			subscribe = undefined;
		}
		if (isNaN(forbid)) {
			forbid = undefined;
		}
		if (isNaN(source)) {
			source = undefined;
		}
		if (isNaN(channel)) {
			channel = undefined;
		}
		var options = {
			userName: userName,
			phone: phone,
			userRight: userRight,
			subscribe: subscribe,
			forbid: forbid,
			source: source,
			channel: channel,
			pageNum: pageNum,
			pageSize: pageSize
		}
		userCgi.getUserList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			showPagination(totalCount);
			var list = ret.data && ret.data.list || [];
			for (var i = 0, length = list.length; i < length; i++) {
				var profileImg = (isString(list[i].profileImg) && [list[i].profileImg]) || list[i].profileImg || [];
				var personalImg = (isString(list[i].personalImg) && [list[i].personalImg]) || list[i].personalImg || [];
				var identityImg = (isString(list[i].identityImg) && [list[i].identityImg]) || list[i].identityImg || [];
				var businessImg = (isString(list[i].businessImg) && [list[i].businessImg]) || list[i].businessImg || [];
				var profileImgUrl = [];
				var personalImgUrl = [];
				var identityImgUrl = [];
				var businessImgUrl = [];
				$.each(profileImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && profileImgUrl.push(url);
				});
				$.each(personalImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && personalImgUrl.push(url);
				});
				$.each(identityImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && identityImgUrl.push(url);
				});
				$.each(businessImg, function(i, item) {
					var url = common.getResourceUrl(item);
					url && businessImgUrl.push(url);
				});
				list[i].profileImg = profileImgUrl.join('|');
				list[i].personalImg = personalImgUrl.join('|');
				list[i].identityImg = identityImgUrl.join('|');
				list[i].businessImg = businessImgUrl.join('|');
			}
			var data = {
				list: list
			}
			$("#userList").html(userListView.userList(data));
			$("#userList").find('[profileImg],[personalImg],[identityImg],[businessImg]').on('click', showImage);
			$("#userList [remark]").on('click', showRemark);
			$("#userList .loginUser").on('click', loginUser);
			$("#userList .modifyUser").on('click', modifyUser);
			$("#userList .chargeUser").on('click', chargeUser);
			$("#userList .modifyUserRight").on('click', modifyUserRight);
			$("#userList .userArticle").on('click', userArticle);
			$("#userList .setChannel").on('click', setChannel);
			$("#userList .forbidUser").on('click', forbidUser);
			main.activeTr('userList');
		});
	}

	function showPagination(totalCount) {
		var options = {
			pageNum: pageNum,
			pageSize: pageSize,
			totalCount: totalCount,
			pageCodeId: "pageCodeBox",
			pageCodeFun: pageCodeFun
		};
		ui.showPagination(options);
	}

	function pageCodeFun(e){
		pageNum = parseInt($(this).attr("pageNum")) || 1;
		getUserList();
	}

	function showImage() {
		var profileImg = trim($(this).attr('profileImg')) || "";
		var personalImg = trim($(this).attr('personalImg')) || "";
		var identityImg = trim($(this).attr('identityImg')) || "";
		var businessImg = trim($(this).attr('businessImg')) || "";
		if (profileImg) {
			profileImg = profileImg.split('|');	
		}
		if (personalImg) {
			personalImg = personalImg.split('|');	
		}
		if (identityImg) {
			identityImg = identityImg.split('|');	
		}
		if (businessImg) {
			businessImg = businessImg.split('|');	
		}
		var imgHtml = [];
		$.each(profileImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(personalImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(identityImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		$.each(businessImg, function(i, url) {
			url && imgHtml.push('<div><img src="'+url+'"/></div>');
		});
		var options = {
			html: imgHtml.join('')
		}
		ui.showWindow(options);
	}

	function showRemark(e) {
		var remark = trim($(this).attr('remark')) || "";
		var options = {
			html: '<p>'+ remark +'</p>'
		}
		ui.showWindow(options);
	}

	function loginUser() {
		var userId = parseInt($(this).attr('userId')) || 0;
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		var options = {
			userId: userId
		}
		userCgi.loginUser(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var url = location.protocol + "//" + location.host.replace(/^op/, 'www');
			url = url.replace(/[\?#].*/g, '') + '?cache=false#my';
			common.locationUrl(url, '_blank');
		});
	}

	function modifyUser() {
		var userId = parseInt($(this).attr('userId')) || 0;
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		var options = {
			html: userListView.modifyUser({
				userId: userId
			})
		}
		ui.showWindow(options);
		$("#cancelModifyUser").on('click', function() {
			ui.closeWindow();
		});
		$("#sureModifyUser").on('click', modifyUserSubmit);
		var options = {
			userId : userId
		}
		userCgi.getUserInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var realName = trim(data.realName) || '';
			var tag = trim(data.tag) || '';
			var phone = trim(data.phone) || '';
			var address = trim(data.address) || '';
			var personalImg = trim(data.personalImg) || '';
			var remark = trim(data.remark) || '';
			$('#modifyRealName').val(realName);
			$('#modifyTag').val(tag);
			$('#modifyPhone').val(phone);
			$('#modifyAddress').val(address);
			$('#modifyPersonalImg').val(personalImg);
			$('#modifyRemark').val(remark);
		});
	}

	function modifyUserRight() {
		var userId = parseInt($(this).attr('userId')) || 0;
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		var options = {
			html: userListView.modifyUserRight({
				userId: userId
			})
		}
		ui.showWindow(options);
		$("#cancelModifyUserRight").on('click', function() {
			ui.closeWindow();
		});
		$("#sureModifyUserRight").on('click', modifyUserRightSubmit);
		var options = {
			userId : userId
		}
		userCgi.getUserInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var userRight = parseInt(data.userRight) || 0;
			$('#modifyUserRight').val(userRight);
			$('#modifyUserRightBox [type=checkbox]').each(function(i, item) {
				var index = parseInt($(item).attr('index'));
				if (isNaN(index) || index <= 0) {
					return;	
				}
				item.checked = (userRight & Math.pow(2, index-1)) != 0;
			});
		});
	}

	function modifyUserSubmit() {
		var userId = parseInt($('#modifyUserId').val());
		var realName = trim($('#modifyRealName').val());
		var tag = trim($('#modifyTag').val());
		var phone = trim($('#modifyPhone').val());
		var address = trim($('#modifyAddress').val());
		var personalImg = trim($('#modifyPersonalImg').val());
		var remark = trim($('#modifyRemark').val());
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		var options = {
			userId : userId,
			realName: realName,
			tag: tag,
			phone: phone,
			address: address,
			personalImg: personalImg,
			remark: remark
		}
		userCgi.modifyUser(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice('用户信息修改成功');
			ui.closeWindow();
			getUserList();
		});
	}

	function modifyUserRightSubmit() {
		var userId = parseInt($('#modifyUserId').val());
		var userRight = parseInt($('#modifyUserRight').val());
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		$('#modifyUserRightBox [type=checkbox]').each(function(i, item) {
			var index = parseInt($(item).attr('index'));
			if (isNaN(index) || index <= 0) {
				return;	
			}
			if (item.checked) {
				userRight = userRight | Math.pow(2, index-1);
			} else {
				userRight = userRight & ~Math.pow(2, index-1);
			}
		});
		var options = {
			userId : userId,
			userRight: userRight
		}
		userCgi.modifyUserRight(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice('用户权限修改成功');
			ui.closeWindow();
			getUserList();
		});
	}

	function userArticle() {
		var userId = parseInt($(this).attr('userId')) || 0;
		if (isNaN(userId) || userId <= 0) {
			return;
		} 
		common.locationUrl('#userArticleList&userId=' + userId);
	}

	function chargeUser() {
		var userId = parseInt($(this).attr('userId')) || 0;
		var userName = trim($(this).attr('userName')) || '';
		if (isNaN(userId) || userId <= 0 || userName == '') {
			return;
		}
		var options = {
			html: userListView.chargeUser({
				userId: userId,
				userName: userName
			})
		}
		ui.showWindow(options);
		$("#cancelChargeUser").on('click', function() {
			ui.closeWindow();
		});
		$("#sureChargeUser").on('click', chargeUserSubmit);
	}

	function chargeUserSubmit() {
		var userId = parseInt($('#chargeUserId').val()) || 0;
		var userName = trim($('#chargeUserName').html()) || '';
		var financeType = parseInt($('#chargeFinanceType').val());
		var amount = parseFloat($('#chargeAmount').val()) || 0;
		amount = amount.toFixed(2);
		var remark = trim($('#chargeRemark').val()) || '';
		if (isNaN(userId) || userId <= 0 || userName == '') {
			return;
		}
		if (isNaN(financeType)) {
			ui.showNotice('请选择账户类型');
			return;
		}
		if (isNaN(amount) || amount == 0) {
			ui.showNotice('请填写正确金额');
			return;
		}
		if (remark == '') {
			ui.showNotice('请填写描述');
			return;	
		}
		if (remark.length > 8) {
			ui.showNotice('描述不能大于8个字');
			return;	
		}
		var amountMap = {'0': '米粒', '1': '彩金'};
		var options = {
			userId : userId,
			financeType: financeType,
			amount: amount * 100,
			remark: remark
		}
		ui.showConfirm('是否给 "'+userName+'" 充 <b style="color:#ff0000">'+amount+'</b> '+amountMap[financeType], function() {
			userCgi.chargeUser(options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('用户充值成功');
				ui.closeConfirm();
				ui.closeWindow();
			});
		});
		$('#confirmBox .mask').css('z-index', '9');
		$('#confirmBox .pop').css('z-index', '10');
	}


	function setChannel() {
		var userId = parseInt($(this).attr('userId')) || 0;
		var userName = trim($(this).attr('userName')) || '';
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		var options = {
			userId : userId
		}
		channelCgi.getChannelInfo(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var channel = parseInt(data.channel) || 0;
			var discard = parseInt(data.discard) || 0;
			var options = {
				html: userListView.setChannel({
					userId: userId,
					userName: userName,
					channel: channel,
					discard: discard
				})
			}
			ui.showWindow(options);
			$("#cancelSetChannel").on('click', function() {
				ui.closeWindow();
			});
			$("#sureSetChannel").on('click', setChannelSubmit);
		});
	}

	function setChannelSubmit() {
		var channel = parseInt($('#setChannel').val());
		var userId = parseInt($('#setUserId').val());
		var discard = parseInt($('#setDiscard').val());
		var remark = trim($('#setRemark').val());
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		var options = {
			userId : userId,
			channel: channel,
			remark: remark
		}
		var cgi = 'createChannel';
		var title = '设置';
		if (channel > 0 && discard == 0) {
			cgi = 'deleteChannel';
			title = '取消';
		}
		channelCgi[cgi](options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			ui.showNotice(title + '代理商成功');
			ui.closeWindow();
			getUserList();
		});
	}

	function forbidUser() {
		var userId = parseInt($(this).attr('userId')) || 0;
		var forbid = parseInt($(this).attr('forbid')) || 0;
		var userName = trim($(this).attr('userName')) || '';
		if (isNaN(userId) || userId <= 0) {
			return;
		}
		var cgi = 'forbidUser';
		var title = '封号';
		if (forbid == 1) {
			cgi = 'allowUser';
			title = '解封';
		}
		ui.showConfirm('是否把 "'+userName+'" '+title, function() {
			var options = {
				userId: userId
			}
			userCgi[cgi](options, function(ret) {
				if(ret.errCode != 0){
					ui.showNotice(ret.msg);
					return;
				}
				ui.showNotice('"'+userName+'" '+title+'成功');
				ui.closeConfirm();
				getUserList();
			});
		});
	}
});