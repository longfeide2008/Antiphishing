//首页幻灯
var Lantern = {

    onChange: [],
    oInterval: [],
    otimeOut: [],
    opacityNum: 101,
    cycNum: 0,
    showNum: 0,
    width: 100, //整体宽度
    height: 80, //整体高度
    title: 70, //标题宽度
    navyCtr: [], //2维:  0.原长 1.目标长 2.speed 
    navyTime: 10, //navy动画时间
    picMoveSpeed: 20, //图片移动速度
    info: //0.图片url 1.名称 2.链接地址 
    [],

    init: function () {
        Lantern.onChange = false;
        for (var i = 0; i < Lantern.info.length; i++) {
            var picDiv
            var picTemp
            picDiv = document.createElement('div');
            picTemp = document.createElement('img');
            picDiv.id = "NewLunboType2_LanternImg" + i;
            picDiv.name = i;
            picTemp.src = Lantern.info[i][0];
            picTemp.style.width = this.width + "px"; //"450px";
            picTemp.style.height = (this.height - 23) + "px"; //"257px";
            picDiv.style.position = "absolute";
            picDiv.style.left = this.width + "px"; //"450px";
            picDiv.style.height = this.height + "px"; //"280px";
            picDiv.onclick = function () {
                if (Lantern.info[this.name][2] != "#") {
                    window.open(Lantern.info[this.name][2]);
                }
            };
            picDiv.appendChild(picTemp);
            document.getElementById("NewLunboType2_lanternImg").appendChild(picDiv);
            var divTemp
            divTemp = document.createElement('div');
            divTemp.id = "NewLunboType2_LanternN" + i;
            divTemp.style.width = this.title; //"200px";    //标题
            divTemp.name = i;
            divTemp.innerHTML = "<div class='NewLunboType2_li' id='lanternnum" + i + "'>" + (i + 1) + "</div><div id=\"__lanternNc" + i + "\" style=\"display:none; margin-top: 2px; margin-bottom: 2px;\">&nbsp;<b>" + (i + 1) + "</b>." + Lantern.info[i][1] + "</div>";
            if (i == 0) {
                divTemp.className = "div_off1";
            }
            else if (i == Lantern.info.length - 1) {
                divTemp.className = "div_off3";
            }
            else {
                divTemp.className = "div_off2";
            }
            //divTemp.className="div_off";
            if (i == 0)
                divTemp.onclick = function () {
                    if (Lantern.info[this.name][2] != "#") {
                        window.open(Lantern.info[this.name][2]);
                    }
                };
            else
                divTemp.onclick = function () {
                    if (!Lantern.onChange) {
                        Lantern.onChange = true; Lantern.setNavy(this.name);
                    }
                };
            document.getElementById("NewLunboType2_lanternNavy").appendChild(divTemp);
        }

        Lantern.initNany();
    },

    //初始化
    initNany: function () {
        navyCtr = new Array();
        for (var k = 0; k < Lantern.info.length; k++)
            Lantern.navyCtr[k] = [];

        var onLength, offLength
        onLength = this.title; //document.getElementById("LanternN0").style.width;
        offLength = (Lantern.width - onLength - 40 - 2) / (Lantern.info.length - 1);

        document.getElementById("__lanternNc0").style.display = "";
        document.getElementById("lanternnum0").style.display = "none";
        document.getElementById("NewLunboType2_LanternN0").className = "div_on1";
        document.getElementById("NewLunboType2_LanternN0").style.width = onLength + "px";

        var numtemp = 0;
        for (var j = 0; j < Lantern.info.length; j++) {
            if (j != 0)//未选
            {
                Lantern.navyCtr[j][1] = offLength;
                document.getElementById("__lanternNc" + j).style.display = "none";
                if (j == Lantern.info.length - 1) {
                    document.getElementById("NewLunboType2_LanternN" + j).className = "div_off3";
                }
                else {
                    document.getElementById("NewLunboType2_LanternN" + j).className = "div_off2";
                }
                document.getElementById("NewLunboType2_LanternN" + j).style.width = offLength + "px";
                if (j == Lantern.info.length - 1) {
                    document.getElementById("NewLunboType2_LanternN" + j).style.width = (Lantern.width - onLength - numtemp - 40 - 2) + "px"; //第8个脚标的宽度
                }
                else {
                    numtemp += offLength;
                }
            }
            else//已选
            {
                Lantern.navyCtr[j][1] = onLength;
            }
        }


        document.getElementById("NewLunboType2_LanternImg0").style.display = "";
        document.getElementById("NewLunboType2_LanternImg0").style.left = "0px";
        Lantern.otimeOut = setTimeout("Lantern.cycLantern()", Lantern.timeOut_time);
    },

    //动态
    setNavy: function (i) {
        if (i == Lantern.info.length - 1)
            document.getElementById("NewLunboType2_lanternNavy").style.backgroundColor = "#F5F4F2";
        else
            document.getElementById("NewLunboType2_lanternNavy").style.backgroundColor = "#CCCABE";

        document.getElementById("__lanternNc" + i).style.display = "";
        document.getElementById("lanternnum" + i).style.display = "none";
        if (i == 0) {
            document.getElementById("NewLunboType2_LanternN" + i).className = "div_on1";
        }
        else if (i == Lantern.info.length - 1) {
            document.getElementById("NewLunboType2_LanternN" + i).className = "div_on3";
        }
        else {
            document.getElementById("NewLunboType2_LanternN" + i).className = "div_on2";
        }
        document.getElementById("NewLunboType2_LanternN" + i).style.width = null;
        var onLength, offLength
        onLength = this.title; //document.getElementById("LanternN"+i).offsetWidth;
        offLength = (Lantern.width - onLength - 40 - 2) / (Lantern.info.length - 1);
        var numtemp = 0;
        for (var j = 0; j < Lantern.info.length; j++) {
            Lantern.navyCtr[j][0] = Lantern.navyCtr[j][1];
            if (i != j)//未选
            {
                Lantern.navyCtr[j][1] = offLength;
                document.getElementById("__lanternNc" + j).style.display = "none";
                document.getElementById("lanternnum" + j).style.display = "";
                if (j == Lantern.info.length - 1) {
                    document.getElementById("NewLunboType2_LanternN" + j).className = "div_off3";
                }
                else {
                    document.getElementById("NewLunboType2_LanternN" + j).className = "div_off2";
                }
                if (j == Lantern.info.length - 1) {
                    document.getElementById("NewLunboType2_LanternN" + j).style.width = (Lantern.width - onLength - numtemp - 40 - 2) + "px"; //第8个脚标的宽度
                }
                else {
                    numtemp += offLength;
                }
                document.getElementById("NewLunboType2_LanternN" + j).style.width = Lantern.navyCtr[j][0] + "px";
                Lantern.navyCtr[j][2] = (Lantern.navyCtr[j][1] - Lantern.navyCtr[j][0]) / Lantern.navyTime;
            }
            else//已选
            {
                Lantern.navyCtr[j][1] = onLength;
                document.getElementById("NewLunboType2_LanternN" + j).style.width = (Lantern.navyCtr[j][0]) + "px";
                Lantern.navyCtr[j][2] = (Lantern.navyCtr[j][1] - Lantern.navyCtr[j][0]) / Lantern.navyTime;

            }
        }
        document.getElementById("NewLunboType2_LanternImg" + i).style.display = "";
        if (Lantern.onChange) {
            document.getElementById("NewLunboType2_LanternN" + i).onclick = function () { window.open(Lantern.info[this.name][2]); };
            document.getElementById("NewLunboType2_LanternN" + Lantern.showNum).onclick = function () { if (!Lantern.onChange) { Lantern.onChange = true; Lantern.setNavy(this.name); } };
            document.getElementById("NewLunboType2_LanternImg" + i).style.zIndex = 0;
            document.getElementById("NewLunboType2_LanternImg" + Lantern.showNum).style.zIndex = -1;
            Lantern.oInterval = setInterval('Lantern.changeLantern(' + i + ')', 10);
        }
    },

    imgMoveOver: false,
    navyMoveOver: false,
    changeLantern: function (i) {
        if (Lantern.otimeOut != null)
            clearTimeout(Lantern.otimeOut)
        //move
        if (!Lantern.navyMoveOver)
            Lantern.moveNavy(i);
        if (!Lantern.imgMoveOver) {
            Lantern.moveImg(i);
        }
        else {
            Lantern.flashImg(i);
        }
    },

    moveNavy: function (select) {
        var breaktime = 0;
        for (var i = 0; i < Lantern.info.length; i++) {
            if ((Lantern.navyCtr[i][2] > 0 && document.getElementById("NewLunboType2_LanternN" + i).offsetWidth < Lantern.navyCtr[i][1]) || (Lantern.navyCtr[i][2] < 0 && document.getElementById("NewLunboType2_LanternN" + i).offsetWidth > Lantern.navyCtr[i][1])) {
                document.getElementById("NewLunboType2_LanternN" + i).style.width = (document.getElementById("NewLunboType2_LanternN" + i).offsetWidth + Lantern.navyCtr[i][2]) + "px";
            }
            else {
                if (i == select) {
                    for (var j = 0; j < Lantern.info.length; j++) {
                        document.getElementById("NewLunboType2_LanternN" + j).style.width = Lantern.navyCtr[j][1] + "px";
                    }

                    Lantern.navyMoveOver = true;
                    break;
                }
            }
        }
    },

    moveImg: function (i) {
        if (document.getElementById("NewLunboType2_LanternImg" + i).offsetLeft > 0) {
            document.getElementById("NewLunboType2_LanternImg" + i).style.left = (document.getElementById("NewLunboType2_LanternImg" + i).offsetLeft - Lantern.picMoveSpeed) + "px";
        }
        else {
            document.getElementById("NewLunboType2_LanternImg" + i).style.left = "0px";
            document.getElementById("NewLunboType2_LanternImg" + Lantern.showNum).style.left = Lantern.width + "px";
            Lantern.imgMoveOver = true;
        }
    },

    flashImg: function (i) {
        document.getElementById("NewLunboType2_LanternImg" + i).style.opacity = "100";
        Lantern.showNum = i;
        Lantern.imgMoveOver = false;
        Lantern.navyMoveOver = false;
        Lantern.opacityNum = 101;
        Lantern.cycNum = i;
        clearInterval(Lantern.oInterval);
        Lantern.otimeOut = setTimeout("Lantern.otimeOut=Lantern.cycLantern()", Lantern.timeOut_time);
        Lantern.onChange = false;
    },

    cycLantern: function () {
        if (!Lantern.onChange) {
            Lantern.onChange = true;
            if (Lantern.cycNum == Lantern.info.length - 1)
                Lantern.cycNum = 0;
            else
                Lantern.cycNum++;
            Lantern.setNavy(Lantern.cycNum)
        }
    },
    moveprevious: function () {
        if (!Lantern.onChange) {

            if (Lantern.cycNum > 0)
                Lantern.cycNum -= 1;
            else
                return;

            Lantern.onChange = true;
            Lantern.setNavy(Lantern.cycNum)
        }
    },
    movenext: function () {
        if (!Lantern.onChange) {

            if (Lantern.cycNum >= Lantern.info.length - 1)
                return;
            else
                Lantern.cycNum += 1;

            Lantern.onChange = true;
            Lantern.setNavy(Lantern.cycNum);
        }
    }
}

