$(document).ready(function(){
	rightArea();
	gnbMenu();
	searchToggle();
});

/* 상단 검색창 토글 */
function searchToggle(){
	var search_Btn
	var s_header
	var s_input

	function init(){
		search_Btn = $(".search_Btn");
		header = $(".header");
		s_input = header.find(".s_input");
	};
	function eventList(){
		search_Btn.on("click", function(e){
			e.preventDefault();
			s_input.toggleClass("on");
			header.toggleClass("on");
			$(this).toggleClass("on");
		});
	};
	init();
	eventList();
};

/* 우측 사이드영역 토글 */
function rightArea(){
	var side_area;
	var container;
	var wheight;
	var win;
	var by;
	var tu;

	function init(){
		wheight = $(window).height();
		side_area = $(".side_area");
		side_area.height(wheight);
		container = $(".container");
		by = $("body");
		win = $("window");
		tu = true;
	};

	function resizeEvent(){
		$(window).resize(function(){
			wheight = $(window).height();
			side_area.height(wheight);
		});
	};

	function eventList(){
		$(".menu_toggleBtn").on("click", function(e){
			e.preventDefault();
			//slide.toggleClass("on");
			//container.toggleClass("on");
			if(tu){
				//slide.css({display:"block",right:0})
				//container.css({position:"fixed",left:"-250px"})
				side_area.stop().animate({right:0},600,function(){side_area.css({position:"absolute"})})
				container.stop().animate({left:"-250px"},600,function(){container.css({position:"fixed"})})
			    $("body").css({overflow:"hidden"})
				//by.css({overflow:"hidden"}).on('touchmove', function(e){e.preventDefault()})
				tu = false;
			}else{
				//by.css({overflow:"auto"}).off('touchmove');
				//slide.css({display:"none",right:"-250px"})
				//container.css({position:"relative",left:0})
				side_area.css({position:"fixed"}).stop().animate({right:"-250px"},600)
				container.css({position:"relative"}).stop().animate({left:0},600)
				tu = true;
			}
		});
	};
	init();
	resizeEvent();
	eventList();
}

/* GNB 아코디언 메뉴 */
function gnbMenu(){
	var li_one;
	var li_two;
	var li_three;
	var two_ul;
	var three_ul;
	var speed;
	var tu;

	function init(){
		li_one = $(".gnb > li");
		li_two = $(".gnb > li > ul > li");
		li_three = $(".gnb > li > ul > li > ul > li");
		ul_two = $(".gnb > li > ul");
		ul_three = $(".gnb > li > ul > li > ul");
		speed = 400;
	}
	function accordion(){
		li_one.click("on", function(e){
			e.preventDefault();
			var tg = $(this);
			if(!tg.hasClass("on")){
				li_one.removeClass("on");
				tg.addClass("on");
			}else{
				tg.removeClass("on");
			}
		});
		li_two.on("click", function(e){e.stopPropagation();})

		li_two.click("on", function(e){
			e.preventDefault();
			var tg = $(this);
			if(!tg.hasClass("on")){
				li_two.removeClass("on");
				tg.addClass("on");
			}else{
				tg.removeClass("on");
			}
		})
		li_three.on("click", function(e){e.stopPropagation();})
	};
	init();
	accordion();
}

