$(function(){
    //box-shadow 효과
    var $title_button = $('.title a'),
        $header_button = $('.header_title a');

    $title_button.mouseenter(function(){
        $(this).addClass('box_sha');
    }).mouseleave(function(){
        $(this).removeClass('box_sha');
    });

    $header_button.mouseenter(function(){
        $(this).addClass('box_sha');
    }).mouseleave(function(){
        $(this).removeClass('box_sha');
    });

    //슬라이드
    var $slideCon = $('.con_slides'),
        $slides = $slideCon.find('.slides'),
        $slide = $slides.find('.slide'),
        $slideText = $slide.find('a span'),
        $slideHeight = '',
        $slideLength = $slide.length,
        $arrow = $('.arrow'),
        $currentIdx = 0,
        $indicatorhtml = '',
        $indicator = $('.indicator'),
        $timer;

    $slide.find('img').on('load', function(){
        $slide.find('img').each(function(p){
            if($slide.find('img').eq(p).height()<$slide.find('img').eq(p+1).height()){
                $slideHeight = $slide.find('img').eq(p+1).height();
            }else{
                $slideHeight = $slide.find('img').eq(p).height();
            }
        });
        $slideCon.css('height',$slideHeight);
        $slides.css('height',$slideHeight);
        $slide.css('height',$slideHeight);
    });

    $slide.each(function(p){
        var $left = p * 100 + '%';
        $slide.eq(p).css('left',$left);

        //인디케이터 생성
        $indicatorhtml += '<a href="#">'+(p+1)+'</a>';
    });

    //인디케이터를 변수에 넣음
    $indicator.html($indicatorhtml);

    $arrow.find('a').click(function(ev){
        ev.preventDefault();
        if($(this).hasClass('prev')){
            goToSlide($currentIdx-1);
        }else{
            goToSlide($currentIdx+1);
        }
    });

    function goToSlide(idx){
        if(idx==$slideLength){
            idx = 0;
        }else if(idx<0){
            idx = $slideLength-1;
        }
        var $left = idx*-100 +'%';
        $slides.animate({left:$left},500);
        $currentIdx = idx;

        $indicator.find('a').eq(idx).addClass('on').siblings().removeClass('on');

        $slide.eq(idx).addClass('this').siblings().removeClass('this');
        if($slide.eq(idx).hasClass('this')){
            $slideText.eq(idx).find('p.slide_tit').animate({'opacity':1},1000);
            $slideText.eq(idx).find('p.slide_des').animate({'left':'10px', 'opacity':1},1000);
        }
        $slideText.find('p.slide_tit').css({'opacity':'0'});
        $slideText.find('p.slide_des').css({'left':'50px','opacity':'0'});
        
    }

    $indicator.find('a').click(function(ev){
        var idx = $(this).index();

        ev.preventDefault();
        $(this).addClass('on').siblings().removeClass('on');
        goToSlide(idx);
    });

    function startTimer(){
        $timer = setInterval(function(){
            var nextIndex = ($currentIdx+1)%$slideLength;
            goToSlide(nextIndex);
        },3000);
    }
    function stopTimer(){
        clearInterval($timer);
    }

    $slideCon.mouseenter(function(){stopTimer()}).mouseleave(function(){startTimer()});
    goToSlide(0);
    startTimer();

    //lightGallery(라이트박스)
    $('.lightbox').lightGallery({
        autoplay:true,
        pause:3000,
        progressBar:true,
    });

    //navigation 접기 펼치기
       var $navi = $('#nav'),
        $nav_btn = $('.btn');

    $nav_btn.click(function(ev){
        ev.preventDefault();

        $navi.toggleClass('click');
        if($navi.hasClass('click')){
            $navi.slideDown();
            $nav_btn.addClass('up');
        }else{
            $navi.slideUp();
            $nav_btn.removeClass('up');
        }
    });

    $(window).resize(function(){ //window 크기가 바뀔때 할 일
        var $win_Width = $(window).width();
        if($win_Width <= 600){
            $navi.removeAttr('style');
            $navi.removeClass('click');
            $nav_btn.html($btn_down)
        }
    });
});
