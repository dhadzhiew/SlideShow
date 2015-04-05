$(function(){

    var slider = new SlideShow('slider', 0, {auto: true, interval: 5000});

    $(window).on('keyup', function(event){
        var leftKey = 39,
            rightKey = 37;
        if(event.keyCode == leftKey){
            slider.showNextSlide();
        }else if(event.keyCode == rightKey){
            slider.showPrevSlide();
        }
    });
});

