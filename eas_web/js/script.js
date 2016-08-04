$(document).ready(function(){
	languageSelect();
	gnb();
	popCall();
	start_list();
	mainSlider();
	$("#min_slider_area1 > .min_slider > a").imageSlider({
		nButton : "#min_slider_area1 > .minbtn_set > a",
		nextBtn : "#min_slider_area1 > .min_next",
	     prevBtn : "#min_slider_area1 > .min_prev",
	     stopBtn : "#min_slider_area1> .min_stop",
	     second : 3000
	});
	$("#min_slider_area2 > .min_slider > a").imageSlider({
		nButton : "#min_slider_area2 > .minbtn_set > a",
		nextBtn : "#min_slider_area2 > .min_next",
	     prevBtn : "#min_slider_area2 > .min_prev",
	     stopBtn : "#min_slider_area2> .min_stop",
	     second : 4000
	});
});

/* 언어선택 */
function languageSelect(){
	$(".fix").on({
		click : function(e){
			e.preventDefault();
			$(this).next().toggleClass("on");
			$(".language").toggleClass("on");
		},
		keydown : function(){
			$(this).next().toggleClass("on");
			$(".language").toggleClass("on");
		}
	})

	$(".language > ul > li").on({
		click : function(e){
			e.preventDefault();
			var defaultLink = $(".fix").html();
			var changeLink = $(this).html();
			var moveURL  = $(this).find("> a").attr("href");
			$(this).html('').append(defaultLink);
			$(".fix").html('').append(changeLink);
			$(this).parent().removeClass("on");
			location.href = moveURL;
		}
	});
	$(".language > ul > li > .last").focusout(function(){
		$(this).parent().parent().removeClass("on");
	})
};

/* GNB 전체메뉴 열기 */
function gnb(){
	var gnb1d = $(".gnb > ul > li");

	gnb1d.on({
		mouseenter : function(){
			gnbOpen();
		},
		keydown: function(){
			gnbOpen();
		},
		mouseleave : function(){
			gnbClose();
		}
	});

	gnb1d.find(".last").focusout(function(){
		gnbClose();
	});

	$(".dim").on({
		mouseenter : function(){
			gnbOpen();
		},
		mouseleave : function(){
			gnbClose();
		}
	});

	function gnbOpen(){
		$(".gnb").find("> ul > li > ul").addClass("on");
		$(".dim").addClass("on");
	};
	function gnbClose(){
		$(".gnb").find("> ul > li > ul").removeClass("on");
		$(".dim").removeClass("on");
	};
};

/* 큰 이미지 슬라이더 */
function mainSlider(){
	var timer;
	var current = 0;
	var banner = $(".slider > a");
	var btn_set = $(".btn_set > a");
	var easing = "easeInQuad";
	var duration = 1200;

	btn_set.on({
		click : function(e){
			e.preventDefault();
			var tg = $(this)
			var i = tg.index();
			btnSet(i)
			fadeIn(i)
		},
		focus : function(){
			var tg = $(this)
			var i = tg.index();
			btnSet(i)
			fadeIn(i)
		}
	});

	function sideBtn(){
		$(".prev").on("click", function(e){
			e.preventDefault();
			current--;
			fadeIn(current);
			btnSet(current);
		});
		
		$(".next").on("click", function(e){
			e.preventDefault();
			current++;
			fadeIn(current);
			btnSet(current);
		});

		$(".stop").on("click", function(e){
			e.preventDefault();
			clearInterval(start);
		})
		banner.on({
			mouseenter : function(){
				clearInterval(timer)
			},
			mouseleave : function(){
				start();
			}
		});
		$(".next").on({
			mouseenter : function(){
				clearInterval(timer)
			},
			mouseleave : function(){
				start();
			}
		});
		$(".prev").on({
			mouseenter : function(){
				clearInterval(timer)
			},
			mouseleave : function(){
				start();
			}
		});
	};

	function start(){
		timer = setInterval(function(){
			var n = current + 1
			if(n == banner.length){
				n = 0;
			}
			$(".btn_set > a").eq(n).trigger("click");
		}, 5000);
	}

	function fadeIn(i){
		if(current > banner.length-1){
			current = 0;
			i = current
		}
		if(current < 0){
			current = banner.length-1;
			i = current
		}
		banner.stop().fadeOut(duration);
		banner.eq(i).stop().fadeIn(duration);
		/*banner.stop().animate({
			opacity:0,
			zIndex:0
		},duration,easing,function(){banner.css({display:"none"})})*/

		/*banner.eq(i).stop().animate({
			opacity:1,
			zIndex:10
		},duration,easing,function(){banner.css({display:"block"})})*/
		current = i;
	};

	function btnSet(i){
		btn_set.removeClass("on");
		btn_set.eq(i).addClass("on");
		current = i;
	};

	sideBtn();
	start();
};

/* 작은 이미지 슬라이더 */
(function($){
	$.fn.imageSlider = function(option){
		var images = [];
		var currentIndex = 0;
		var timer;
		var obj = this;
		option = $.extend({},$.fn.imageSlider.defaults,option);

		obj.each(function(index){
			var tg = $(this);
			tg.css({left:"296px"});
			images.push(tg);
		});
		images[0].css({left:0});

		/* 이벤트 */
		$(option.nButton).on({
			click : function(e){
				e.preventDefault();
				var index = $(option.nButton).index(this);
				if(index > currentIndex){
					move(index,"next");
				}else{
					move(index,"prev");
				}
			},
			focus : function(){
				var index = $(option.nButton).index(this);
				if(index > currentIndex){
					move(index,"next");
				}else{
					move(index,"prev");
				}
			}
		});
		$(option.nextBtn).on({
			click : function(e){
				e.preventDefault();
				move(currentIndex + 1,"next");
			}
		});
		$(option.prevBtn).on({
			click : function(e){
				e.preventDefault();
				move(currentIndex + 1,"prev");
			}
		});
		$(option.stopBtn).on({
			click : function(e){
				e.preventDefault();
				clearInterval(timer);
			}
		});
		$(option.prevBtn).on({
			mouseenter : function(){
				clearInterval(timer)
			},
			mouseleave : function(){
				start();
			}
		});
		$(option.nextBtn).on({
			mouseenter : function(){
				clearInterval(timer)
			},
			mouseleave : function(){
				start();
			}
		})
		obj.on({
			mouseenter : function(){
				clearInterval(timer)
			},
			mouseleave : function(){
				start();
			}
		});
		/* 에니메이션 */
		function move(index, direction){
			if(index >= images.length){
				index = 0;
			};
			if(index < 0){
				index = images.length - 1;
			}
			var currentImage = images[currentIndex];
			var nextImage = images[index];
			currentIndex = index;

			var nextLeft = -296
			var endLeft = 296
			if(direction == "next"){
				nextLeft = 296
				endLeft = -296
			}
			nextImage.css({left : nextLeft});
			currentImage.stop().animate({left : endLeft});
			nextImage.stop().animate({left : 0});
			showDotAt(currentIndex);
		};
		/* 버튼활성화 */
		function showDotAt(index){
			$(option.nButton).removeClass("on")
			$(option.nButton).eq(index).addClass("on")
		};
		/* 자동롤링 */
	     function start(){
			timer = setInterval(function(){
				var n = currentIndex + 1
				if(n == images.length){
					n = 0;
				}
				$(option.nButton).eq(n).trigger("click");
			}, option.second);
		}
	    start();
	    /* 옵션 */
	    $.fn.imageSlider.defaults = {
	          nButton : ".min_slider_area > .minbtn_set > a",
	          nextBtn : ".min_slider_area > .min_next",
	          prevBtn : ".min_slider_area > .min_prev",
	          stopBtn : ".min_slider_area > .min_stop",
	          second : 3000
	    }
	}
})(jQuery);

/* 레이어팝업호출 */
function popCall(){
	$(".pop_call").on({
		click : function(e){
			e.preventDefault();
			var tg = $(this);
			var data = tg.attr("data-name");
			closePop();
			openPop(data);
		},
		keypress : function(){
			var tg = $(this);
			var data = tg.attr("data-name");
			closePop();
			openPop(data);
		}
	});
	$(".lp .close > a").on({
		click : function(e){
			e.preventDefault();
			closePop();
			$($(this).attr('href')).attr('tabindex','0').focus();
		}
	});
	$(".confirm > a").on("click", function(e){
		e.preventDefault();
		$($(this).attr('href')).attr('tabindex','0').focus();
		closePop();
	});
};

/* 팝업열기 */
function openPop(data){
	$("#" + data).addClass("on");
};
/* 팝업닫기 */
function closePop(){	
	$(".lp").each(function(i){
		var tg = $(this);
		tg.removeClass("on");
	});
};

/* 출발지, 도착지 선택 */
function start_list(){
	$("#lp1 .country_list > ul > li > a").on({
		click : function(e){
			e.preventDefault();
			var txt = $(this).text();
			$("#location_st").val(txt);
			closePop();
		}
	});
	$("#lp2 .country_list > ul > li > a").on({
		click : function(e){
			e.preventDefault();
			var txt = $(this).text();
			$("#location_end").val(txt);
			closePop();
		}
	});
};

function skipNav(){
	$(".skip > a").on({
		/*click : function(e){
			e.preventDefault();
			$($(this).attr('href')).attr('tabindex','0').focus();
		},*/
		keydown : function(){
			$($(this).attr('href')).attr('tabindex','0').focus();
		}
	});
};

