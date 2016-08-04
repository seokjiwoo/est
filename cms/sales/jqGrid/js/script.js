$(window).load(function(){
	$(".ui-jqgrid tr.jqgrow").on("mouseover", function(){
		var n = $(this).index();
		$(".ui-jqgrid tr.jqgrow").prev().removeClass("bdr");
		$(this).prev().addClass("bdr");
	})

	$(".ui-jqgrid tr.jqgrow").on({
		click : function(){
			var n = $(this).index();
			$(".ui-jqgrid tr.jqgrow").prev().removeClass("bdr1");
			$(this).prev().addClass("bdr1");
		}
	});

});
