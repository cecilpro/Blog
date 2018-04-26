$(function(){
    $.ajax({
        url: '/static/api/list',
        dataType: 'text',
        success: function(filedata) {
            var data = eval('('+filedata+')');
			var listnum=0;
			var songnum=1;
			
			getLists(data);
			getList(data['lists'][listnum]['songs']);

			var audio = $("#py")[0];
			
			autoPlay(data,audio,listnum,songnum);

			$("#lists li").click(function(){
				getList(data['lists'][$(this).index()]['songs']);
				listnum = $(this).index();
			});

			$(".mlists li").click(function(){
				getList(data['lists'][$(this).index()]['songs']);
				listnum = $(this).index();
			});
			
			$('#player').on('click','#list li',function(){
				songnum = $(this).index();
				audio.src=data['lists'][listnum]['songs'][songnum]['url'];
				audio.play();
				/*$(this).css('background','#24262e');
				$(this).css('color','#fff');*/
			});

			$('.mlist').on('click','li',function(){
				songnum = $(this).index();
				$('.ctrl').css({'background':'url('+data['lists'][listnum]['picurl']+')','background-size':'100%'});	
				audio.src=data['lists'][listnum]['songs'][songnum]['url'];
				audio.play();
			});
			
			$(".ctrl").click(function(){
				if(audio.paused){
					audio.play();
					$('.ctrl img').attr('src','/static/playing.png');
				}
				else{
					audio.pause();
					$('.ctrl img').attr('src','/static/paused.png');
				}
			});
			/*$('#player').on('mouseover','#list tr',function(){
				$(this).find("th").css("display","inline-block");
			});

			$('#player').on('mouseout','#list tr',function(){
				$(this).find("th").css("display","none");
			});*/
        }
    });
});
function getLists(data){
	var str="";
	var lists = data['lists'];
	for(var i=0;i<lists.length;i++){
		var cache = lists[i]['picurl']
		if(cache === "")
			cache = "http://img06.tooopen.com/images/20170329/tooopen_sy_203589513656.jpg";
    	str+="<li><img src='"+cache+"'><span>"+lists[i]['title']+"<br/>"+lists[i]['subtitle']+"</span></li>";
	}
	$('#lists').html(str);

	str="";
	for(var i=0;i<lists.length;i++){
		str+="<li>"+lists[i]['title']+"</li>";
	}
	$('.mlists').html(str);
}

function getList(list){
	var str="";
	for(var i=0;i<list.length;i++){
		str+="<li><a href='javascript:void(0);'><span>"+list[i]['song']+"</span><span>"+list[i]['singer']+"</span></a></li>";
	}
	$('#list').html(str);


	str="";
	for(var i=0;i<list.length;i++){
		str+="<li><span>"+list[i]['song']+"</span><span>"+list[i]['singer']+"</span></li>";
	}
	$('.mlist').html(str);
}

function autoPlay(data,audio,listnum,songnum){
	$('.ctrl').css({'background':'url('+data['lists'][listnum]['picurl']+')','background-size':'100%'});	
	audio.src=data['lists'][listnum]['songs'][songnum]['url'];
	audio.play();
	$('.ctrl img').attr('src','/static/playing.png');
}

function getTime(src){
	var audio = $('#py')[0];
	audio.src = src;
	return audio.duration
}
