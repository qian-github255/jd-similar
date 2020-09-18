(function () {
    var Y = new Date().getFullYear();
    var M = new Date().getMonth() + 1;
    var D = new Date().getDate();
    // 获取每天的下午八点
    var t = Y + '-' + M + '-' + D + ' ' + '20:00:00'
    console.log(Y,M,D,t)
    var endTime = new Date(t);
    console.log(endTime)
    setInterval( function () {
        var newTime = new Date().getTime();
        // 毫秒数
        var range = endTime.getTime() - newTime;
        // 小时
        var hour = Math.floor(range / 1000 / 60 / 60);
        // 分钟
        var minute = Math.floor(range / 1000 / 60 % 60);
        // 秒
        var second = Math.floor(range / 1000 % 60);

        // 如果存在单位数，那么将会在前面进行补零
        if (hour < 10) {
            hour = '0' + hour;
        }

        if (minute < 10) {
            minute = '0' + minute;
        }

        if (second < 10) {
            second = '0' + second;
        }

        $('.timmer__unit--hour').text(hour);
        $('.timmer__unit--minute').text(minute);
        $('.timmer__unit--second').text(second);

    }, 1000);
})();




$('.slider-wrapper').swiper({
    list:$('.focus-item_seckill'),
    width:800,
    height:260,
    showSpotBtn : false
})


$('.slider-end').swiper({
    list:$('.slider-end-item'),
    width:190,
    height:260,
    showChangeBtn : false
})
