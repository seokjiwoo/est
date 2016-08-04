$(document).ready(function(){
	rightArea();
	gnbMenu();
	searchToggle();
	ghostClick();
	checkReset();
	hiddenPop();
	fileUp();
	historyDetail();
	tab_rule($(".rule_tab > li"), $(".rule_con > .rulcon"));
	tab_rule($(".login_tab > li"), $(".login_input > div"));
	tab_travel($(".sc_tab > li"));
	tab_travel($(".tab_menu_type1 > li"));
	tab_travel($(".start_tab > li"));
	tab_travel($(".start_tab_result > li"));
	tab_search($(".tab_menu_type2 > li"), $(".s_list_wrap > .s_list_con"));
	tab_login($(".login_info > li"), $(".login_con > .rulcon"), $(".login_btnset > div"));
	tab_rule($(".login_tab > li"), $(".login_input > div"));
});

/* 레이어 팝업 아이스크롤 선택자 */
// sc_wrap1 / 운임규정 (탭메뉴)
// sc_wrap2 / 운임규정 및 약관 동의
// sc_wrap3 / 할인대상 안내 주의사항
// sc_wrap4 / 무이자할부안내
// sc_wrap5 / 로그인안내 (탭메뉴)
// sc_wrap9 / B737-700 기종 좌석 선택하기
// sc_wrap10 / B737-800B 기종 좌석 선택하기
// sc_wrap11 / B737-800 기종 좌석 선택하기
// sc_wrap12 / B737-800A 기종 좌석 선택하기

var myScroll; // 아이스크롤 전역변수

/* 일반페이지 아이스크롤 */
function pageScroll(){
	myScroll = new iScroll('sc_wrap6'); // 이용약관
	myScroll = new iScroll('sc_wrap7'); // 개인정보수집 및 이용에 대한 안내
	myScroll = new iScroll('sc_wrap8'); // 수집한 개인정보의 이용 및 제3자 제공
};

/* 안드로이드폰 아이스크롤 영역 더블클릭버그 방지 */
function ghostClick(){
	/* 일반 체크박스나 A링크 더블클릭 방지 */
	$(".ghostclick").on('touchstart', function(e) {
		e.stopPropagation();
	});
	/* 좌석선택 팝업 영역 더블클릭 방지 */
	var last_click_x = 0, last_click_y = 0, last_click_time = new Date().getTime();
	$(".seatcheck > label").on("click", function(e) {
	    var click_x = e["pageX"], click_y = e["pageY"], click_time = e["timeStamp"];
	    if (click_x && click_y && click_time &&
	        (Math.abs(click_x - last_click_x) < 10) &&
	        (Math.abs(click_y - last_click_y) < 10) &&
	        (click_time - last_click_time) < 1000) {
	            e.stopImmediatePropagation();
	            return false;
	    }
	    last_click_x = click_x;
	    last_click_y = click_y;
	    last_click_time = click_time;
	});
};

/* 상단 검색창 열기 */
function searchToggle(){
	$(".search_Btn").on("click", function(e){
		e.preventDefault();
		$(".header").toggleClass("on");
		$(".header").find(".s_input").toggleClass("on");
		$(this).toggleClass("on");
	});
};

/* GNB 영역 (사이드메뉴) */
function rightArea(){
	var side_area = $(".side_area");
	var container = $(".container");
	var body = $("body");
	var win = $(window);
	var wHeight = win.height();
	var promise = true;
	var speed = 100;
	var effects = "easeOutCubic";
	side_area.css("min-height",wHeight);

	$(".menu_toggleBtn").on("click", function(e){
		e.preventDefault();
		if(promise){
			openGnb();
		}else{
			closeGnb();
		}
	});
	/* GNB 열기*/
	function openGnb(){
		side_area.css({display:"block",position:"absolute",right:"-250px"}).stop().animate({right:0},speed);
		container.css({position:"fixed",top:0}).stop().animate({marginLeft:"-250px"},speed)
		body.css({overflow:"hidden"})
		/* GNB 열때 본문전체를 덮는 투명한 배경 추가 (실제서비스할때 주석제거) 
		var opacitydim = $("<div class='bdim opacity'></div>");
		container.append(opacitydim);*/
		promise = false;
	}
	/* GNB 닫기*/
	function closeGnb(){
		side_area.css({position:"fixed"}).stop().animate({right:"-250px"},speed,function(){
			$(this).css({display:'none'});
		});
		container.css({position:"relative",top:0}).stop().animate({marginLeft:0},speed)
		body.css({overflow:"auto"});
		promise = true;
	}
	/* 본문영역(투명한배경) 터치시 GNB 닫기 (실제서비스할때 주석제거)
	body.on("touchend",".bdim", function(){
		$(".bdim").remove();
		closeGnb();
	});*/
};

/* GNB 아코디언 */
function gnbMenu(){
	var li_one;
	var li_two;
	var li_three;
	var two_ul;
	var three_ul;

	function init(){
		li_one = $(".gnb > li");
		li_two = $(".gnb > li > ul > li");
		li_three = $(".gnb > li > ul > li > ul > li");
		ul_two = $(".gnb > li > ul");
		ul_three = $(".gnb > li > ul > li > ul");
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
};

/* 텝메뉴 */
function tab_rule(menu, contents){
	menu.on("click", function(e){
		e.preventDefault();
		var tg = $(this);
		var i = tg.index();
		menu.removeClass("on");
		tg.addClass("on");
		contents.removeClass("on");
		contents.eq(i).addClass("on");
		iscrollRefresh();
	});
};

/* 로그인안내 팝업 탭메뉴 */
function tab_login(menu, contents, btn){
	menu.on("click", function(e){
		e.preventDefault();
		var tg = $(this);
		var i = tg.index();
		menu.removeClass("on");
		menu.eq(i).addClass("on");
		contents.removeClass("on");
		contents.eq(i).addClass("on");
		btn.removeClass("on");
		btn.eq(i).addClass("on");
		iscrollRefresh();
	});
};

/* 레이어 팝업 텝메뉴 클릭시 아이스크롤 리프레쉬 */
function iscrollRefresh(){
	if($(".lp").is(":visible") == true){
		myScroll.refresh();
	};
};

/* 여행정보검색 탭메뉴 */
function tab_travel(menu){
	menu.on("click", function(e){
		e.preventDefault();
		var tg = $(this);
		var i = tg.index();
		menu.removeClass("on");
		menu.eq(i).addClass("on");
	});
};

/* 통합검색탭메뉴 */
function tab_search(menu, contents){
	menu.on("click", function(e){
		e.preventDefault();
		var tg = $(this);
		var i = tg.index();
		menu.removeClass("on");
		menu.eq(i).addClass("on");
		contents.removeClass("on");
		contents.eq(i).addClass("on");
	});
};

/* 좌석선택 체크박스 초기화 */
function checkReset(){
	$(".seat_reset").on("click", function(e){
		e.preventDefault();
		$(".seat_ckbox").each(function(i){
			$(this).attr("checked", false)
		})
	});
};

/* 레이어팝업 열기 */
function showPop(selecter, popScroll){
	$(".lp").centerScroll();
	var dim = "<div class='bdim'></div>";
	selecter.css({display:"block"});
	$(".container").append(dim);
	myScroll = new iScroll(popScroll);
};

 /* 레이어팝업 닫기*/
function hiddenPop(){
	$("body").on("click", ".close_btn", function(e){
		e.preventDefault();
		$(".bdim").remove();
		$(".lp").css({display:"none"});
		myScroll.destroy();
	});
};

/* 팝업 본문스크롤 내린만큼 위치 */
$.fn.centerScroll = function(){
	var obj = this;
	obj.css('top',  ($(window).height()/2-this.height()/2)+$(window).scrollTop() + 10);
};

/* 인풋파일(사진첨부하기) */
function fileUp(){
	$("#file_up").on("change", function(){
		var inputfile_val = $(this).val();
		$(".file_name").val(inputfile_val);
	});
};

/* 상세운임보기 */
function historyDetail(){
	$(".detail_view").on("click", function(e){
		e.preventDefault();
		$(".simple_history").css({display:"none"});
		$(".detail_history").addClass("on");
	});
	$(".showBtn").on("click", function(e){
		e.preventDefault();
		var tg = $(this);
		tg.removeClass("on");
		tg.prev().addClass("on");
		tg.next().addClass("on");
	})
	$(".closeBtn").on("click", function(e){
		e.preventDefault();
		var tg = $(this);
		tg.removeClass("on");
		tg.prev().prev().removeClass("on");
		tg.prev().addClass("on");
	});
};




