$(function(){
    $.ajax({
        url: '/static/api/list',
        dataType: 'text',
        success: function(filedata) {
            var data = eval('('+filedata+')');
			var listnum=0;
			var songnum=1;
			var order='list'
			
			getLists(data);
			getList(data['lists'][listnum]['songs']);

			var audio = $("#py")[0];
			
			mPlay(data,audio,listnum,songnum);

			$(".mlists li").click(function(){
				getList(data['lists'][$(this).index()]['songs']);
				listnum = $(this).index();
			});
			
			$('.mlist').on('click','li',function(){
				songnum = $(this).index();
				mPlay(data,audio,listnum,songnum);
			});
			
			$(".ctrl").click(function(){
				if(audio.paused){
					audio.play();
					$('.ctrl img').attr('src','/static/playing.png');
					$('.ctrl').css('animation-play-state','running');
				}
				else{
					audio.pause();
					$('.ctrl img').attr('src','/static/paused.png');
					$('.ctrl').css('animation-play-state','paused');
				}
			});

			$('#py').bind('ended',function(){
				$('.ctrl img').attr('src','/static/paused.png');
				if(order==='list'){
					listlength=data['lists'][listnum]['songs'].length;
					songnum=(songnum+1)%listlength;
					mPlay(data,audio,listnum,songnum)
				}
			});
        }
    });
});
function getLists(data){
	var str="";
	var lists = data['lists'];
	for(var i=0;i<lists.length;i++){
		str+="<li>"+lists[i]['title']+"</li>";
	}
	$('.mlists').html(str);
}

function getList(list){
	var str="";
	for(var i=0;i<list.length;i++){
		str+="<li><span>"+list[i]['song']+"</span><span>"+list[i]['singer']+"</span></li>";
	}
	$('.mlist').html(str);
}

function mPlay(data,audio,listnum,songnum){
	$('.ctrl').css({'background':'url('+data['lists'][listnum]['songs'][songnum]['picurl']+')','background-size':'100%'});	
	audio.src=data['lists'][listnum]['songs'][songnum]['url'];
	audio.play();
	$('.ctrl img').attr('src','/static/playing.png');
	$('.ctrl').css('animation-play-state','running');
	$('.playing').removeClass('playing');
	$('.playing').removeClass('playing');
	$('.mlists>li:eq('+listnum+')').addClass('playing');
	$('.mlist>li:eq('+songnum+')').addClass('playing');
}

function getTime(src){
	var audio = $('#py')[0];
	audio.src = src;
	return audio.duration
}
