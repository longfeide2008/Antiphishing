//滚动
function ManualSwitchAD(guid) {
    var oTempManualSwitchAD = new Object;
    oTempManualSwitchAD.nextAval = true;
    oTempManualSwitchAD.DIV_Id = guid;

    oTempManualSwitchAD.init = function init() {
        $("#manualSwitch_adLeft_" + oTempManualSwitchAD.DIV_Id).children().eq(0).click(function () {
            oTempManualSwitchAD.leftMove('5','3');
            return false;
        });
        $("#manualSwitch_adRight_" + oTempManualSwitchAD.DIV_Id).children().eq(0).click(function () {
            oTempManualSwitchAD.rightMove('5', '3');
            return false;
        });
    }

    oTempManualSwitchAD.leftMove = function leftMove(mlr, num) {
        var mlr = parseInt(mlr);
        var num = parseInt(num);
        var imgLen = $("#i1_" + oTempManualSwitchAD.DIV_Id + " li").width() + mlr * 2;
        var dom = $("#i1_" + oTempManualSwitchAD.DIV_Id);
        var adLen = $("#i1_" + oTempManualSwitchAD.DIV_Id + " li").length - num;
        if (oTempManualSwitchAD.nextAval) {
            oTempManualSwitchAD.nextAval = false;
            if (dom.scrollLeft() == 0) {
                dom.animate({ scrollLeft: imgLen * adLen }, 500, function () { oTempManualSwitchAD.nextAval = true; });
            } else {
                dom.animate({ scrollLeft: -imgLen + dom.scrollLeft() }, 500, function () { oTempManualSwitchAD.nextAval = true; });
            }
        }
    }
    oTempManualSwitchAD.rightMove = function rightMove(mlr, num) {
        var mlr = parseInt(mlr);
        var num = parseInt(num);
        var imgLen = $("#i1_" + oTempManualSwitchAD.DIV_Id + " li").width() + mlr * 2;
        var dom = $("#i1_" + oTempManualSwitchAD.DIV_Id);
        var adLen = $("#i1_" + oTempManualSwitchAD.DIV_Id + " li").length - num;
        if (oTempManualSwitchAD.nextAval) {
            oTempManualSwitchAD.nextAval = false;
            if (dom.scrollLeft() == imgLen * adLen) {
                dom.animate({ scrollLeft: 0 }, 500, function () { oTempManualSwitchAD.nextAval = true; });
            } else {
                dom.animate({ scrollLeft: imgLen + dom.scrollLeft() }, 500, function () { oTempManualSwitchAD.nextAval = true; });
            }
        }
    }

    return oTempManualSwitchAD;
}