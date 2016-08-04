
$(function(){
	
	//gnb
	var $win = $(window);
	var $gnb = $("header nav>ul");
	var $gnb_li = $("header nav>ul>li");
	var $nav_prev = $("header #prev");
	var $nav_next = $("header #next");
	var gnbCrt = $gnb.children("li:nth-child("+ (gnbDep) +")");

	if(gnbCrt) {
		gnbCrt.addClass("on");
		$("header>p>a:nth-child(2)").text(gnbCrt.text())
	}

	var gnb_w = 20; 
	$gnb_li.each(function(){ gnb_w+= $(this).outerWidth(); });
	$gnb.width(gnb_w);

	if( $win.width() < gnb_w ) {
		$nav_prev.fadeIn(200);
		$nav_next.fadeIn(200);
		$gnb.css({'width':'95%' , 'margin':'0'});
	}

	$win.resize(function(){
		if( $win.width() < gnb_w ) {
			$gnb.css({'width':'95%' , 'margin':'0'});
			$nav_prev.fadeIn(200);
			$nav_next.fadeIn(200);
		}
		if( $win.width() >= gnb_w ) {
			$gnb.css({'width':gnb_w , 'margin':'0 auto'});
			$nav_prev.fadeOut(200);
			$nav_next.fadeOut(200);
			$gnb_li.removeAttr("style").removeClass("prev");
			//$gnb_li.removeClass("prev").prev("li").animate({marginLeft:0,opacity:1 }, '20', 'easeOutExpo');
			$gnb_li.eq(0).addClass("prev");
		}
	});

	$gnb_li.eq(0).addClass("prev");
	$nav_next.click(function(){
		var prev_w = $(".prev").outerWidth();
		if($gnb.children("li:last-child").prevAll().hasClass("prev")) {
			$(".prev").animate({'margin-left':-prev_w,opacity:0 }, '100').removeClass("prev").next("li").addClass("prev");
		}
	});
	$nav_prev.click(function(){
		if($gnb.children("li:first-child").nextAll().hasClass("prev")) {
			$(".prev").removeClass("prev").prev("li").animate({'margin-left':0,opacity:1 }, '100').addClass("prev");
		}
	});
	
	//lnb
	var $lnb = $("#container nav>ul");
	var $lnb_dep2= $("#container nav>ul>li>ul");
	var $lnb_dep3= $("#container nav>ul>li>ul>li>ul");
	var lnbCrt1 = $("#container nav>ul>li:nth-child(" + (lnbDep1) + ")>a");
	var lnbCrt2 = $("#container nav>ul>li:nth-child(" + (lnbDep1) + ")>ul>li:nth-child(" + (lnbDep2) + ")>a");
	var lnbCrt3 = $("#container nav>ul>li:nth-child(" + (lnbDep1) + ")>ul>li:nth-child(" + (lnbDep2) + ")>ul>li:nth-child(" + (lnbDep3) + ") a");
	var $lnb_btn = $lnb.next("input");

	if(lnbCrt1) {	
		lnbCrt1.addClass("active").next("ul").slideDown(0);
		$("header>p>a:nth-child(3)").text(lnbCrt1.text());
	}
	if(lnbCrt2) {	
		lnbCrt2.addClass("active").next("ul").slideDown(0); 
		$("header>p>a:nth-child(4)").text(lnbCrt2.text());
		if( lnbDep2 == 0 ) {$("header>p>a:nth-child(4)").fadeOut(0)}
	}
	if(lnbCrt3) {	
		lnbCrt3.addClass("active");
		$("header>p>span").text(lnbCrt3.text());
		if( lnbDep3 == 0 ) {$("header>p>span").fadeOut(0)}
	}
	

	$lnb_btn.click(function(){
		if($(this).hasClass("on")) {
			$(this).removeClass("on").attr({'title':'메뉴닫기', 'src': '/img/nav/close.png'}).css('right','0');
			$("#container").animate({marginLeft:0}, '200', 'easeOutExpo');
		} else {
			$(this).addClass("on").attr({'title':'메뉴열기', 'src': '/img/nav/open.png'}).css('right','-24px');
			$("#container").animate({marginLeft:-240}, '200', 'easeOutExpo');
		};
	})
	
	$lnb_dep2.parent().addClass("child dep1");
	$lnb_dep2.children("li:first-child").addClass("first");
	$lnb_dep2.children("li:last-child").addClass("last");
	$lnb_dep3.parent().addClass("child dep2");
	$lnb_dep3.children("li:first-child").addClass("first");
	$($lnb_dep2.children("li.last")).find("li:last-child").addClass("last");
	
	$(".dep1>a").on('click',function (e) {
	    e.preventDefault();
		if($(this).hasClass("active")) {
			$(this).removeClass("active").next("ul").slideUp('100', 'easeOutExpo');
		} else {
			$(this).addClass("active").next("ul").slideDown('100', 'easeOutExpo');
		};
		$(".dep1>a").not(this).removeClass("active").next("ul").slideUp('100', 'easeOutExpo');
		$(".dep2>a").removeClass("active").next("ul").slideUp('100', 'easeOutExpo');
	});
	$(".dep2>a").on('click',function (e) {
	    e.preventDefault();
		if($(this).hasClass("active")) {
			$(this).removeClass("active").next("ul").slideUp('100', 'easeOutExpo');
		} else {
			$(this).addClass("active").next("ul").slideDown('100', 'easeOutExpo');
		};
		$(".dep2>a").not(this).removeClass("active").next("ul").slideUp('100', 'easeOutExpo');		
	});
	 
	//tab
	var tabMenu = $("#tabMenu").width();
	var tabMenu_w = $("#tabMenu li").size();
	$("#tabMenu li").css("width",tabMenu/tabMenu_w);

	//search_box
	$(".search_box>span").click(function(){
		if($(this).hasClass("on")) {
			$(this).removeClass("on").next("ul").slideUp('100', 'easeOutExpo');
		} else {
			$(this).addClass("on").next("ul").slideDown('100', 'easeOutExpo');
		};
	});

	//콘텐츠관리 트리메뉴
	var $ct_menu_deth0 = $("#contents_menu>ul>li")
	var $ct_menu_deth1 = $("#contents_menu>ul>li>ul")
	var $ct_menu_deth2 = $("#contents_menu>ul>li>ul>li>ul")
	$ct_menu_deth1.parent().addClass("child");
	$ct_menu_deth1.children("li:last-child").addClass("last");
	$ct_menu_deth2.parent().addClass("child");
	$ct_menu_deth2.children("li:last-child").addClass("last");

	$ct_menu_deth0.children("a").click(function(e){
		 e.preventDefault();
		 if($(this).hasClass("on")) {
			$(this).removeClass("on").next("ul").slideUp('100', 'easeOutExpo');
		} else {
			$(this).addClass("on").next("ul").slideDown('100', 'easeOutExpo');
		};
		$ct_menu_deth0.children("a").not(this).removeClass("on").next("ul").slideUp('100', 'easeOutExpo');
		$($ct_menu_deth1.children()).children("a").removeClass("on").next("ul").slideUp('100', 'easeOutExpo');
		$($ct_menu_deth2.children()).children("a").removeClass("on");
	});

	$($ct_menu_deth1.children()).children("a").click(function(e){
		 e.preventDefault();
		 if($(this).hasClass("on")) {
			$(this).removeClass("on").next("ul").slideUp('100', 'easeOutExpo');
		} else {
			$(this).addClass("on").next("ul").slideDown('100', 'easeOutExpo');
		};
		$($ct_menu_deth1.children()).children("a").not(this).removeClass("on").next("ul").slideUp('100', 'easeOutExpo');
		$($ct_menu_deth2.children()).children("a").not(this).removeClass("on");
	});

	$($ct_menu_deth2.children()).children("a").click(function(e){
		 e.preventDefault();
		 if($(this).hasClass("on")) {
			$(this).removeClass("on");
		} else {
			$(this).addClass("on");
		};
		$($ct_menu_deth1.children()).children("a").not(this).removeClass("on");
		$($ct_menu_deth2.children()).children("a").not(this).removeClass("on");
	});

	//top
	$("#effectList .GoDbox").click(function(){
		$('html, body').animate({scrollTop:0}, '300');
	});

	

});