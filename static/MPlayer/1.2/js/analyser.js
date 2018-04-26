var url = 'music/红日 - 李克勤.mp3';
alert(url);
if (!window.AudioContext) {
    alert('您的浏览器不支持AudioContext');
} else {
    //创建上下文
    var atx = new AudioContext();
    var source = null;
    //使用Ajax获取音频文件
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';//配置数据的返回类型
    //加载完成
    request.onload = function () {
        var arraybuffer = request.response;
        atx.decodeAudioData(arraybuffer, function (buffer) {
            //创建分析器
            var analyser = atx.createAnalyser();
            source = atx.createBufferSource();
            //将source与分析器链接
            source.connect(analyser);
            //将分析器与destination链接，这样才能形成到达扬声器的通路
            analyser.connect(atx.destination);
            //将解码后的buffer数据复制给source
            source.buffer = buffer;
            //播放
            source.start(0);

            //开始绘制频谱图
            var canvas = document.getElementById('canvas'),
                        cwidth = canvas.width,
                        cheight = canvas.height - 2;
            ctx = canvas.getContext('2d'),
            gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(1, '#0f0');
            gradient.addColorStop(0.5, '#ff0');
            gradient.addColorStop(0, '#f00');
            var drawMeter = function () {
                var array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);
                ctx.clearRect(0, 0, cwidth, cheight);
                number++;
                if (number > 1000 && number < 1003) {
                    console.info(array);
                }
                if (array[1020] > 0) {
                    console.info(array);
                }
                for (var i = 0; i < array.length; i++) {
                    var value = array[i];
                    ctx.fillStyle = gradient;
                    ctx.fillRect(i, cheight - value, 1, cheight);
                }
                requestAnimationFrame(drawMeter);
            }
            requestAnimationFrame(drawMeter);

        }, function (e) {
            console.info('处理出错');
        });

    }
    request.send();
    var number = 0;
    //绑定播放按钮
    $('#playBtn').click(function () {
        var icon = $(this).find('i');;
        icon.toggleClass('glyphicon-play').toggleClass('glyphicon-pause');
        //停止播放
        source.stop();
    });
}
