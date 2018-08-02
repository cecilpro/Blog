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
			
            mInit(data,audio,listnum,songnum)
			//mPlay(data,audio,listnum,songnum);

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

            window.setInterval("drawProgress()",1000);
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

function mInit(data,audio,listnum,songnum){
    mPlay(data,audio,listnum,songnum);
    audio.pause();
	$('.ctrl img').attr('src','/static/paused.png');
    $('.ctrl').css('animation-play-state','paused');
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
   
    $('canvas')[0].getContext("2d").clearRect(0,0,$('canvas')[0].width,$('canvas')[0].height);
}


function getTime(src){
	var audio = $('#py')[0];
	audio.src = src;
	return audio.duration
}

function drawProgress(){
    var alpha = $('#py')[0].currentTime/$('#py')[0].duration;

    var c=$('canvas')[0];
    var ctx=c.getContext("2d");
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(c.width/2,c.height/2,c.width/2,0.5*Math.PI,(2*alpha+0.5)*Math.PI);
    ctx.stroke();
}
