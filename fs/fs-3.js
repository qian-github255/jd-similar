$('.service_list').on('mouseenter', '.service_frame', function () {
    $('.service-pop').css({
        // top:25
        transform: 'translateY(-100%)'
    })
    $('.service_frame:not(.service_frame2)').css({
        marginTop: -35
    })

    if ($(this).hasClass('service_frame2')) {
        $(this).css({
            marginTop: -56
        })
    }


    $('.service_frame_on').removeClass('service_frame_on')
    $(this).addClass('service_frame_on')
})

$('.close').click(function () {
    $('.service-pop').css({
        transform: 'translateY(0%)'
    })
    $('.service_frame').css({
        marginTop: 0
    })
    $('.service_frame_on').removeClass('service_frame_on')

})