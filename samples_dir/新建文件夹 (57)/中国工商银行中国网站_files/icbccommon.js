//一个MCMS具体的javascript对象
function McmsItem(name, path) {
    this.childs = new Array();
    this.name = name;
    this.path = path;
    this.parent = null;
    this.addChild = function (item) {
        item.parent = this;
        this.childs[this.childs.length] = item;
    }
}
//以下为首页需要使用到的公用js
function GetObj(objName) {
    if (document.getElementById) {
        return eval('document.getElementById("' + objName + '")');
    } else if (document.layers) {
        return eval("document.layers['" + objName + "']");
    } else {
        return eval('document.all.' + objName);
    }
}

function AdMouseOver(object) {
    var sn = object.id.substr(0, object.id.lastIndexOf("m"));
    for (var i = 0; i < 19; i++) {
        var ms = GetObj(sn + "m" + i);
        var mcon = GetObj(sn + "con" + i);
        if (ms && mcon) {
            ms.className = "ADmenuOff";
            mcon.style.display = 'none';
        }
    }
    var re = /m/g;
    GetObj(object.id.replace(re, "con")).style.display = 'block';
    object.className = "ADmenuOn";
}

function openBrWindow(param) {
    if (param == "0")
        return false;
    StaNavi = window.open(param);
    StaNavi.opener = self;
    if (navigator.appVersion.charAt >= 3) {
        StaNavi.focus();
    }
}
//以下为主页javascript

function initChannelData(selectId, parentChannel) {
    obj = document.getElementById(selectId);
    for (var i = 0; i < parentChannel.childs.length; i++) {
        var ooption = document.createElement("OPTION");
        obj.options.add(ooption);
        var cname = parentChannel.childs[i].name;
        //modified by zhaojb 20120706 增加FF的情况
        if ('msie' == navigator.userAgent.toLowerCase().match(/msie/i)) {
            ooption.innerText = cname.length > 6 ? (cname.substr(0, 5) + '…') : cname;
        }
        else {
            ooption.textContent = cname.length > 6 ? (cname.substr(0, 5) + '…') : cname;
        }

        ooption.value = parentChannel.childs[i].path;
        ooption.cname = parentChannel.childs[i].name;
        ooption.mcmschannel = parentChannel;
        //        ooption.setAttribute("cname", parentChannel.childs[i].name);
        //        ooption.setAttribute("mcmschannel", parentChannel);
        //end modified
    }
}
function FindChannel(parentChannel, name) {
    for (var i = 0; i < parentChannel.childs.length; i++) {
        if (parentChannel.childs[i].name == name) {
            return parentChannel.childs[i];
        }
    }
}
function clearSelect(selectId) {
    obj = document.getElementById(selectId);
    while (obj.options.length != 1) {
        obj.options.remove(obj.options.length - 1);
    }
}
function changType(selectObj, type) {
    obj = document.getElementById(type);
    while (obj.options.length != 1) {
        obj.options.remove(obj.options.length - 1);
    }
    if (selectObj.selectedIndex != 0) {
        var ooption = selectObj.options[selectObj.selectedIndex];
        //        var sname = ooption.getAttribute("cname"); 
        //        var cc = FindChannel(ooption.getAttribute("mcmschannel"), sname);
        var sname = ooption.cname;
        var cc = FindChannel(ooption.mcmschannel, sname);

        if (cc != null) {
            initChannelData(type, cc);
        }
    }
}
//以上为主页javascript

function The_date() {
    var Today = new Date();

    var year = Today.getYear();



    var month = Today.getMonth();

    var date = Today.getDate();

    var day = Today.getDay();
    year = (year < 1900 ? (1900 + year) : year);
    switch (day) {
        case 1: day = "星期一"; break;

        case 2: day = "星期二"; break;

        case 3: day = "星期三"; break;

        case 4: day = "星期四"; break;

        case 5: day = "星期五"; break;

        case 6: day = "星期六"; break;

        case 0: day = "星期日"; break;

    }

    document.write(year + "年");

    document.write(month + 1);

    document.write("月" + date + "日  ");

    document.write(day);

}
function subject() {
    var sSubject = "";
    for (var i = 0; document.form1.radiobutton.length > i; i++) {
        if (document.form1.radiobutton[i].checked) {
            sSubject = document.form1.radiobutton[i].value;
            //alert(sSubject);
            if (sSubject == 1)
                sSubject = "对网站的建议";
            if (sSubject == 2)
                sSubject = "其他问题及建议";
            if (sSubject == 3)
                sSubject = "客户投诉";
            if (sSubject == 4)
                sSubject = "其他建议";
            break;
        }
    }
    var sSubmit = "mailto:Web.beijing@icbc.com.cn?subject=" + sSubject;
    location.href = sSubmit;
}
function MM_swapImgRestore() { //v3.0
    var i, x, a = document.MM_sr; for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++) x.src = x.oSrc;
}

function MM_preloadImages() { //v3.0
    var d = document; if (d.images) {
        if (!d.MM_p) d.MM_p = new Array();
        var i, j = d.MM_p.length, a = MM_preloadImages.arguments; for (i = 0; i < a.length; i++)
            if (a[i].indexOf("#") != 0) { d.MM_p[j] = new Image; d.MM_p[j++].src = a[i]; }
}
}

function MM_findObj(n, d) { //v4.01
    var p, i, x; if (!d) d = document; if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
        d = parent.frames[n.substring(p + 1)].document; n = n.substring(0, p);
    }
    if (!(x = d[n]) && d.all) x = d.all[n]; for (i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
    for (i = 0; !x && d.layers && i < d.layers.length; i++) x = MM_findObj(n, d.layers[i].document);
    if (!x && d.getElementById) x = d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
    var i, j = 0, x, a = MM_swapImage.arguments; document.MM_sr = new Array; for (i = 0; i < (a.length - 2); i += 3)
        if ((x = MM_findObj(a[i])) != null) { document.MM_sr[j++] = x; if (!x.oSrc) x.oSrc = x.src; x.src = a[i + 2]; }
}
//以上为首页需要使用到的公用js


//网银安全系统控件使用的js 开始
function securityCloseit() {
    var ObjStr1 = '<object id="Cls" classid=clsid:adb880a6-d8ff-11cf-9377-00aa003b7a11 type=application/x-oleobject><param name="Command" value="CloseX"></object>'
    var ObjStr2 = '<object classid=CLSID:8856F961-340A-11D0-A96B-00C04FD705A2 height=0 id=WebBrowser width=0></object>'

    if (parseInt(window.navigator.appVersion.split(";")[1].substr(5)) == 6) {
        self.opener = ''
        self.close()
    }
    else if (parseInt(window.navigator.appVersion.split(";")[1].substr(5)) > 6) {
        document.body.insertAdjacentHTML("BeforeEnd", ObjStr2)
        //WebBrowser.ExecWB(45,1);
        window.opener = null;
        window.open('', '_self', '');
        window.close();
    }
    else {
        if (!document.getElementById("Cls"))
            document.body.insertAdjacentHTML("BeforeEnd", ObjStr1)
        Cls.Click()
    }
}
//-->
function securityMySubmit() {
    if (document.all.check1.checked)
        securityWriteCookie();
    window.open('/ICBC/%e7%bd%91%e9%93%b6%e5%ae%89%e5%85%a8%e6%8e%a7%e4%bb%b6/start_cn.htm', '', 'width=700,height=500,status=no,toolbar=no,menubar=no,location=no,resizable=no');
    securityCloseit();
}

function securityWriteCookie() {
    var expdate = new Date();
    FixCookieDate(expdate);
    expdate.setTime(expdate.getTime() + (24 * 60 * 60 * 1000));
    SetCookie("ccpath", "uhiyg8yg", expdate);
}
function securityCheckCookie() {
    var cookiename = getCookieVal("ccpath");
    if (GetCookie("ccpath") == "uhiyg8yg") {
        window.open("/ICBC/%e7%bd%91%e9%93%b6%e5%ae%89%e5%85%a8%e6%8e%a7%e4%bb%b6/start_cn.htm", '', 'width=700,height=500,status=no,toolbar=no,menubar=no,location=no,resizable=no');
        securityCloseit();
    }
    else return;
}
//网银安全系统控件使用的js 结束

//外汇首页舌尖开始
//<![CDATA[
function GetObj(objName) {
    if (document.getElementById) {
        return eval('document.getElementById("' + objName + '")');
    } else if (document.layers) {
        return eval("document.layers['" + objName + "']");
    } else {
        return eval('document.all.' + objName);
    }
}
function AD1Menu(index, flag) {
    for (var i = 0; i < 9; i++) {/* 最多支持9个标签 */
        if (GetObj("AD1con" + i) && GetObj("AD1m" + i)) {
            GetObj("AD1con" + i).style.display = 'none';
            GetObj("AD1m" + i).className = "AD1MenuOff";
        }
    }
    if (GetObj("AD1con" + index) && GetObj("AD1m" + index)) {
        GetObj("AD1con" + index).style.display = 'block';
        GetObj("AD1m" + index).className = "AD1MenuOn";
    }
}
//]]>




//<![CDATA[
function GetObj(objName) {
    if (document.getElementById) {
        return eval('document.getElementById("' + objName + '")');
    } else if (document.layers) {
        return eval("document.layers['" + objName + "']");
    } else {
        return eval('document.all.' + objName);
    }
}
function AD2Menu(index, flag) {
    for (var i = 0; i < 9; i++) {/* 最多支持9个标签 */
        if (GetObj("AD2con" + i) && GetObj("AD2m" + i)) {
            GetObj("AD2con" + i).style.display = 'none';
            GetObj("AD2m" + i).className = "AD2MenuOff";
        }
    }
    if (GetObj("AD2con" + index) && GetObj("AD2m" + index)) {
        GetObj("AD2con" + index).style.display = 'block';
        GetObj("AD2m" + index).className = "AD2MenuOn";
    }
}
//]]
//外汇首页舌尖结束
/********投资银行滚动图片*********/
function ScrollImg_investment() {
    var speed = 20//速度数值越大速度越慢
    demo2.innerHTML = demo1.innerHTML
    function Marquee() {
        if (demo2.offsetWidth - demo.scrollLeft <= 0)
            demo.scrollLeft -= demo1.offsetWidth
        else {
            demo.scrollLeft++
        }
    }
    var MyMar = setInterval(Marquee, speed)
    demo.onmouseover = function () { clearInterval(MyMar) }
    demo.onmouseout = function () { MyMar = setInterval(Marquee, speed) }
}


//自动调整 iframe 的高度
function dyniframesize(iframeObj) {
    var getFFVersion = navigator.userAgent.substring(navigator.userAgent.indexOf("Firefox")).split("/")[1];
    var _HEIGHT_CONST = 16; //网点查询等页面需要
    var FFextraHeight = getFFVersion >= 0.1 ? _HEIGHT_CONST : 10;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/Safari/i) == "safari" || ua.match(/Chrome/i) == "chrome" || ua.match(/Firefox/i) == "firefox") {
        FFextraHeight = _HEIGHT_CONST; //modified by zhaojb 20120807 多浏览器保持一致效果
    }

    var pTar = iframeObj;

    if (pTar) {
        //begin resizing iframe
        pTar.style.display = "block"
        try {
            if (ua.match(/Firefox/i) == "firefox") {

                var IframeHeight = pTar.contentDocument.body.offsetHeight > 0 ? (pTar.contentDocument.body.offsetHeight + FFextraHeight) : pTar.contentDocument.body.clientHeight;
                pTar.height = IframeHeight;
            }
            //modified by zhaojb 20120807 chrome和safari保持一致
            else if (ua.match(/Chrome/i) == "chrome" || ua.match(/safari/i) == "safari") {

                if (pTar.contentDocument.documentElement.ownerDocument.forms[0]) {
                    pTar.height = pTar.contentDocument.documentElement.ownerDocument.forms[0].offsetHeight + FFextraHeight;
                }
            }
            else if (pTar.contentDocument && pTar.contentDocument.body.offsetHeight) {
                if (pTar.contentDocument.documentElement.ownerDocument.forms[0]) {
                    pTar.height = pTar.contentDocument.documentElement.ownerDocument.forms[0].offsetHeight;
                }
                else
                    pTar.height = pTar.contentDocument.body.offsetHeight + FFextraHeight;
            }
            else if (pTar.Document && pTar.Document.body.scrollHeight) {
                pTar.height = pTar.Document.body.scrollHeight + FFextraHeight;
            }
            SetFloatTreeTopLeft();

        } catch (exp)
	    { }
    }
}

















































//移除文字格式
function RemoveStyle(obj) {
    var div = obj.parentNode;
    var objects = div.getElementsByTagName("object");
    var object;

    try {
        if (objects.length > 0) {
            object = objects[0];
            var divobj = document.createElement("DIV");

            var strReg = /<\s*(script|style)((\s+[^>]*>)|(>))(.|\n)*?<\/\s*(script|style)\s*>/igm;
            object.html = object.html.replace(strReg, function () { return ""; });

            //            alert(object.html);

            divobj.innerHTML = object.html;
            divobj.innerHTML = divobj.innerText;
            object.html = divobj.innerText;
        }
    }
    catch (e) {
        ;
    }
}

function RemoveStyle_hastb(obj) {
    var div = obj.parentNode;
    var objects = div.getElementsByTagName("object");
    var object;

    try {
        if (objects.length > 0) {
            object = objects[0];
            var str = object.html;

            str = removeScriptStyle(str);
            str = removeAttribute(str);
            str = removeTagLst(str);

            object.html = str;
        }
    }
    catch (e) {
        ;
    }
}

function removeScriptStyle(str) {
    var strReg = /<\s*(script|style)((\s+[^>]*>)|(>))(.|\n)*?<\/\s*(script|style)\s*>/igm;
    return str.replace(strReg, function () { return ""; });
}
function removeAttribute(str) {
    var strReg1 = /<\s*(\w+)\s+((([^>\"]*)(\s*=\s*\"[^\"]*\")*[^>\"]*)*)>/ig;

    return str.replace(strReg1, function ($0, $1, $2) {
        var strTagName = $0;
        var strTagValue = $2;
        var strRegKey = />/;
        if (strTagValue.match(strRegKey)) {
            var strRegattri = /\"([^\"])*\"/ig;

            return strTagName.replace(strRegattri, function () { return ""; });
        }
        return strTagName;
    });
}
function removeTagLst(str) {
    var strReg = /<(\/|\?){0,1}\s*(\w+)((\s+[^>]*>)|(>))/ig;

    return str.replace(strReg, function removeTagLstSub($0, $1, $2) {
        var strTagName = $2;
        var strEnd = $1;
        if (strEnd == undefined) {
            strEnd = "";
        }
        var regKey = /^(table|tbody|tr|td|th|col|br|p)$/i;
        if (strTagName.match(regKey)) {
            return "<" + strEnd + strTagName + ">";
        }
        return "";
    });
}

//注入交易按钮触发事件，进行表单提交
//王钦东 添加
function SubmitForm(injectValue) {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/Safari/i) == "safari") {
        var urlString = "/ICBCDynamicSite2/Common/InjectCommonPageSafari.aspx?injectValue=" + injectValue;
        window.open(urlString, "_blank");
    }
    else {
        var urlString = "/ICBCDynamicSite2/Common/InjectCommonPage.aspx?injectValue=" + injectValue;
        var returnValue = window.showModalDialog(urlString, "", "dialogWidth:0px;dialogHeight:0px;resizable;help:no;status:no");

        if (returnValue != null && returnValue != "") {
            alert(returnValue);
        }
    }
}
//海外注入交易按钮触发事件，进行表单提交 add by kfzx-majt
function SubmitOverSeasForm(injectValue) {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/Safari/i) == "safari") {
        var urlString = "/ICBCDynamicSite2/Common/InjectOverSeasCommonPageSafari.aspx?injectValue=" + injectValue;
        window.open(urlString, "_blank");
    }
    else {
        var urlString = "/ICBCDynamicSite2/Common/InjectOverSeasCommonPage.aspx?injectValue=" + injectValue;
        var returnValue = window.showModalDialog(urlString, "", "dialogWidth:0px;dialogHeight:0px;resizable;help:no;status:no");

        if (returnValue != null && returnValue != "") {
            alert(returnValue);
        }
    }
} 