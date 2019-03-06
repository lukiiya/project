define(function(require,exports) {

	exports.init = init;
	exports._init = _init;

	require('external/echarts');
	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var weixin = require('module/weixin');
	var userCgi = require('cgi/user');
	var planCgi = require('cgi/plan');
	var focusCgi = require('cgi/focus');
	var replayCgi = require('cgi/replay');
	var userDetailView = require('view/userDetail');
	var userNo = null;
	var tab = null;
	var pageNum = null;
	var pageSize = null;
	var userRight = null;

	function init(view) {
		userNo = trim(common.getUrlParam("userNo")) || "";
		tab = parseInt(common.getUrlParam("tab")) || 1;
		pageNum = 1;
		pageSize = 8;
		setMain(view);
		setContent();
	}

	function _init(view) {
		userNo = null;
		tab = null;
		pageNum = null;
		pageSize = null;
		userRight = null;
	}

	function setMain(view) {
		var options = {
			className: 'readExpert'
		}
		main.setMain(view, options);
		main.setContent(userDetailView.content());
		$('#backBtn').click(function(e) {
			common.historyBack();
		});	
		$('#homeBtn').click(function(e) {
			common.locationUrl('#home');
		});
	}

	function setContent() {
		getExpertInfo();
		activeFocus();
	}

	function getExpertInfo() {
		var options = {
			userNo: userNo
		}
		userCgi.getUserInfo(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var user = ret.data || {};
			var realName = trim(user.realName) || "";
			var nickName = trim(user.nickName) || "";
			var profileImg = trim(user.profileImg) || "";
			var personalImg = trim(user.personalImg) || "";
			var remark = trim(user.remark) || "";
			var userImg = personalImg || profileImg || (IMG_PATH + 'user_profile.png');
			var userName = realName || nickName;
			var userTag = user.tag;
			var continueWin = parseInt(user.continueWin) || 0;
			var winCount = parseInt(user.winCount) || 0;
			var profitRate = parseInt(user.profitRate) || 0;
			var winRate = parseInt(user.winRate) || 0;
			var focusStatus = parseInt(user.focusStatus) || 0;
			userRight = user.userRight || {};
			if (focusStatus == 1) {
				$('#focus').removeClass("active").html('+关注').off().on('click', createFocus).show();
			} else if (focusStatus == 2) {
				$('#focus').addClass("active").html('已关注').off().on('click', cancelFocus).show();
			}
			if (!isNaN(continueWin) && continueWin > 1) {
				$('#continueWin').html(continueWin);
				$('#continueWinBox').show();
			} else if(!isNaN(winCount) && winCount > 0) {
				$('#winCount').html(winCount);
				$('#winCountBox').show();
			} else if (!isNaN(profitRate) && profitRate > 0) {
				$('#profitRate').html(profitRate);
				$('#profitRateBox').show();
			} else if (!isNaN(winRate) && winRate > 0) {
				$('#winRate').html(winRate);
				$('#winRateBox').show();
			}
			$("#userImg").attr("src", userImg);
			$("#userImg").on("click", previewImage);
			$("#userName").html(userName);
			if (!remark) {
				$("#moreUserRemark").hide();	
			} else {
				$("#moreUserRemark").show();
				if (remark.length > 50) {
					$("#userRemarkBox").removeClass("active");
				}
			}
			$("#moreUserRemark").on("click", function(e) {
				$("#userRemarkBox").toggleClass("active");
			});
			$("#userRemark").html(remark);
			//设置分享
			var user = common.getLoginUser();
			var spreaderUserNo = trim(user && user.userNo || '');
			var spreaderUserNoUrl = spreaderUserNo ? '?spreaderUserNo=' + spreaderUserNo : '';
			var shareData = {
				title: userName,
				link: location.href.replace(/[#\?].*/g, '') + spreaderUserNoUrl + '#userDetail&userNo=' + userNo,
				imgUrl: userImg,
				desc: remark + '|晒米场'
			}
			ui.setShare(shareData);
			setTab();
		});
	}

	function moreList() {
		//这里空的原因，是留着动态改变函数内容的
	}

	function getPlanList(append) {
		main.unsetScrollLoad();
		moreList = function() {
			pageNum++;
			getPlanList(true);
		}
		var matchStatus = 0;
		var recommendType = 0;
		if (tab == 1) {
			matchStatus = 4
		} else if (tab == 2) {
			matchStatus = 3;
			recommendType = 1
		} else if (tab == 3) {
			matchStatus = 3;
			recommendType = 2
		};
		var options = {
			userNo: trim(userNo),
			matchStatus: matchStatus || 4,
			needAccess: true,
			pageNum: pageNum,
			pageSize: pageSize,
			recommendType: recommendType
		}
		planCgi.getPlanList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var maxPageNum = Math.ceil(totalCount / pageSize);
			if (pageNum < maxPageNum) {
				main.setScrollLoad(moreList);
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list,
				IMG_PATH: IMG_PATH
			}
			if (append) {
				$("#planList").append(userDetailView.planList(data));
			} else {
				$("#planList").html(userDetailView.planList(data));
			}
			$("#planList .planItem").off().on("click", accessOrPayPlan);
			if (pageNum >= maxPageNum) {
				pageNum = 1;
				pageSize = 8;
				getReplayList();
			}
			$(".bet_btn").on('click',function(e){
				e.preventDefault();
				e.stopPropagation();
				var planNo = trim($(this).attr("planNo"));
				var matchNum = parseInt($(this).attr("matchNum"));
				var maxBettypeOdds = parseFloat($(this).attr("maxBettypeOdds"));
				var recommendCount = parseInt($(this).attr("recommendCount"));
				var planAmount = parseInt($(this).attr("planAmount"));
				var data = {
					planNo: planNo,
					matchNum: matchNum,
					maxBettypeOdds: maxBettypeOdds,
					recommendCount: recommendCount,
					planAmount: planAmount
				}
				ui.showCreateTicketOrder(data);
			});
		}, function() {
			main.setScrollLoad(moreList);
		});
	}

	function getPlanTrendList() {
		var recommendType = 0;
		if (tab == 2) {
			recommendType = 1
		} else if (tab == 3) {
			recommendType = 2
		};
		if (recommendType <= 0) {
			$("#planTrendChartBox").hide().html('');
			return;
		}
		var options = {
			userNo: trim(userNo),
			recommendType: recommendType
		}
		planCgi.getPlanTrendList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data && ret.data.list || [];
			if (list.length <= 0) {
	        	$("#planTrendChartBox").hide().html('');
	        	return;
	        }
			var createY = function (seriesData) {//Y轴数据
	            var yDatas = [], obj = {};
	            for(var i = 0, length = seriesData.length; i < length; i++) {
	                if(seriesData[i] < 0) {
	                    yobj = {
	                        value: seriesData[i],
	                        itemStyle: { 
	                        	normal: { 
	                        		color: '#424e67' 
	                        	} 
	                        }
	                    };
	                } else {
	                    yobj = {
	                        value: seriesData[i],
	                        itemStyle: { 
	                        	normal: { 
	                        		color: '#f8645c' 
	                        	} 
	                        }
	                    }
	                }
	                yDatas.push(yobj);
	            }
	            return yDatas;
	        }
	        $("#planTrendChartBox").show().html(userDetailView.planTrendChartBox());
			var chartHead = $(".chart_box .chart_head");
			var chartWrap = $('.chart_wrap');
			chartHead.off().on('click', function(e) {
				var arrow = $(this).find('.arrow').eq(0);
				var isClose = /arrow_down/.test(arrow.attr('class'));
				chartHead.find('.arrow_up').attr('class', 'arrow arrow_down');
				chartWrap.hide();
				if (isClose) {
					arrow.attr('class', 'arrow arrow_up');
					chartWrap.show();
				}
			});
			//初始化echarts实例
	        var myChart = echarts.init(document.getElementById('planTrendChart'));
	        // 指定图表的配置项和数据
	        var option = {
	        	grid: {
	        		top: 40,
	        		right: 30,
	        		bottom: 40,
	        		left: 30
	        	},
	            xAxis: {
	                name: "近20场",
	                nameLocation: "middle",
	                nameGap: 20,
	                type: "category",
	                boundaryGap : false,
	                axisLabel: {
	                    show: false,
	                    interval: 0
	                },
	                axisTick: {
	                	show: false
	                },
	                axisLine: {
	                    lineStyle:{
	                        color:'#666666'
	                    }
	                }
	            },
	            yAxis: {
	                type: "value",
	                name: "红",
	                nameTextStyle: {
	                	color: '#f63946'
	                },
	                interval: 5,
	                axisLabel: {
	                    formatter: '{value}'
	                },
	                axisTick: {
	                	show: false
	                },
	                nameLocation: "end",
	                axisLine: {
	                    lineStyle:{
	                        color:'#666666'
	                    }
	                }
	            },
	            series: [{
	                name: '连红',
	                type: 'line',
	                smooth: true,
	                symbol: "circle",
	                symbolSize: 7,
	                label: {
	                    normal: {
	                        show: true,
	                        position: "bottom"
	                    },
	                },
	                lineStyle: {
                        normal: {
                        	color: "#54b6ea",
                        	width: 1
                        }
	                },
	                data: createY(list),
	                markPoint: {
	                    data: [{
	                        name: '连红',
	                        type: 'max',
	                        symbolSize: 30,
	                        itemStyle: {
	                            normal: {
	                                color: '#f8645c'
	                            }
	                        }
	                    },{
	                        name: '连黑',
	                        type: 'min',
	                        symbolSize: 30,
	                        itemStyle: {
	                            normal: {
	                                color: '#424e67'
	                            }
	                        }
	                    }]
	                }
	            }]
	        };
	        // 使用刚指定的配置项和数据显示图表。
	        myChart.setOption(option);
		});	
	}

	function setTab() {
		var data = {
			userRight: userRight
		};
		$("#tabBox").html(userDetailView.tabBox(data));
		var tabItem = $("#tabBox .ui-flex_item");
		tabItem.on("click", function(e) {
			$("#noMatch").hide();
			$("#replayList").hide();
			tabItem.removeClass('active');
			$(this).addClass('active');
			tab = parseInt($(this).attr("tab"));
			pageNum = 1;
			pageSize = 8;
			if (userRight['1']) {
				getPlanTrendList();
				getPlanList();
			} else if (userRight['3']) {
				getDigitalPlanList();
			}
		});
		//默认选中状态
		var tabIndex = -1;
		tabItem.each(function (i, item) {
			var mTab = parseInt($(this).attr("tab"));
			if (mTab == tab) {
				tabIndex = i;
				return;
			}
		});
		if (tabIndex < 0) {
			tabIndex = 0;
		}
		var item = tabItem.eq(tabIndex);
		item.click();
	}

	function accessOrPayPlan(e) {
		e.preventDefault();
		e.stopPropagation();
		var setHistoryBack = function () {
			if (userNo && tab) {
				common.setHistoryBack("#userDetail&userNo=" + userNo + "&tab=" + tab);
			}
		};
		var planNo = trim($(this).attr("planNo"));
		var amount = parseInt($(this).attr("amount"));
		var access = trim($(this).attr("access"));
		if (!planNo || isNaN(amount) || amount < 0) {
			return;	
		}
		if (access == "true") {
			if (userRight['1']) {
				common.locationUrl("#planDetail&planNo=" + planNo);
			} else if (userRight['3']) {
				common.locationUrl("#digitalPlanDetail&planNo=" + planNo);
			}
			setHistoryBack();
			return;
		}
		if (userRight['1']) {
			planType = 1
		} else if (userRight['3']) {
			planType = 2
		}
		var data = {
			planNo: planNo,
			amount: amount,
			callback: setHistoryBack,
			planType: planType
		}
		ui.showCreateOrder(data);
	}

	function previewImage(e) {
		e.preventDefault();
		e.stopPropagation();
		var current = trim($(this).attr('src')) || '';
		var urls = [current];
		weixin.call("previewImage", {
			current: current,// 当前显示图片的http链接
			urls: urls// 需要预览的图片http链接列表
		});
	}

	function createFocus() {
		var options = {
			userNo: userNo
		}
		ui.showConfirm("关注专家，同时关注“晒米场”微信公共号，您的微信将在第一时间收到专家推荐的更新通知。如果您觉得骚扰，可以取消关注该专家。", function sure() {
			focusCgi.createFocus(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				ui.showNotice('添加关注成功');
				ui.closeConfirm();
				getExpertInfo();
			});
		}, function cancel() {

		});
	}

	function cancelFocus() {
		var options = {
			userNo: userNo
		}
		ui.showConfirm("您将收不到专家推荐的更新通知。您确认取消关注吗？", function sure() {
			focusCgi.cancelFocus(options, function(ret) {
				if (ret.errCode != 0) {
					ui.showNotice(ret.msg);
					return;
				}
				var data = ret.data || {};
				ui.showNotice('取消关注成功');
				ui.closeConfirm();
				getExpertInfo();
			});	
		}, function cancel() {

		});
	}

	function activeFocus() {
		var options = {
			userNo: userNo
		}
		focusCgi.activeFocus(options);
	}

/*	function getUserArticleList(append) {
		main.unsetScrollLoad();
		moreList = function() {
			pageNum++;
			getUserArticleList(true);
		}
		var options = {
			pageNum: pageNum,
			pageSize: pageSize,
			userNo: trim(userNo)
		}
		userCgi.getUserArticleList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var maxPageNum = Math.ceil(totalCount / pageSize);
			if (pageNum < maxPageNum) {
				main.setScrollLoad(moreList);
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			if (append) {
				$("#userArticleList").append(userDetailView.userArticleList(data));
			} else {
				$("#userArticleList").html(userDetailView.userArticleList(data));
			}
			$("#userArticleList .shaimi_sport").off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var articlelink = trim($(this).attr("articlelink"));
				if (articlelink) {
					common.locationUrl(articlelink);
				}
			});
			var planLength = $('#planList').children().length;
			var userArticleLength = $('#userArticleList').children().length;
			if (userArticleLength > 0) {
				$("#userArticleList").show();
			} else if (planLength <= 0) {
				if (userRight['3']) {
					$("#default_img").removeClass('default').addClass('digital_default');
				}
				$("#noMatch").show();
			}
		}, function() {
			main.setScrollLoad(moreList);
		});
	}*/
	
	function getReplayList(append) {
		main.unsetScrollLoad();
		moreList = function() {
			pageNum++;
			getReplayList(true);
		}
		var options = {
			pageNum: pageNum,
			pageSize: pageSize,
			userNo: trim(userNo)
		}
		replayCgi.getReplayList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var maxPageNum = Math.ceil(totalCount / pageSize);
			if (pageNum < maxPageNum) {
				main.setScrollLoad(moreList);
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list
			}
			if (append) {
				$("#replayList").append(userDetailView.replayList(data));
			} else {
				$("#replayList").html(userDetailView.replayList(data));
			}
			$("#replayList .replayItem").off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var replayNo = trim($(this).attr("replayNo"));
				if (!replayNo) {
					return 
				}
				if (replayNo) {
					common.locationUrl("#replayDetail&replayNo=" + replayNo);
				} 
			});
			var planLength = $('#planList').children().length;
			var replayListLength = $('#replayList').children().length;
			if (replayListLength > 0) {
				$("#replayList").show();
			} else if (planLength <= 0) {
				if (userRight['3']) {
					$("#default_img").removeClass('default').addClass('digital_default');
				}
				$("#noMatch").show();
			}
		}, function() {
			main.setScrollLoad(moreList);
		});
		
	}
	
	function getDigitalPlanList(append) {
		main.unsetScrollLoad();
		moreList = function() {
			pageNum++;
			getDigitalPlanList(true);
		}
		var planStatus = 0;
		if (tab == 1) {
			planStatus = 1
		} else if (tab == 2) {
			planStatus = 2;
		} 
		var options = {
			userNo: trim(userNo),
			planStatus: planStatus || 1,
			needAccess: true,
			pageNum: pageNum,
			pageSize: pageSize
		}
		planCgi.getDigitalPlanList(options, function(ret) {
			if(ret.errCode != 0){
				ui.showNotice(ret.msg);
				return;
			}
			var totalCount = (ret.data && ret.data.totalCount) || 0;
			var maxPageNum = Math.ceil(totalCount / pageSize);
			if (pageNum < maxPageNum) {
				main.setScrollLoad(moreList);
			}
			var list = ret.data && ret.data.list || [];
			var data = {
				list: list,
				IMG_PATH: IMG_PATH
			}
			if (append) {
				$("#planList").append(userDetailView.digitalPlanList(data));
			} else {
				$("#planList").html(userDetailView.digitalPlanList(data));
			}
			$("#planList .planItem").off().on("click", accessOrPayPlan);
			if (pageNum >= maxPageNum) {
				pageNum = 1;
				pageSize = 8;
				getReplayList();
			}
			$(".bet_btn").on('click',function(e){
				e.preventDefault();
				e.stopPropagation();
				var planNo = trim($(this).attr("planNo"));
				var matchNum = parseInt($(this).attr("matchNum"));
				var maxBettypeOdds = parseFloat($(this).attr("maxBettypeOdds"));
				var recommendCount = parseInt($(this).attr("recommendCount"));
				var planAmount = parseInt($(this).attr("planAmount"));
				var data = {
					planNo: planNo,
					matchNum: matchNum,
					maxBettypeOdds: maxBettypeOdds,
					recommendCount: recommendCount,
					planAmount: planAmount
				}
				ui.showCreateDigitalTicketOrder(data);
			});
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
});