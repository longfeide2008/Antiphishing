var userAnalysisId = null;
var userAnalysisGeoPos = null;  //wap页面通过地图接口获取的地理位置
try {
    /*
    *参数说明：
    *path：客行点击率站点图片文件地址，各页面通过此参数来记录IIS日志
    *ICBCPostingPath：静态页面全路径
    *shortpath：静态页面短路径
    *isMobileLife：是否为移动生活页面
    *isMobileLifeNews：是否为移动生活资讯页面（需要单独伪造refer地址）
    */
    var pathobj = document.getElementById('ImgaddressForClient');
    var path = null;    
    if (window.location.href.indexOf('https') > -1) {
        path="";
    }  
    else
    {
        if (document.getElementById('ImgaddressForClient').type == 'hidden') {
            path = document.getElementById('ImgaddressForClient').value;
        } else {
            path = document.getElementById('ImgaddressForClient').content;
        }
    }

    //var nodeJSPath = document.getElementById('nodejsUrlForClient').content;
    //var nodeJSPath = "/localhost";

    var ICBCPostingPathobj = document.getElementById('ICBCPostingPath');
    var ICBCPostingPath = null;
    if (ICBCPostingPathobj != null && ICBCPostingPathobj != undefined) {
        ICBCPostingPath = document.getElementById('ICBCPostingPath').content;
    }
    var shortpathobj = document.getElementById('shortpath');
    var shortpath = null;
    if (shortpathobj != null && shortpathobj != undefined) {
        shortpath = document.getElementById('shortpath').content;
    }
    var isMobileLifeobj = document.getElementById("isMobileLife");
    var isMobileLife = null;
    if (isMobileLifeobj != null && isMobileLifeobj != undefined) {
        isMobileLife = document.getElementById('isMobileLife').value;
    }
    var isMobileLifeNewsobj = document.getElementById("isMobileLifeNews");
    var isMobileLifeNews = null;
    if (isMobileLifeNewsobj != null && isMobileLifeNewsobj != undefined) {
        isMobileLifeNews = document.getElementById('isMobileLifeNews').value;
    }

    var url = '';
    var d, s;                  // 声明变量。
    d = new Date();
    s = d.valueOf();
    try {
        if (window.opener == null || window.opener.location == null || window.opener.location.href == null || window.opener.location.href == undefined) {
            url = document.referrer;
        }
        else {
            url = window.opener.location;
        }
    } catch (e) {
        url = document.referrer;
    }

    //对于跨域的跳转，如果用IE8浏览器opener和referrer都获取不了，只能靠参数获取，因此将参数获取作为最高优先级
    var frompageurl = getQueryStringinCA("frompageurl");
    if(frompageurl != "") {
        url = frompageurl;
    }

    url = encodeURI(url);

    ICBCPostingPath = encodeURI(ICBCPostingPath);

    //如果是移动生活页面，则通过LocalStorage来进行参数的存储和获取
    if (isMobileLife == 'true') {
        userAnalysisId = GetAnalysisLocalStorage('icbcUserAnalysisId');
    }
    else {//非移动生活页面，使用Cookie来进行参数的存储和获取
        userAnalysisId = GetAnalysisCookie('icbcUserAnalysisId');
    }
    if (userAnalysisId == '' || userAnalysisId == null) {
        userAnalysisId = CreateUserAnalysisId();
        if (isMobileLife == 'true') {
            SaveAnalysisLocalStorage('icbcUserAnalysisId', userAnalysisId);
        }
        else {
            SaveAnalysisCookie(userAnalysisId);
        }
    }
    //如果是移动生活的资讯页面，则重新定位url参数
    if (isMobileLifeNews == 'true') {
        url = encodeURI(document.getElementById("ClientAnalysisAttribute").value);
    }

    try {
      userAnalysisGeoPos = GetAnalysisLocalStorage("ICBCAnalysisLocationPosition");
      if (userAnalysisGeoPos != null && userAnalysisGeoPos != "") {
        userAnalysisGeoPos = encodeURI(userAnalysisGeoPos);
      }
    }catch(e){
      userAnalysisGeoPos = null;
    }

    //生成img
    var headObj = document.getElementsByTagName('head');
    var imgObj = document.createElement('img');
    imgObj.width = '0';
    imgObj.height = '0';
    imgObj.id = 'clientMarkImage';
    imgObj.setAttribute('style', 'display: none;');

    if (path != "") {
        if (shortpath != null && shortpath != "") {
            //非短路径页面（未维护短路径的静态页面 OR 门户网站动态页面）
            imgObj.setAttribute('src', path + '?rid=' + s + '&ReferrerPage=' + url + '&ICBCPostingPath=' + ICBCPostingPath + '&UserAnalysisId=' + userAnalysisId);
        }
        else {
            imgObj.setAttribute('src', path + '?rid=' + s + '&ReferrerPage=' + url + '&UserAnalysisId=' + userAnalysisId);
        }
    }
    if (headObj != null) {
        headObj[0].appendChild(imgObj);
    }

    //新增使用nodejs ajas部分
    var currentUrl = encodeURI(window.location.href);
    
    var nodeJSPath = "";

    //WAP
    if(path!="")
    {
    	if(path.indexOf("https://act.icbc.com.cn")>0)
    	{
	    nodeJSPath = "https://act.icbc.com.cn/image/hitcount.wbmp";
    	}	
   	else if (path.indexOf(".wbmp") > 0) {
        	nodeJSPath = "http://act.icbc.com.cn/image/hitcount.wbmp";
    	} else {
        	nodeJSPath = "http://act.icbc.com.cn/image/hitcount.gif";
    	}
    	var nodeJSParas = '{"rid": "' + s + '","pageUrl":"' + encodeURIComponent(currentUrl) + '","ReferrerPage": "' + encodeURIComponent(url) + '","ICBCPostingPath":"' + ICBCPostingPath + '","UserAnalysisId":"' + userAnalysisId + '","UserAnalysisGeoPos":"' + userAnalysisGeoPos + '"}';

    	AjaxCallforNodeJS(nodeJSPath, nodeJSParas);
    }
}
catch (exp) {

}


function getQueryStringinCA(name) {
    // 如果链接没有参数，或者链接中不存在我们要获取的参数，直接返回空 
    if (location.href.indexOf("?") == -1 || location.href.indexOf(name + '=') == -1) {
        return '';
    }
    // 获取链接中参数部分 
    var queryString = location.href.substring(location.href.indexOf("?") + 1);
    // 分离参数对 ?key=value&key2=value2 
    var parameters = queryString.split("&");
    var pos, paraName, paraValue;
    for (var i = 0; i < parameters.length; i++) {
        // 获取等号位置 
        pos = parameters[i].indexOf('=');
        if (pos == -1) { continue; }
        // 获取name 和 value 
        paraName = parameters[i].substring(0, pos);
        paraValue = parameters[i].substring(pos + 1);
        // 如果查询的name等于当前name，就返回当前值，同时，将链接中的+号还原成空格 
        if (paraName == name) {
            return unescape(paraValue);
        }
    }
    return '';
};


//构建userid date + 10digital num
function CreateUserAnalysisId() {
    var ran = Math.random() * 1000000000;
    var temp_date = new Date();
    temp_year1 = temp_date.getFullYear();
    temp_month1 = (temp_date.getMonth() + 1) > 9 ? (temp_date.getMonth() + 1) : "0" + (temp_date.getMonth() + 1);
    temp_day1 = (temp_date.getDate()) > 9 ? (temp_date.getDate()) : "0" + (temp_date.getDate());
    var dateStr = temp_year1.toString() + temp_month1.toString() + temp_day1.toString(); //dateStr是yyyyMMdd格式
    userAnalysisId = dateStr + parseInt(ran);
    return userAnalysisId;
}
//保存icbcUserAnalysisId到cookie
function SaveAnalysisCookie(userAnalysisId) {
    //将生成的id写入cookie
    var expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + 365 * 24 * 60 * 60 * 1000);
    document.cookie = 'icbcUserAnalysisId=' + userAnalysisId + '; expires=' + expireDate.toGMTString() + ';path=/';
}
//获取cookie中的内容
function GetAnalysisCookie(cookieName) {
    try {
        var strCookie = document.cookie;
        //将多cookie切割为多个名/值对
        if (strCookie != null) {
            var arrCookie = strCookie.split(";");
            var userAnalysisId;
            if (arrCookie != null) {
                //遍历cookie数组，处理每个cookie对
                for (var i = 0; i < arrCookie.length; i++) {
                    var arr = arrCookie[i].split("=");
                    while (arr[0].charAt(0) == ' ')
                        arr[0] = arr[0].substring(1, arr[0].length);
                    //找到名称为userId的cookie，并返回它的值
                    if (cookieName == arr[0]) {
                        //userAnalysisId=arr[1];
                        return arr[1];
                        break;
                    }
                }
            }
        }
        return '';
    } catch (exp) {
    }
}
//调用HTML5本地存储Save方法，鉴于安全性，勿存储敏感信息 add by kfzx-majt
function SaveAnalysisLocalStorage(dataKey, dataValue) {
    localStorage.setItem(dataKey, dataValue);
}
//调用HTML5本地存储Get方法 add by kfzx-majt
function GetAnalysisLocalStorage(dataKey) {
    return localStorage.getItem(dataKey);
}

function recordAppAndDownload(appUrl, appName) {
    try {
        var pathobj = document.getElementById('ImgaddressForClient');
        var path = null;
        if (window.location.href.indexOf('https') > -1) {
            return;
        }  
        else
        {
            if (document.getElementById('ImgaddressForClient').type == 'hidden') {
                path = document.getElementById('ImgaddressForClient').value;
            } else {
                path = document.getElementById('ImgaddressForClient').content;
            }
        }


        var url = "/ICBCAppDownload/mobileapp/" + appName;
        var currentCataType = "";
        var RefferCataType = "";
        var d, s;
        d = new Date();
        s = d.valueOf();
        url = encodeURI(url);
        if (path != "") {
            document.getElementById("clientMarkImage").setAttribute("src", path + "?rid=" + s + "&ReferrerPage=" + url + '&UserAnalysisId=' + userAnalysisId);
        }
        window.open(appUrl);

        //新增使用nodejs ajas部分
        var currentUrl = encodeURI(window.location.href);
        
        var nodeJSPath = "";

        //WAP
        if (path.indexOf(".wbmp") > 0) {
            nodeJSPath = "http://act.icbc.com.cn/image/hitcount.wbmp";
        } else {
            nodeJSPath = "http://act.icbc.com.cn/image/hitcount.gif";
        }

        var nodeJSParas = '{"rid": "' + s + '","pageUrl":"' + encodeURIComponent(currentUrl) + '","ReferrerPage": "' + encodeURIComponent(url) + '","UserAnalysisId":"' + userAnalysisId + '","UserAnalysisGeoPos":"' + userAnalysisGeoPos + '"}';

        AjaxCallforNodeJS(nodeJSPath, nodeJSParas);
    }
    catch (exp) {

    }
}

function insertAGetScript(src, parent) {
    var sc = document.createElement("script");
    sc.setAttribute("src", src);

    if (sc != undefined) {
        if (parent != undefined) {
            parent.appendChild(sc);
        }
        else {
            console.error("body element is undefined");
        }
    }
}

if (typeof jQuery != 'undefined') {
    // 记录本页面所有广告的show类客行记录
    $(document).ready(function () {
        var alldata = "";
        for (var i = 0; i < $(".ClientAnalysisDataforAD").length; i++) {
            alldata += $(".ClientAnalysisDataforAD").eq(i).val();
        }

        //由于IE6中客行数据过长会导致发送失败，因此在这里判断如果是IE6就拆开发送
        if (getBroserVersionforCA() == "IE6") {
            var sendData = alldata.split("$$$");
            for (var i = 0; i < sendData.length; i++) {
                if (sendData[i] != "") {
                    //alert("oneData=" + "$$$" + sendData[i]);
                    ClientAnalysisADHit("$$$" + sendData[i]);
                }
            }
        }
        else {
            if (alldata != "") {
                ClientAnalysisADHit(alldata);
            }
        }
    });
}

function getBroserVersionforCA() {
    var userAgent = navigator.userAgent;
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera";
    }
    else if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    }
    else if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }
    else if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    }
    else {
        var browser = navigator.appName;
        var b_version = navigator.appVersion;
        var version = b_version.split(";");
        var trim_Version = version[1].replace(/[ ]/g, "");
        if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE6.0") {
            return "IE6";
        }
        else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE7.0") {
            return "IE7";
        }
        else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
            return "IE8";
        }
        else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0") {
            return "IE9";
        }
        else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE10.0") {
            return "IE10";
        }
        else {
            return "OTHER";
        }
    }
}

// 新NodeJs客行记录广告使用
function ClientAnalysisADHit(obj) {
    if (obj == null) {
        return;
    }
    var nodeJSPath = "http://act.icbc.com.cn/image/hitcount.adv";
    if (window.location.href.indexOf('https') > -1) {
        return;
    }      
    
    //组织参数
    var nodeJSParas = obj;
    AjaxCallforNodeJS(nodeJSPath, nodeJSParas);
}

// NodeJS Ajax Call
function AjaxCallforNodeJS(nodeJSPath, nodeJSParas) {
    try {
        if (typeof ($) != "undefined") {
            $.support.cors = true;
            $.ajax({
                url: nodeJSPath,
                cache: false,
                async: true,
                crossDomain: true,
                type: "POST",
                timeout: 3000,
                data: nodeJSParas,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    insertAGetScript((nodeJSPath + "?p=" + nodeJSParas), document.getElementsByTagName("body")[0]);

                    // 通常 textStatus 和 errorThrown 之中
                    // 只有一个会包含信息
                    // 调用本次AJAX请求时传递的options参数
                    if (typeof (console) != "undefined") {
                        console.error(XMLHttpRequest);
                        console.error(textStatus);
                        console.error(errorThrown);
                    }
                }
            });
        } else {
            insertAGetScript((nodeJSPath + "?p=" + nodeJSParas), document.getElementsByTagName("body")[0]);
        }
    }
    catch (ex) {
        if (typeof (console) != "undefined")
            console.error(ex);
    }
}

// 构造一个广告项目（图片）对应的客行数据，以$$$开头
function BuildClientAnalysisDataforOneAD(recordType, resourceId, resourceName, resourceLink, clientId, clientName, adProdId, adHolderId, price, areaId, areaName, Ad_ZoneNo) {
    if (resourceLink == "#") {
        resourceLink = "-";
    }
    var resultData = "$$$recordType@" + recordType;
    resultData += "|resourceId@" + resourceId + "|resourceName@" + encodeURIComponent(resourceName) + "|resourceLink@" + encodeURIComponent(resourceLink) + "|clientId@" + clientId + "|clientName@" + encodeURIComponent(clientName);
    resultData += "|adProdId@" + adProdId + "|adHolderId@" + adHolderId + "|price@" + price + "|areaId@" + areaId + "|areaName@" + encodeURIComponent(areaName) + "|sourceUrl@" + encodeURIComponent(window.location.href);

    resultData += "|UserAnalysisId@" + userAnalysisId;
    resultData += "|ChannelType@" + GetChannelType();

    if (Ad_ZoneNo != null && Ad_ZoneNo != undefined && Ad_ZoneNo != "") {
        resultData += "|ZoneNo@" + Ad_ZoneNo;
    }
    else {
        resultData += "|ZoneNo@0";
    }

    return resultData;
}

//WAP=1 WWW=2
function GetChannelType() {
    if(typeof(ImgaddressForClient) == 'undefined')
    {
        return "2";
    }
    var path = null;
    if (document.getElementById('ImgaddressForClient').type == 'hidden') {
        path = document.getElementById('ImgaddressForClient').value;
    } else {
        path = document.getElementById('ImgaddressForClient').content;
    }
    
    if(path==null)
    {
        return "2";
    }
    
    if (path.indexOf(".wbmp") > 0) {
        return "1";
    } else {
        return "2";
    }
}

// 广告链接点击处理
function DoADClick(url, caData, isPreview) {
    if (isPreview == "false" && (url.indexOf('javascript') < 0)) {
        //由于IE6中广告客行发送数据如果存在中文可能造成在日志记录中出现undefined字段，
        //（注：受此影响的广告只有脚标轮播、轮播广告预览、图文轮播广告）
        //因此在此判断如果是IE6，编码一次，经检验客行日志中记录的结果是解码后的
        if (getBroserVersionforCA() == "IE6") {
            ClientAnalysisADHit(encodeURIComponent(caData));
        }
        else {
            ClientAnalysisADHit(caData);
        }
    }
    if (!(url.indexOf('javascript')<0)) {    
        url=decodeURIComponent(url);
        url=url.substring(11,url.length);
        eval(url);    
    }
    else {
        window.open(url, '_blank');
    }
}