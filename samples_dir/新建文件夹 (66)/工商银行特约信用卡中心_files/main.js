// JavaScript Document
$(function(){
	var bwidth = $(window).width();
	var width9 = bwidth*0.9,
	    width8 = bwidth*0.8,
		width7 = bwidth*0.7,
		width6 = bwidth*0.6,
		width5 = bwidth*0.5,
		width4 = bwidth*0.4,
		width3 = bwidth*0.3,
		width2 = bwidth*0.2,
		width1 = bwidth*0.1;
	var CSS = "../css/min320.css";
	if(bwidth <640){
		$("#min320").attr('href',CSS);
	};
	
	$("img").css({"max-width":width9});
	$(".wb_p img").css({"max-width":width4});
	$("#ccblogo").css({"max-width":width5});
	$(".version").css({"max-width":width4});
	$(window).resize(function(){
		var bwidth1 = $(window).width();
		var width_9 = bwidth1*0.9,
	    width_8 = bwidth1*0.8,
		width_7 = bwidth1*0.7,
		width_6 = bwidth1*0.6,
		width_5 = bwidth1*0.5,
		width_4 = bwidth1*0.4,
		width_3 = bwidth1*0.3,
		width_2 = bwidth1*0.2,
		width_1 = bwidth1*0.1;
		if(bwidth1 <640){
		$("#min320").attr('href',CSS);
	};
		if(bwidth1 == 320){
			$(".wb_list").css({"margin-top":"5px","margin-left":"5px"});
			$(".wb_list a").css({"min-width":"50px"});
		};
		if(bwidth1 == 480){
			$(".wb_list").css({"margin-top":"20px","margin-left":"20px"});
			$(".wb_list a").css({"min-width":"70px"});
		};
		/*
		if(bwidth1 >= 640){
			
			
		};
		*/
		$("body").css({"width":"100%"});
		$("img").css({"max-width":width_9});
		$(".wb_p img").css({"max-width":width_4});
		$("#ccblogo").css({"max-width":width_5});
		$(".version").css({"max-width":width_4});
	});
	//alert(bwidth);
	$(".news_tab h1").click(function(){
		var numb = $(this).index()+1;
		var tab = ".tab";
		$(this).addClass("tab_this").siblings().removeClass("tab_this");
		//alert(tab_content);
		$(tab + numb).show().siblings().hide();
	});
	
	$("#gshq span").click(function(){
		var img_num = $(this).index();
		$("#gshq span img").eq(img_num).attr("src","/cn/mobile/images/redio1.png").parent().siblings().find("img").attr("src","/cn/mobile/images/redio0.png");
		$("#gshq_img img").eq(img_num).show().siblings().hide();
	});
	$("#jjhq span").click(function(){
		var img_num = $(this).index();
		$("#jjhq span img").eq(img_num).attr("src","/cn/mobile/images/redio1.png").parent().siblings().find("img").attr("src","/cn/mobile/images/redio0.png");
		$("#jjhq_img img").eq(img_num).show().siblings().hide();
	});
	
	//外汇牌价
	//tab切换
	$(".tab_menus ul li").mouseover(function(){
		$(this).parent().find("li").removeClass("on");
		$(this).addClass("on");
		var this_i = $(this).parent().find("li").index($(this));
		$(this).parent().parent().siblings(".tab_content_box").hide();
		$(this).parent().parent().siblings(".tab_content_box").eq(this_i).show();
	});
	//人民币利率
	$("#ll_rmb option").click(function(){
		var index = $(this).index()+1;
		var showimg = ".llrmbimg";
		$(showimg+index).show().siblings().hide();
	});
	//外币利率
	$("#ll_wb option").click(function(){
		var index = $(this).index()+1;
		$("#w_b table").eq(index).show().siblings().hide();
	});
});