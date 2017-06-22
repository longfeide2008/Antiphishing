$.widget("custom.questionAutoComplete", $.ui.autocomplete, {
    _renderItem: function (ul, item) {
        if (item.value == null || item.value == "") {
            return $("<li>");
        }

        var keyword = $("#txtRobotQuestion").val();

        var tip = $.parseJSON(item.value);

        tip.C = unescape(tip.C);

        var other = tip.C.split(keyword);

        var highlight = "";

        if (other.length > 0) {
            for (var i = 0; i < other.length; i++) {
                highlight += other[i];

                if (i != other.length - 1) {
                    highlight += "<span style='color:#BC0021;'>" + keyword + "</span>";
                }
            }
        }
        else {
            highlight = item.value;
        }

        return $("<li class='askListItem' onclick=\"robotGotoAnswerPage('" + tip.ID + "','" + encodeURI(tip.C) + "')\">")
                    .append("<span style='display:inline-block;width:350px;white-space: nowrap;overflow: hidden;'>" + highlight + "</span>")
                    .append("<span style='position:absolute;right:5px;color:#BC0021;'>" + tip.askCount + "</span>")
                    .appendTo(ul);
    },

    _keyEvent: function (keyEvent, event) {
        return false;
    }

});