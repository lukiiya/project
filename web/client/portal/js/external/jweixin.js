﻿!function(a,b){"function"==typeof define&&(define.amd||define.cmd)?define(function(){return b(a,!0)}):b(a,!0)}(this,function(a,b){function c(b,c,d){a.WeixinJSBridge?WeixinJSBridge.invoke(b,e(c),function(a){h(b,a,d)}):k(b,d)}function d(b,c,d){a.WeixinJSBridge?WeixinJSBridge.on(b,function(a){d&&d.trigger&&d.trigger(a),h(b,a,c)}):d?k(b,d):k(b,c)}function e(a){return a=a||{},a.appId=A.appId,a.verifyAppId=A.appId,a.verifySignType="sha1",a.verifyTimestamp=A.timestamp+"",a.verifyNonceStr=A.nonceStr,a.verifySignature=A.signature,a}function f(a,b){return{scope:b,signType:"sha1",timeStamp:a.timestamp+"",nonceStr:a.nonceStr,addrSign:a.addrSign}}function g(a){return{timeStamp:a.timestamp+"",nonceStr:a.nonceStr,"package":a["package"],paySign:a.paySign,signType:a.signType||"SHA1"}}function h(a,b,c){var d,e,f;switch(delete b.err_code,delete b.err_desc,delete b.err_detail,d=b.errMsg,d||(d=b.err_msg,delete b.err_msg,d=i(a,d,c),b.errMsg=d),c=c||{},c._complete&&(c._complete(b),delete c._complete),d=b.errMsg||"",A.debug&&!c.isInnerInvoke&&alert(JSON.stringify(b)),e=d.indexOf(":"),f=d.substring(e+1)){case"ok":c.success&&c.success(b);break;case"cancel":c.cancel&&c.cancel(b);break;default:c.fail&&c.fail(b)}c.complete&&c.complete(b)}function i(a,b){var c,d,e,f;if(b){switch(c=b.indexOf(":"),a){case p.config:d="config";break;case p.openProductSpecificView:d="openProductSpecificView";break;default:d=b.substring(0,c),d=d.replace(/_/g," "),d=d.replace(/\b\w+\b/g,function(a){return a.substring(0,1).toUpperCase()+a.substring(1)}),d=d.substring(0,1).toLowerCase()+d.substring(1),d=d.replace(/ /g,""),-1!=d.indexOf("Wcpay")&&(d=d.replace("Wcpay","WCPay")),e=q[d],e&&(d=e)}f=b.substring(c+1),"confirm"==f&&(f="ok"),-1!=f.indexOf("failed_")&&(f=f.substring(7)),-1!=f.indexOf("fail_")&&(f=f.substring(5)),f=f.replace(/_/g," "),f=f.toLowerCase(),("access denied"==f||"no permission to execute"==f)&&(f="permission denied"),"config"==d&&"function not exist"==f&&(f="ok"),b=d+":"+f}return b}function j(a){var b,c,d,e;if(a){for(b=0,c=a.length;c>b;++b)d=a[b],e=p[d],e&&(a[b]=e);return a}}function k(a,b){if(A.debug&&!b.isInnerInvoke){var c=q[a];c&&(a=c),b&&b._complete&&delete b._complete,console.log('"'+a+'",',b||"")}}function l(){if(!("6.0.2">x||z.systemType<0)){var a=new Image;z.appId=A.appId,z.initTime=y.initEndTime-y.initStartTime,z.preVerifyTime=y.preVerifyEndTime-y.preVerifyStartTime,D.getNetworkType({isInnerInvoke:!0,success:function(b){z.networkType=b.networkType;var c="https://open.weixin.qq.com/sdk/report?v="+z.version+"&o="+z.isPreVerifyOk+"&s="+z.systemType+"&c="+z.clientVersion+"&a="+z.appId+"&n="+z.networkType+"&i="+z.initTime+"&p="+z.preVerifyTime+"&u="+z.url;a.src=c}})}}function m(){return(new Date).getTime()}function n(b){u&&(a.WeixinJSBridge?b():r.addEventListener&&r.addEventListener("WeixinJSBridgeReady",b,!1))}function o(){D.invoke||(D.invoke=function(b,c,d){a.WeixinJSBridge&&WeixinJSBridge.invoke(b,e(c),d)},D.on=function(b,c){a.WeixinJSBridge&&WeixinJSBridge.on(b,c)})}var p,q,r,s,t,u,v,w,x,y,z,A,B,C,D;return a.jWeixin?void 0:(p={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest"},q=function(){var a,b={};for(a in p)b[p[a]]=a;return b}(),r=a.document,s=r.title,t=navigator.userAgent.toLowerCase(),u=-1!=t.indexOf("micromessenger"),v=-1!=t.indexOf("android"),w=-1!=t.indexOf("iphone")||-1!=t.indexOf("ipad"),x=function(){var a=t.match(/micromessenger\/(\d+\.\d+\.\d+)/)||t.match(/micromessenger\/(\d+\.\d+)/);return a?a[1]:""}(),y={initStartTime:m(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},z={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:w?1:v?2:-1,clientVersion:x,url:encodeURIComponent(location.href)},A={},B={_completes:[]},C={state:0,res:{}},n(function(){y.initEndTime=m()}),D={config:function(a){A=a,k("config",a),n(function(){c(p.config,{verifyJsApiList:j(A.jsApiList)},function(){B._complete=function(a){y.preVerifyEndTime=m(),C.state=1,C.res=a},B.success=function(){z.isPreVerifyOk=0},B.fail=function(a){B._fail?B._fail(a):C.state=-1};var a=B._completes;return a.push(function(){A.debug||l()}),B.complete=function(b){for(var c=0,d=a.length;d>c;++c)a[c](b);B._completes=[]},B}()),y.preVerifyStartTime=m()}),A.beta&&o()},ready:function(a){0!=C.state?a():(B._completes.push(a),!u&&A.debug&&a())},error:function(a){"6.0.2">x||(-1==C.state?a(C.res):B._fail=a)},checkJsApi:function(a){var b=function(a){var b,c,d=a.checkResult;for(b in d)c=q[b],c&&(d[c]=d[b],delete d[b]);return a};c("checkJsApi",{jsApiList:j(a.jsApiList)},function(){return a._complete=function(a){if(v){var c=a.checkResult;c&&(a.checkResult=JSON.parse(c))}a=b(a)},a}())},onMenuShareTimeline:function(a){d(p.onMenuShareTimeline,{complete:function(){c("shareTimeline",{title:a.title||s,desc:a.title||s,img_url:a.imgUrl,link:a.link||location.href},a)}},a)},onMenuShareAppMessage:function(a){d(p.onMenuShareAppMessage,{complete:function(){c("sendAppMessage",{title:a.title||s,desc:a.desc||"",link:a.link||location.href,img_url:a.imgUrl,type:a.type||"link",data_url:a.dataUrl||""},a)}},a)},onMenuShareQQ:function(a){d(p.onMenuShareQQ,{complete:function(){c("shareQQ",{title:a.title||s,desc:a.desc||"",img_url:a.imgUrl,link:a.link||location.href},a)}},a)},onMenuShareWeibo:function(a){d(p.onMenuShareWeibo,{complete:function(){c("shareWeiboApp",{title:a.title||s,desc:a.desc||"",img_url:a.imgUrl,link:a.link||location.href},a)}},a)},startRecord:function(a){c("startRecord",{},a)},stopRecord:function(a){c("stopRecord",{},a)},onVoiceRecordEnd:function(a){d("onVoiceRecordEnd",a)},playVoice:function(a){c("playVoice",{localId:a.localId},a)},pauseVoice:function(a){c("pauseVoice",{localId:a.localId},a)},stopVoice:function(a){c("stopVoice",{localId:a.localId},a)},onVoicePlayEnd:function(a){d("onVoicePlayEnd",a)},uploadVoice:function(a){c("uploadVoice",{localId:a.localId,isShowProgressTips:0==a.isShowProgressTips?0:1},a)},downloadVoice:function(a){c("downloadVoice",{serverId:a.serverId,isShowProgressTips:0==a.isShowProgressTips?0:1},a)},translateVoice:function(a){c("translateVoice",{localId:a.localId,isShowProgressTips:0==a.isShowProgressTips?0:1},a)},chooseImage:function(a){c("chooseImage",{scene:"1|2"},function(){return a._complete=function(a){if(v){var b=a.localIds;b&&(a.localIds=JSON.parse(b))}},a}())},previewImage:function(a){c(p.previewImage,{current:a.current,urls:a.urls},a)},uploadImage:function(a){c("uploadImage",{localId:a.localId,isShowProgressTips:0==a.isShowProgressTips?0:1},a)},downloadImage:function(a){c("downloadImage",{serverId:a.serverId,isShowProgressTips:0==a.isShowProgressTips?0:1},a)},getNetworkType:function(a){var b=function(a){var b,c,d,e=a.errMsg;if(a.errMsg="getNetworkType:ok",b=a.subtype,delete a.subtype,b)a.networkType=b;else switch(c=e.indexOf(":"),d=e.substring(c+1)){case"wifi":case"edge":case"wwan":a.networkType=d;break;default:a.errMsg="getNetworkType:fail"}return a};c("getNetworkType",{},function(){return a._complete=function(a){a=b(a)},a}())},openLocation:function(a){c("openLocation",{latitude:a.latitude,longitude:a.longitude,name:a.name||"",address:a.address||"",scale:a.scale||28,infoUrl:a.infoUrl||""},a)},getLocation:function(a){c(p.getLocation,function(){var b=f(a,"jsapi_location");return b.type="wgs84",b}(),function(){return a._complete=function(a){delete a.type},a}())},hideOptionMenu:function(a){c("hideOptionMenu",{},a)},showOptionMenu:function(a){c("showOptionMenu",{},a)},closeWindow:function(a){c("closeWindow",{immediate_close:a&&a.immediateClose||0},a)},hideMenuItems:function(a){c("hideMenuItems",{menuList:a.menuList},a)},showMenuItems:function(a){c("showMenuItems",{menuList:a.menuList},a)},hideAllNonBaseMenuItem:function(a){c("hideAllNonBaseMenuItem",{},a)},showAllNonBaseMenuItem:function(a){c("showAllNonBaseMenuItem",{},a)},scanQRCode:function(a){c("scanQRCode",{desc:a.desc,needResult:a.needResult||0,scanType:a.scanType||["qrCode","barCode"]},a)},openProductSpecificView:function(a){c(p.openProductSpecificView,{pid:a.productId,view_type:a.viewType||0},a)},addCard:function(a){var b,d,e,f,g=a.cardList,h=[];for(b=0,d=g.length;d>b;++b)e=g[b],f={card_id:e.cardId,card_ext:e.cardExt},h.push(f);c(p.addCard,{card_list:h},function(){return a._complete=function(a){var b,c,d,e=a.card_list;if(e){for(e=JSON.parse(e),b=0,c=e.length;c>b;++b)d=e[b],d.cardId=d.card_id,d.cardExt=d.card_ext,d.isSuccess=d.is_succ?!0:!1,delete d.card_id,delete d.card_ext,delete d.is_succ;a.cardList=e,delete a.card_list}},a}())},chooseCard:function(a){c("chooseCard",{app_id:A.appId,location_id:a.shopId||"",sign_type:a.signType||"SHA1",card_id:a.cardId||"",card_type:a.cardType||"",card_sign:a.cardSign,time_stamp:a.timestamp+"",nonce_str:a.nonceStr},function(){return a._complete=function(a){a.cardList=a.choose_card_info,delete a.choose_card_info},a}())},openCard:function(a){var b,d,e,f,g=a.cardList,h=[];for(b=0,d=g.length;d>b;++b)e=g[b],f={card_id:e.cardId,code:e.code},h.push(f);c(p.openCard,{card_list:h},a)},chooseWXPay:function(a){c(p.chooseWXPay,g(a),a)}},b&&(a.wx=a.jWeixin=D),D)});