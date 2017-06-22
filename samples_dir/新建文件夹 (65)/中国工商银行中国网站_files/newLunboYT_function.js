var slider = {
    sliderHeight: 340,
    itemNumber: 5,
    animating: false,
    init: function () {
        $('.slide-pager-indicator .next').click(function () {
            slider.nextPage("manual");
        });

        $('.slide-pager-indicator .prev').click(function () {
            slider.prevPage("manual");
        });

    },
    nextPage: function (obj) {
        if (slider.animating == true) {
            return;
        }
        slider.animating = true;

        if (obj == "manual") {
            $('.swiper-slide').removeClass('cycle-pager-active');
        }

        $('.position-wrapper').animate({ 'top': -1 * (slider.sliderHeight) }, 500, function () {
            for (i = 0; i < slider.itemNumber; i++) {
                var item = $('.position-wrapper').children().eq(i).clone();
                $('.position-wrapper').append(item);


                if (i == slider.itemNumber - 1) {
                    for (r = 0; r < slider.itemNumber; r++) {

                        var item = $('.position-wrapper').children().eq(0).remove();
                        if (r == slider.itemNumber - 1) {
                            $('.position-wrapper').css('top', 0);
                            slider.animating = false;
                        }
                    }
                }
            }

            if (obj == "manual") {
                var firstIndex = $('.position-wrapper').children().eq(0).attr('thisindex');
                updatedSlider(firstIndex);
            }
        });

    },
    prevPage: function (obj) {
        if (slider.animating == true) {
            return;
        }
        slider.animating = true;

        if (obj == "manual") {
            $('.swiper-slide').removeClass('cycle-pager-active');
        }

        $('.position-wrapper').css('top', -1 * (slider.sliderHeight));
        var itemLength = $('.position-wrapper').children().length - 1;
        var items = [];
        for (i = itemLength; i > itemLength - slider.itemNumber; i--) {
            var item = $('.position-wrapper div')[i].outerHTML;
            items.push(item);
            if (i == itemLength - (slider.itemNumber - 1)) {
                for (r = 0; r < slider.itemNumber; r++) {

                    $('.position-wrapper').prepend(items[r]);
                    $('.position-wrapper').children().last().remove();

                    if (r == slider.itemNumber - 1) {
                        $('.position-wrapper').animate({ 'top': 0 }, 500);
                        slider.animating = false;
                    }
                }
            }
        }
        if (obj == "manual") {
            var firstIndex = $('.position-wrapper').children().eq(0).attr('thisindex');
            updatedSlider(firstIndex);
        }
    },
    checkActive: function (index) {
        var firstItem = $('.position-wrapper').children().eq(slider.itemNumber).attr('thisIndex');
        firstItem = parseInt(firstItem);
        index = parseInt(index);
        if (index == firstItem) {
            slider.nextPage("auto");
        }
        return;
    }
}

function updatedSlider(index)
{
   var targetIndex = parseInt(index);
   $('.cycle-slideshow').cycle('goto', targetIndex);
   $('.swiper-slide').removeClass('cycle-pager-active');
   $(this).addClass('cycle-pager-active');
}

function NewLunboYT_LoadPic(index, ytpcount)
{
    var src_this = $("#slideimg-" + index).attr("src");
    var src_next = $("#slideimg-" + (index + 1) % ytpcount).attr("src");
    if(src_this == null)
    {
        $("#slideimg-" + index).attr("src", $("#slideimg-" + index).attr("src_lazy"));
    }
    if (src_next == null)
    {
        $("#slideimg-" + (index + 1)).attr("src", $("#slideimg-" + (index + 1) % ytpcount).attr("src_lazy"));
    }
}
