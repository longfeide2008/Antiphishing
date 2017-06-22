//Javascript
var KVsize;
var KVinx = 0;
$(function(){
	//input 焦点
	var $input = $("input.searchBorder"); 
	
	$input.each(function() { 
		var $title = $(this).attr("title"); 
		$(this).val($title); 
		$(this).focus(function() { 
			if($(this).val() === $title) { 
				$(this).val(''); 
				$(this).addClass("normal");
			} 
		}) 
		.blur(function() { 
			if($(this).val() === "") { 
				$(this).removeClass("normal");
				$(this).val($title); 
			} 
		}); 
	});
	
	
	KVsize = $(".KVitem").length;
	// focus
	FocusDot();
	autoplay();
	$(".KVitem").eq(0).css({"opacity":"1","z-index":"101"});
	$(".KVitem").eq(0).siblings().css("opacity","0");
		
	$(".number li").click(function(){
		clearTimeout(t);
		KVinx=$(this).index();
		ClickDot();
	})
	
	
	
	
	// 二级菜单
	$(".Nav ul.Nul li").hover(function(){
		if($(this).children().hasClass("subNav")){
			$(this).children(".subNav").show();
			$(".KVbg").show()
		}
	},function(){
		if($(this).children().hasClass("subNav")){
			$(this).children(".subNav").hide();
			$(".KVbg").hide();
		}
	});
	
	
	//打开侧边栏
	$("#SideNav .sideLink img").click(function(){
		$("#SideNav .sideLink").animate({right:"-38px"});
		$("#SideNav .SideSubmit").animate({right:"0px"});
	})
	//关闭侧边栏
	$("#SideNav .SideSubmit a.close").click(function(){
		$("#SideNav .sideLink").animate({right:"0px"});
		$("#SideNav .SideSubmit").animate({right:"-174px"});
	})
	
	
	$("#subLogin").hover(function(){
		$(this).children(".btn").slideDown();
	},function(){
		$(this).children(".btn").slideUp();
	});
	
	
	$(".slideTex").hover(function(){
		$(this).children("p").animate({height:"36px",overflow:"auto"})
	},function(){
		$(this).children("p").animate({height:"18px"})
	})
	
	
	
	
})

//KV

function FocusDot(){
	var i;
	for(i=0; i<KVsize; i++){
		var numberHtml = "<li></li>";
		$(".number").append(numberHtml);
	};
	$(".number li").eq(0).addClass("on");

}
function ClickDot(){
	$(".KVitem").eq(KVinx).animate({"opacity":"1","z-index":"101"});
	$(".KVitem").eq(KVinx).siblings().animate({"opacity":"0","z-index":"100"});
	$(".number li").eq(KVinx).addClass("on");
	$(".number li").eq(KVinx).siblings().removeClass("on");
	autoplay();

};
	
function autoplay(){
	t = setTimeout(next,5000); 
}

function next(){
	clearTimeout(t);
	if(KVinx < KVsize-1){
		$(".KVitem").eq(KVinx).animate({"opacity":"0","z-index":"100"}); 
		$(".KVitem").eq(KVinx).next().animate({"opacity":"1","z-index":"101"}); 
		$(".number li").eq(KVinx+1).addClass("on");
		$(".number li").eq(KVinx+1).siblings().removeClass("on");
		KVinx++;
	}else{
		$(".KVitem").eq(KVinx).animate({"opacity":"0","z-index":"100"}); 
		$(".KVitem").eq(0).animate({"opacity":"1","z-index":"101"}); 
		$(".number li").eq(0).addClass("on");
		$(".number li").eq(0).siblings().removeClass("on");
		KVinx = 0;	
	};
	autoplay();
}

function prev(){
	clearTimeout(t);
	if(KVinx >0){
		$(".KVitem").eq(KVinx).animate({"opacity":"0","z-index":"100"}); 
		$(".KVitem").eq(KVinx).prev().animate({"opacity":"1","z-index":"101"}); 
		$(".number li").eq(KVinx-1).addClass("on");
		$(".number li").eq(KVinx-1).siblings().removeClass("on");
		KVinx--;
	}else{
		$(".KVitem").eq(KVinx).animate({"opacity":"0","z-index":"100"}); 
		$(".KVitem").eq(KVsize-1).animate({"opacity":"1","z-index":"101"}); 
		$(".number li").eq(KVsize-1).addClass("on");
		$(".number li").eq(KVsize-1).siblings().removeClass("on");
		KVinx = (KVsize-1);	
	};
	autoplay();	
}

// Tab
function changeBox(obj){
	var MsgInx = $(obj).index();
	$(obj).addClass("on");
	$(obj).siblings().removeClass("on");
	$(obj).parent().siblings(".InfoBox").children().eq(MsgInx).show();
	$(obj).parent().siblings(".InfoBox").children().eq(MsgInx).siblings().hide();
}

//showBox
function showBox(obj){
	$(obj).parent().next().slideDown();
}

function hiddenBox(obj){alert();
	$(obj).parent().next().slideUp();
}

//detail leftNav
function showNav(obj){
	if($(obj).children("ul").is(":visible")){
			$(obj).children("ul").slideUp();
			$(obj).addClass("hidden")
			.removeClass("show")
		}else{
			$(obj).children("ul").slideDown();
			$(obj).addClass("show")
			.removeClass("hidden")
		}
}

//滚动
function leftMove(obj,id,mlr,num){
	var mlr = parseInt(mlr);
	var num = parseInt(num);
	var imgLen = $("#"+ id +" li").width()+mlr;
	var dom = $(obj).parent().next().next();
	var adLen = $("#"+ id +" li").length-num;
	if(dom.scrollLeft() == 0){
		dom.animate({scrollLeft:imgLen*adLen},500);
	}else{
		dom.animate({scrollLeft:-imgLen+dom.scrollLeft()},500);
	};
	
}
function rightMove(obj,id,mlr,num){
	var mlr = parseInt(mlr);
	var num = parseInt(num);
	var imgLen = $("#"+ id +" li").width()+mlr;
	var dom = $(obj).parent().next();
	var adLen = $("#"+ id +" li").length-num;
	if(dom.scrollLeft() == imgLen*adLen){
		dom.animate({scrollLeft:0},500);
	}else{
		dom.animate({scrollLeft:imgLen+dom.scrollLeft()},500);
	};
}