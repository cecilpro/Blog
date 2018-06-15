var url = 'http://dl.stream.qqmusic.qq.com/C400001g5e4D46VJRQ.m4a?vkey=148D1DA393E032B21BE10F5DDE0DF7C6F44F4485C7A5809653E57E84F75C38AF31E9D9929665D1688BCA0864D48932EC241CADCAEA249FEF&guid=6908829875&fromtag=66';
url = 'http://dl.stream.qqmusic.qq.com/C400003eVmWZ1wHkA0.m4a?vkey=0DBB181498D1538AAC7718BAE54840EC1F9A4886AB6B063C8421CC4659A6000242BCC797B4ED5E3501F07DA00BE5FC67064E7911C6058145&guid=6908829875&fromtag=66';
url = 'music/1.m4a';
if (!window.AudioContext) {
    alert('您的浏览器不支持AudioContext');
} else {
    var atx = new AudioContext();
    var source = null;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
        var arraybuffer = request.response;
        atx.decodeAudioData(arraybuffer, function (buffer) {
            var analyser = atx.createAnalyser();
            source = atx.createBufferSource();
            source.connect(analyser);
            analyser.connect(atx.destination);
 			analyser.connect(atx.destination);
            source.buffer = buffer;
            source.start(0);

            var canvas = document.getElementById('canvas'),
                        cwidth = canvas.width,
                        cheight = canvas.height - 2;
            ctx = canvas.getContext('2d');
            ctx.lineWidth = '100'
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
    $('#playBtn').click(function () {
        var icon = $(this).find('i');;
        icon.toggleClass('glyphicon-play').toggleClass('glyphicon-pause');
        source.stop();
    });
}

