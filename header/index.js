// 实现logo的动态显示
$('.logo').hover(function () {
    $('.logo-bg').fadeIn().removeClass('hover-out');
    if ($('.logo-bg').hasClass('hover-in')) {
        return false;
    }
    $('.logo-bg').css({
        // 重新进行获取动图
        backgroundImage: 'url(http://img1.360buyimg.com/da/jfs/t1/31918/19/6335/274370/5c90a8beEefd9bfb9/e24970e34ce77262.gif?v=' + Math.random() + ')',
    }).addClass('hover-in').removeClass('end')
    setTimeout(function () {
        // 1、在动画结束的时候进行添加一个类名为end
        $('.logo-bg').addClass('end');
        // 4、判断是否移除
        $('.hover-out').fadeOut();
    }, 4000)
}, function () {
    // 2、如果hover出去，并且当前动画结束，那么让logo消失

    $('.end').fadeOut().removeClass('hover-in')
    // 3、当hover移除的时候，加入一个class类名，为hover-out
    $('.logo-bg').addClass('hover-out')
})


// 搜索框进行添加背景的placeholder
var placeholdersData = ['小饼干', '仔仔面', '商务智能'];
setInterval(function () {
    $('#search-inp').attr('placeholder', placeholdersData[Math.floor(Math.random() * 3)])
}, 2000);


// 实现搜索框联想词
// 渲染搜索框数据，data是列表数据
function renderSearchList(data) {
    console.log(data);
    data = data.result;
    var str = '';
    for (var i = 0; i < data.length; i++) {
        str += `
        <li>
        <a href="">${data[i][0]}</a>
        </li>
        `
    }
    $('.search-content').html(str).show();
}
// 防抖，进行延时获取
var timer = null;
// 当输入框进行输入数据的时候展示搜索列表   需要获取搜索列表的数据
$('#search-inp').on('input', function () {
    var val = $(this).val();
    clearTimeout(timer);
    if (val) {
        // 防止每次进行按下键盘的时候都去获取数据
        timer = setTimeout(function () {
            getData(val)
            console.log('开始获取')
        }, 500);
    }
    // 当鼠标进行聚焦的时候，判断搜索框内部是否含有数据，如果含有数据，将会进行显示搜索列表
}).focus(function () {
    console.log(123)
    var val = $(this).val();
    clearTimeout(timer);
    if (val) {
        timer = setTimeout(function () {
            getData(val)
            console.log('开始获取')
        }, 500);
    }
})
// 获取搜索列表数据  val是关键词
function getData(val) {
    $.ajax({
        type: 'get',
        url: 'https://suggest.taobao.com/sug',
        // https://suggest.taobao.com/sug?code=utf-8&q=wang&_ksTS=1591515153061_384&callback=jsonp385&k=1&area=c2c&bucketid=7
        data: {
            code: 'utf-8',
            q: val,
            callback: 'renderSearchList'
        },
        dataType: 'jsonp'
    })
    // console.log('111')
}
// 是鼠标移出收搜索区域，那么列表进行消失
var mouseleaveTimer = null
$('.search-box').mouseleave(function () {
    mouseleaveTimer = setTimeout(function () {
        $('.search-content').hide();
    }, 500);
    // 当
}).mouseenter(function () {
    clearTimeout(mouseleaveTimer)
})
// jsonP的原理，利用script标签的sec属性，进行引入文件
// json and padding 
// script 的 src 属性，不受同源策略的影响


