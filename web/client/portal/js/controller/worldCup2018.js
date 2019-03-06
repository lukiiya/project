define(function(require, exports) {

	exports.init = init;
	exports._init = _init;

	var common = require('module/common');
	var ui = require('module/ui');
	var main = require('module/main');
	var matchCgi = require('cgi/match');
	var orderCgi = require('cgi/order');
	var worldCup2018View = require('view/worldCup2018');
	var pageNum = null;
	var pageSize = null;
	var tab = null;
	var oddsArr = null;
	var selected = null;

	function init(view) {
		tab = parseInt(common.getUrlParam("tab")) || 1;
		pageNum = 1;
		pageSize = 100;
		common.setHistoryBack('#lotteryHall');
		setMain(view);
		setContent();
	}

	function _init(view) {
		pageNum = null;
		pageSize = null;
		tab = null;
		oddsArr = null;
		selected = null;
	}

	function setMain(view) {
		var options = {
			title: "2018世界杯冠军",
			className: 'worldCup2018',
			showHeader: true,
			isLeftIconHeader: true
		}
		main.setMain(view, options);
		main.setContent(worldCup2018View.content());
		$("#betBtn").off().on('click', createTicketSubmit)
	}

	function setContent() {
		setTab();
	}
	
	function setTab() {
		var tabItem = $("#navTab div");
		tabItem.on("click", function(e) {
			tabItem.removeClass('active');
			$(this).addClass('active');
			tab = parseInt($(this).attr("tab")) || 1;
			pageNum = 1;
			pageSize = 100;
			oddsArr = [];
			selected = [];
			$("#countUnit").html('0');
			$("#ticketAmount,#maxPrice").html('0元');
			getGuessList();
			if (tab == 2) {
				$('#filterList').show();
				getGuessTeamList()
			} else {
				$('#filterList').hide()
			}
		});
		//默认选中状态
		var tabIndex = -1;
		tabItem.each(function (i, item) {
			var t = parseInt($(this).attr("tab")) || 0;
			if (t == tab) {
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
	
	
	function getGuessList(append) {
		main.unsetScrollLoad();
		var lotteryId;
		if (tab == 1) {
			lotteryId = 'SJBGJ'
		} else if (tab == 2) {
			lotteryId = 'SJBGYJ'
		}
 		var options = {
			lotteryId: lotteryId,
			pageNum: pageNum,
			pageSize: pageSize	
		}
		matchCgi.getGuessList(options, function(ret) {
			if (ret.errCode != 0) {
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
				$("#matchList").append(worldCup2018View.matchList(data));
			} else {
				$("#matchList").html(worldCup2018View.matchList(data));
			}
			$("#matchList .team_item").off().on("click", function (e) {
				var selectedOdds = $(this).children("span").eq(1).text();
				var selectedOddsId = $(this).attr("oddsId");
				if ($(this).hasClass("active") == true) {//取消选中
		            $(this).removeClass("active");
	                oddsArr.splice($.inArray(selectedOdds, oddsArr), 1);
	                selected.splice($.inArray(selectedOddsId, selected), 1);
		        } else {//选择比赛
	                $(this).addClass("active");
	                oddsArr.push(selectedOdds);
	                selected.push(selectedOddsId);
		        }
				setTicketAmount();
			});
		}, function() {
			main.setScrollLoad(moreList);
		});
	}
	
	function moreList() {
		pageNum++;
		getGuessList(true);		
	}
	
	function getGuessTeamList() {
		var options = {
				
		}
		matchCgi.getGuessTeamList(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var list = ret.data || [];
			var data = {
				list: list
			}
			$("#filterList").html(worldCup2018View.filterList(data));
			filter()
		});
	}
	
	function filter() {
		var sel = [];
		//冠亚军头部筛选
	    $("#filterList li").off().on('click', function() {
	        var filterName = $(this).attr('filterName');
	        var teamItem = $("#matchList li.team_item");
	        if($(this).hasClass("active") != true) { //选中添加选定状态
	        	$(this).addClass("active");
				sel.push(filterName);
	        	for(var i = 0; i < teamItem.length; i++){
	                var teamName = $(teamItem[i]).children('.team_name').text();
	                var teamName2 = $(teamItem[i]).attr('team2');
	                var odds = $(teamItem[i]).children('.odds').text();
	                if(teamName.indexOf(filterName) > -1) {
	                	if ($.inArray($(teamItem[i]).attr("oddsId"),selected) == -1) {
	                		oddsArr.push(odds);
	                		selected.push($(teamItem[i]).attr("oddsId"));
	                   	 	$(teamItem[i]).addClass("active");
	                	}
	                }
	            }
	        } else { //删除选定状态计算奖金
	        	$(this).removeClass("active");
	        	sel.splice($.inArray(filterName, sel), 1)
	            var rows = $("#matchList li.active");
	            for(var j = 0; j < rows.length; j++) {
	            	var teamName1 = $(rows[j]).attr('team1');
	            	var teamName2 = $(rows[j]).attr('team2');
	            	var teamName = $(rows[j]).children('.team_name').text();
	            	var odds = $(rows[j]).attr('odds');
                    if(teamName.indexOf(filterName) > -1) {
                    	if ($.inArray(teamName1,sel) == -1 && $.inArray(teamName2,sel) == -1) { 
                    		if($.inArray($(rows[j]).attr("oddsId"),selected) != -1){
	                            oddsArr.splice($.inArray(odds, oddsArr), 1);
	                            selected.splice($.inArray($(rows[j]).attr("oddsId"), selected), 1);
                       	 	}
                        	$(rows[j]).removeClass("active");
                    	}
                    }
	            }
	        }
	        setTicketAmount();//计算奖金
	    });
	}
	
	function setTicketAmount() {
		$("#ticketMultiple").off().on('input', ticketMultipleChange).trigger('input');
	}
	
	function ticketMultipleChange(e) {
		var teamActive =  $("#matchList li.active");
		var countUnit = parseInt(teamActive.length);
		var ticketMultiple = parseInt($('#ticketMultiple').val()) || 0;
		ticketMultiple = ticketMultiple < 1 ? 1 : ticketMultiple;
		ticketMultiple = ticketMultiple > 100000 ? 100000 : ticketMultiple;
		var ticketAmount = ticketMultiple*countUnit*2;
		var maxPrice ;
		if (oddsArr.length > 0) {
			maxPrice = (Math.max.apply(null, oddsArr)*ticketMultiple*2).toFixed(2);
		} else {
			maxPrice = '0.00'
		}
		$('#ticketMultiple').val(ticketMultiple);
		$("#countUnit").html(countUnit);
		$("#ticketAmount").html(ticketAmount + "元");
		$("#maxPrice").html(maxPrice);
	}
	
	function createTicketSubmit() {
		var ticketAmount = parseInt($("#ticketAmount").html().replace(/\D/g, '') || 0);
		var ticketMultiple = parseInt($("#ticketMultiple").val() || 0);
		var length = selected.length;
		if (length <= 0) {
			ui.showNotice('请选择比赛');
			return;
		}
		if (isNaN(ticketAmount) || ticketAmount <= 0) {
			ui.showNotice('金额有误');
			return;
		}
		if (isNaN(ticketMultiple) || ticketMultiple <= 0) {
			ui.showNotice('请输入正整倍数');
			return;
		}
		if (ticketMultiple > 100000) {
			ui.showNotice('您输入的倍数过大，请重新输入');
			return;
		}
		var matchRecommend = [];
		var lotteryId = '';
		if (tab == 1) {
			lotteryId = 'SJBGJ'
		} else if (tab == 2) {
			lotteryId = 'SJBGYJ'
		}
		for (var i = 0; i < length; i++) {
			var oddsId = selected[i];
			matchRecommend.push({oddsId: oddsId});
		}
		matchRecommend = JSON.stringify(matchRecommend);
		options = {
			ticketMultiple: ticketMultiple,
			matchRecommend: matchRecommend,
			lotteryId: lotteryId
		}
		orderCgi.createGuessOrder(options, function(ret) {
			if (ret.errCode != 0) {
				ui.showNotice(ret.msg);
				return;
			}
			var data = ret.data || {};
			var orderNo = trim(data.orderNo);
			var payUrl = trim(data.payUrl);
			if (orderNo) {
				if (payUrl) {
					setTimeout(function() {
						common.locationUrl(payUrl);
					}, 1000);
				} else {
					setTimeout(function() {
						var continueHash = encodeURIComponent(common.getLocationHash());
						common.locationUrl("#ticketSuccess&orderNo=" + orderNo + "&continueHash=" + continueHash);
					}, 1000);
				}
			} else {
				ui.showNotice("支付失败");	
			}
		});
	}
});