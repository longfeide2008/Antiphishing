//搜索导航区域显示隐藏
            bsearch = false;
            bsemenu = false;
            $(function () {
                $('#SearchInput').keydown(
                        function(event){
                            if (event.keyCode == 13) {
                                searchAnswer()
                                
                                return false;
                            }
                        }
                ); 
                $('#ctrlSearch').click(function (event) {
                    event.stopPropagation();
                    if (bsearch) {
                        bsearch = false;
                        $('#dvControlSearch').hide();
                    }
                    else {
                        bsearch = true;
                        bsemenu = false;
                        $('#dvControlMenu').hide();
                        $('#dvControlSearch').show();
                    }
                });
                //点击空白处
                $('#wapbody').click(function (event) { $('#dvControlSearch').hide();bsearch = false; });
                $('#dvControlSearch').click(function (event) { event.stopPropagation(); return; });                


                $('#ctrlMenu').click(function (event) {
                    event.stopPropagation();
                    if (bsemenu) {
                        bsemenu = false;
                        $('#dvControlMenu').hide();
                    }
                    else {
                        bsemenu = true;                        
                        bsearch = false;                        
                        $('#dvControlSearch').hide();
                        $('#dvControlMenu').show();
                    }
                });
                //点击空白处
                $('#wapbody').click(function (event) { $('#dvControlMenu').hide();bsemenu = false; });
                $('#dvControlMenu').click(function (event) { event.stopPropagation(); return; });                
            })