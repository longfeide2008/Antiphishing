//全通广告

function QuanTongAD(guid, time, size) {
    var oTempQuanTongAD = new Object;

    oTempQuanTongAD.DIV_Id = guid;
    oTempQuanTongAD.KVtimeOut = time;
    oTempQuanTongAD.KVsize = size;
    oTempQuanTongAD.KVinx = 0;
    oTempQuanTongAD.t = 0;

    oTempQuanTongAD.init = function init() {
        // focus
        oTempQuanTongAD.FocusDot();
        oTempQuanTongAD.autoplay();
        $("#QuanTong_" + oTempQuanTongAD.DIV_Id).children().eq(0).children().eq(0).css({ "opacity": "1", "z-index": "101" });
        $("#QuanTong_" + oTempQuanTongAD.DIV_Id).children().eq(0).children().eq(0).siblings().css("opacity", "0");

        $("#QuanTongAD_number_" + oTempQuanTongAD.DIV_Id).children().click(function () {
            clearTimeout(oTempQuanTongAD.t);
            oTempQuanTongAD.KVinx = $(this).index();
            oTempQuanTongAD.ClickDot();
        });

        for (var seq = 0; seq < oTempQuanTongAD.KVsize; seq++) {
            $("#QuanTongAD_KVitem_" + oTempQuanTongAD.DIV_Id + "_" + seq).mouseover(function () {
                oTempQuanTongAD.pauseplay();
            });
            $("#QuanTongAD_KVitem_" + oTempQuanTongAD.DIV_Id + "_" + seq).mouseout(function () {
                oTempQuanTongAD.autoplay();
            });
        }

        $("#QuanTongAD_left_" + oTempQuanTongAD.DIV_Id).click(function () {
            oTempQuanTongAD.prev();
        });

        $("#QuanTongAD_right_" + oTempQuanTongAD.DIV_Id).click(function () {
            oTempQuanTongAD.next();
        });
    };

    //KV
    oTempQuanTongAD.FocusDot = function FocusDot() {
        var i;
        for (i = 0; i < oTempQuanTongAD.KVsize; i++) {
            var numberHtml = "<li id='QuanTongAD_number_Li_" + oTempQuanTongAD.DIV_Id + "_" + i + "'></li>";
            $("#QuanTongAD_number_" + oTempQuanTongAD.DIV_Id).append(numberHtml);
        };
        $("#QuanTongAD_number_" + oTempQuanTongAD.DIV_Id).children().eq(0).addClass("on");
    };

    oTempQuanTongAD.ClickDot = function ClickDot() {
        $("#QuanTong_" + oTempQuanTongAD.DIV_Id).children().eq(0).children().eq(oTempQuanTongAD.KVinx).animate({ "opacity": "1", "z-index": "101" });
        $("#QuanTong_" + oTempQuanTongAD.DIV_Id).children().eq(0).children().eq(oTempQuanTongAD.KVinx).siblings().animate({ "opacity": "0", "z-index": "100" });
        $("#QuanTongAD_number_" + oTempQuanTongAD.DIV_Id).children().eq(oTempQuanTongAD.KVinx).addClass("on");
        $("#QuanTongAD_number_" + oTempQuanTongAD.DIV_Id).children().eq(oTempQuanTongAD.KVinx).siblings().removeClass("on");
        oTempQuanTongAD.autoplay();
        oTempQuanTongAD.LoadPic(oTempQuanTongAD.KVinx, oTempQuanTongAD.KVsize);
    };

    oTempQuanTongAD.autoplay = function autoplay() {
        oTempQuanTongAD.t = setTimeout(oTempQuanTongAD.next, oTempQuanTongAD.KVtimeOut);
    };

    oTempQuanTongAD.pauseplay = function pauseplay() {
        clearTimeout(oTempQuanTongAD.t);
    };

    oTempQuanTongAD.next = function next() {
        clearTimeout(oTempQuanTongAD.t);
        if (oTempQuanTongAD.KVinx < oTempQuanTongAD.KVsize - 1) {
            $("#QuanTong_" + oTempQuanTongAD.DIV_Id).children().eq(0).children().eq(oTempQuanTongAD.KVinx).animate({ "opacity": "0", "z-index": "100" });
            $("#QuanTong_" + oTempQuanTongAD.DIV_Id).children().eq(0).children().eq(oTempQuanTongAD.KVinx).next().animate({ "opacity": "1", "z-index": "101" });
            $("#QuanTongAD_number_" + oTempQuanTongAD.DIV_Id).children().eq(oTempQuanTongAD.KVinx + 1).addClass("on");
            $("#QuanTongAD_number_" + oTempQuanTongAD.DIV_Id).children().eq(oTempQuanTongAD.KVinx + 1).siblings().removeClass("on");
            oTempQuanTongAD.KVinx++;
        } else {
            $("#QuanTong_" + oTempQuanTongAD.DIV_Id).children().eq(0).children().eq(oTempQuanTongAD.KVinx).animate({ "opacity": "0", "z-index": "100" });
            $("#QuanTong_" + oTempQuanTongAD.DIV_Id).children().eq(0).children().eq(0).animate({ "opacity": "1", "z-index": "101" });
            $("#QuanTongAD_number_" + oTempQuanTongAD.DIV_Id).children().eq(0).addClass("on");
            $("#QuanTongAD_number_" + oTempQuanTongAD.DIV_Id).children().eq(0).siblings().removeClass("on");
            oTempQuanTongAD.KVinx = 0;
        };
        oTempQuanTongAD.autoplay();
        oTempQuanTongAD.LoadPic(oTempQuanTongAD.KVinx, oTempQuanTongAD.KVsize);
    };

    oTempQuanTongAD.prev = function prev() {
        clearTimeout(oTempQuanTongAD.t);
        if (oTempQuanTongAD.KVinx > 0) {
            $("#QuanTong_" + oTempQuanTongAD.DIV_Id).children().eq(0).children().eq(oTempQuanTongAD.KVinx).animate({ "opacity": "0", "z-index": "100" });
            $("#QuanTong_" + oTempQuanTongAD.DIV_Id).children().eq(0).children().eq(oTempQuanTongAD.KVinx).prev().animate({ "opacity": "1", "z-index": "101" });
            $("#QuanTongAD_number_" + oTempQuanTongAD.DIV_Id).children().eq(oTempQuanTongAD.KVinx - 1).addClass("on");
            $("#QuanTongAD_number_" + oTempQuanTongAD.DIV_Id).children().eq(oTempQuanTongAD.KVinx - 1).siblings().removeClass("on");
            oTempQuanTongAD.KVinx--;        } else {
            $("#QuanTong_" + oTempQuanTongAD.DIV_Id).children().eq(0).children().eq(oTempQuanTongAD.KVinx).animate({ "opacity": "0", "z-index": "100" });
            $("#QuanTong_" + oTempQuanTongAD.DIV_Id).children().eq(0).children().eq(oTempQuanTongAD.KVsize - 1).animate({ "opacity": "1", "z-index": "101" });
            $("#QuanTongAD_number_" + oTempQuanTongAD.DIV_Id).children().eq(oTempQuanTongAD.KVsize - 1).addClass("on");
            $("#QuanTongAD_number_" + oTempQuanTongAD.DIV_Id).children().eq(oTempQuanTongAD.KVsize - 1).siblings().removeClass("on");
            oTempQuanTongAD.KVinx = (oTempQuanTongAD.KVsize - 1);
        };
        oTempQuanTongAD.autoplay();
        oTempQuanTongAD.LoadPic(oTempQuanTongAD.KVinx, oTempQuanTongAD.KVsize);
    };

    oTempQuanTongAD.LoadPic = function LoadPic(index, pic_count) {
        var src_this = $("#QuanTongAD_KVitem_" + oTempQuanTongAD.DIV_Id + "_" + index).css("background-image");
        var src_next = $("#QuanTongAD_KVitem_" + oTempQuanTongAD.DIV_Id + "_" + (index + 1) % pic_count).css("background-image");

        if (src_this == "none") {
            $("#QuanTongAD_KVitem_" + oTempQuanTongAD.DIV_Id + "_" + index).css("background-image", "url(" + $("#QuanTongAD_KVitem_" + oTempQuanTongAD.DIV_Id + "_" + index).attr("src_lazy") + ")");
        }
        if (src_next == "none") {
            $("#QuanTongAD_KVitem_" + oTempQuanTongAD.DIV_Id + "_" + index).css("background-image", "url(" + $("#QuanTongAD_KVitem_" + oTempQuanTongAD.DIV_Id + "_" + index).attr("src_lazy") + ")");
        }
    };

    return oTempQuanTongAD;
}

