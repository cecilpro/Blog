$(function(){
	$(".wrap .index").on("click",">li",function(){
	
		$(".selected").removeClass('selected');/*remove*/
		
		$(this).addClass("selected");/*add*/
	});

	$("#top").click(function(){
		$("html,body").animate({scrollTop:0},'slow');
	});

	$(window).scroll(function(){
		if($(this).scrollTop()>1){
			$("#top").css("opacity","1");
			$(".wrap .index a").css("padding","16px 16px");
			$(".wrap .index a").css("font-size","14px");
		}
		else{
          		$("#top").css("opacity","0");
			$(".wrap .index a").css("padding","28px 24px");
			$(".wrap .index a").css("font-size","16px");
		}
    });


});

function getDonate(){
	var str="<div id='lbody'><div id='byte-info'><div class='close-info'>╳</div><img id='byte' src='/static/donate_me.png'/></div>";
	$("body").after(str);	
	$(".close-info").click(function(){
		$("#lbody").remove();
	});
}

function Init($this){
	$this.addClass("selected");
}
