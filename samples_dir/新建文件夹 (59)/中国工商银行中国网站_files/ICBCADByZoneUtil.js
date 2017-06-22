if (typeof (ICBCADByZoneUtil) == "undefined") {
    ICBCADByZoneUtil = {};
}
if (typeof (ICBCADByZoneUtil.CurrentSite) == "undefined") {
    ICBCADByZoneUtil.CurrentSite = "";
}

ICBCADByZoneUtil.SetCurrentSite = function (currentSite) {
    ICBCADByZoneUtil.CurrentSite = currentSite;
}

//根据广告脚本基本名称和客户所属区域代码，返回可以显示的广告脚本名称后缀
ICBCADByZoneUtil.GetADFileNameSuffix = function (basename, clientZoneNo) {
    var result = "0";
    if (clientZoneNo != "0" && typeof (ICBCADActiveMaintainZoneList) != 'undefined') {
        try {
            for (var i = 0; i < ICBCADActiveMaintainZoneList.length; i++) {
                if (basename == ICBCADActiveMaintainZoneList[i][0] && clientZoneNo == ICBCADActiveMaintainZoneList[i][1]) {
                    result = clientZoneNo;
                    break;
                }
            }
        } catch (e) {
        }
    }
    return result;
}

//获取完整的广告脚本名称
ICBCADByZoneUtil.GetADFileName = function (basename, suffix) {
    var result = basename;
    if (suffix != null && suffix != undefined && suffix != "0") {
        result = basename + "_" + suffix;
    }
    return result;
}

//根据地理位置获取所属区域
ICBCADByZoneUtil.GetClientZoneNo = function () {
    //从cookie中读取
    var saved_data = ICBCADByZoneUtil.GetICBCZoneNoFromCookie();
    if (saved_data != undefined && saved_data != null && saved_data != "") {
        return saved_data;
    }

    //重新获取
    try {
        ICBCADByZoneUtil.GetClientIP(ICBCADByZoneUtil.UpdateZoneNoToCookie);
        return "0";
    } catch (e) {
        return "0";
    }
}

//保存当前地区代码到cookie
ICBCADByZoneUtil.UpdateZoneNoToCookie = function (clientIP) {
    if (typeof (console) != "undefined") {
        console.info("clientIP=" + clientIP);
        //clientIP = "123.150.183.25";    //debug data
    }

    if (clientIP != null && clientIP != undefined && clientIP != "") {
        var available_zoneno = ICBCADByZoneUtil.GetICBCZoneNoByIP(clientIP);
        var curr_date = ICBCADByZoneUtil.GetCurrentDate();
        ICBCADByZoneUtil.SaveToCookie("ICBC_AD_ClientZONENO_DATE", curr_date);
        ICBCADByZoneUtil.SaveToCookie("ICBC_AD_ClientZONENO_DATA", available_zoneno);
    }
}

//根据IP获取工行区域代码
ICBCADByZoneUtil.GetICBCZoneNoByIP = function (ipstr) {
    
    if (typeof (ICBC_IEPA_ZONES) == 'undefined') {
        return "0";
    }
    if (ipstr != null && ipstr != undefined && ipstr != "") {
        
        try {
            var convert_ip = ICBCADByZoneUtil.ConvertClientIP(ipstr);
            for (var i = 0; i < ICBC_IEPA_ZONES.length; i++) {
                if (parseInt(ICBC_IEPA_ZONES[i][0]) < convert_ip && convert_ip < parseInt(ICBC_IEPA_ZONES[i][1])) {
                    return ICBC_IEPA_ZONES[i][2];
                }
            }
            return "0";
        } catch (e) {
            return "0";
        }
    }

}

//根据IP获取所属区域
ICBCADByZoneUtil.ConvertClientIP = function (ip_str) {
    if (ip_str == null || ip_str == undefined || ip_str == "") {
        return "0";
    }
    var iparr = ip_str.split('.');
    if (iparr == null || iparr.length != 4) {
        return "0";
    }

    var total = 0;
    if (iparr[0] != null && iparr[0].length > 0) {
        total = parseInt(iparr[0]) * 256 * 256 * 256;
    }
    else {
        return "0";
    }
    if (iparr[1] != null && iparr[1].length > 0) {
        total = total + parseInt(iparr[1]) * 256 * 256;
    }
    else {
        return "0";
    }
    if (iparr[2] != null && iparr[2].length > 0) {
        total = total + parseInt(iparr[2]) * 256;
    }
    else {
        return "0";
    }
    if (iparr[3] != null && iparr[3].length > 0) {
        total = total + parseInt(iparr[3]);
    }
    else {
        return "0";
    }
    return total;
}

ICBCADByZoneUtil.GetClientIP = function (UpdateZoneNoToCookie) {
    var currSite = "http://www.icbc.com.cn";
    if (ICBCADByZoneUtil.CurrentSite != undefined && ICBCADByZoneUtil.CurrentSite != "") {
        currSite = ICBCADByZoneUtil.CurrentSite;
    }
    try {
        $.ajax({
            type: "GET",
            cache: false,
            async: true,
            url: currSite + "/ICBCDynamicSite/E_Investment/GetClientAnalysisData.asmx/GetClientIP?jsoncallback=?",
            dataType: "jsonp",
            success: function (data) {
                if (data != null && data != "") {
                    var clientIP = data.ip;
                    if (clientIP != "") {
                        UpdateZoneNoToCookie(clientIP);
                        return;
                    }
                }
                UpdateZoneNoToCookie(null);
            },
            fail: function (data) {
                UpdateZoneNoToCookie(null);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // 通常 textStatus 和 errorThrown 之中
                // 只有一个会包含信息
                // 调用本次AJAX请求时传递的options参数
                if (typeof (console) != "undefined") {
                    console.error(XMLHttpRequest.status);
                    console.error(textStatus);
                    console.error(errorThrown);
                }
            }
        });
    }
    catch (ex) {
        if (typeof (console) != "undefined") {
            console.error(ex);
        }
        UpdateZoneNoToCookie(null);
    }
}

//从cookie中获取客户端所属区域代码
ICBCADByZoneUtil.GetICBCZoneNoFromCookie = function () {
    //得到上一次保存区域代码的时间
    var saved_date = ICBCADByZoneUtil.GetFromCookie("ICBC_AD_ClientZONENO_DATE");

    if (saved_date != undefined && saved_date != null && saved_date != "") {
        var curr_date = ICBCADByZoneUtil.GetCurrentDate();
        if (ICBCADByZoneUtil.GetDateDiff(curr_date, saved_date) < 7) {
            var saved_data = ICBCADByZoneUtil.GetFromCookie("ICBC_AD_ClientZONENO_DATA");
            if (saved_data != undefined && saved_data != null && saved_data != "") {
                return saved_data;
            }
        }
    }
    return null;
}

//清空客户端所属区域代码数据
ICBCADByZoneUtil.ClearICBCZoneNoFromCookie = function () {
    ICBCADByZoneUtil.SaveToCookie("ICBC_AD_ClientZONENO_DATE", "");
    ICBCADByZoneUtil.SaveToCookie("ICBC_AD_ClientZONENO_DATA", "");
}

ICBCADByZoneUtil.GetCurrentDate = function () {
    var currDate = new Date();
    return currDate.getFullYear() + "-" + (currDate.getMonth() + 1) + "-" + currDate.getDate();
}

//计算两个日期的间隔天数
ICBCADByZoneUtil.GetDateDiff = function (sDate1, sDate2) {
    try {
        var tmpDate, oDate1, oDate2, iDays;
        tmpDate = sDate1.split('-');
        oDate1 = new Date(tmpDate[1] + '-' + tmpDate[2] + '-' + tmpDate[0]);
        tmpDate = sDate2.split('-');
        oDate2 = new Date(tmpDate[1] + '-' + tmpDate[2] + '-' + tmpDate[0]);
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
        return iDays;
    }
    catch (e) {
        return 9999;
    }
}

//保存到cookie
ICBCADByZoneUtil.SaveToCookie = function (cookieName, cookieValue) {
    document.cookie = cookieName + '=' + cookieValue;
}

//从cookie中获取
ICBCADByZoneUtil.GetFromCookie = function (cookieName) {
    try {
        var strCookie = document.cookie;
        if (strCookie != null) {
            var arrCookie = strCookie.split(";");
            if (arrCookie != null) {
                for (var i = 0; i < arrCookie.length; i++) {
                    var arr = arrCookie[i].split("=");
                    while (arr[0].charAt(0) == ' ')
                        arr[0] = arr[0].substring(1, arr[0].length);
                    //找到名称为userId的cookie，并返回它的值
                    if (cookieName == arr[0]) {
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