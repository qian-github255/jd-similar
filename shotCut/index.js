

    var ddList = document.querySelectorAll('.dropDown-location dd>a')
    // console.log(ddList)
    var show = $('.local-location').text();
    // console.log(show)


    $('.dropDown-location a').click(function (e){
        // console.log(e.target)
        $('.local-location').text($(e.target).text())
        show = $(e.target).text()
        render(ddList);
    }) 



    function render (ddList) {
    //    console.log(show)
        for(var i = 0; i < ddList.length; i ++){
            // console.log(ddList[i])
            if($(ddList[i]).text() === show){
                // console.log(ddList[i])
                $('.dropActive').removeClass('dropActive')
                $(ddList[i]).parent().addClass('dropActive')
            }
        }      
    }

    render(ddList)

        // setInterval( function() {
        //     render(ddList)
        // }, 1000 / 30);
