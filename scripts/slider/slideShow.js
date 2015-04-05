var SlideShow = (function () {
    function SlideShow(id, startFrom, autoSlideShow) {
        var _this = this;
        this.config.startFromIndex = startFrom || this.config.startFromIndex;
        this.config.sliderId = id;
        this._$slider = $('#' + id);
        this._$slidesContainer = this._$slider.children(this.config.slidesContainer);
        this._$slides = this._$slidesContainer.children('.' + this.config.slidesClass);
        this._currentSlideIndex = this.config.startFromIndex;
        this._$slides.hide();
        this.showSlide(this.getCurrentSlide(), true);
        this.setControlPosition();
        setEvents.call(this);
        this._autoSlideShow = autoSlideShow;
        if(autoSlideShow && autoSlideShow.auto == true){
            startSlideShow.call(this);
        }
    }

    SlideShow.prototype.showNextSlide = function showNextSlide() {
        var currentSlide = this.getCurrentSlide(),
            nextSlideData = this.getNextSlide(),
            nextSlide = nextSlideData.slide;

        this.hideSlide(currentSlide, true);
        this.showSlide(nextSlide, true);
        this._currentSlideIndex = nextSlideData.index;
    };

    SlideShow.prototype.showPrevSlide = function showPrevSlide() {
        var prevSlideData = this.getPrevSlide(),
            prevSlideIndex = prevSlideData.index,
            prevSlide = prevSlideData.slide,
            currentSlide = this.getCurrentSlide();

        this.hideSlide(currentSlide);
        this.showSlide(prevSlide);
        this._currentSlideIndex = prevSlideIndex;
    };

    SlideShow.prototype.hideSlide = function hideSlide(slide, left, duration) {
        var duration = duration || 500,
            _this = this,
            $slide = $(slide),
            slideHeight = $slide.height();

        $slide.css('-webkit-filter', 'blur(2px)');
        if (left) {
            $slide.stop().animate({
                left: '-' + _this._$slidesContainer.outerWidth() + 'px',
                top: (_this._$slidesContainer.height() / 2) + 'px'
            }, duration);
        } else {
            $slide.stop().animate({
                left: this._$slidesContainer.outerWidth() + 'px',
                top: (_this._$slidesContainer.height() / 2) + 'px'
            }, duration);
        }
        $(slide).css('top', '0px');
    };

    SlideShow.prototype.showSlide = function showSlide(slide, left, duration) {
        var duration = duration || 300,
            $slide = $(slide);
        $slide
            .css('display', 'block')
            .css('-webkit-filter', 'blur(0)')
            .css('top', 0);
        if (left) {
            $slide.css('left', this._$slidesContainer.outerWidth() + "px");
            $slide.stop().animate({
                left: 0
            }, duration);
        } else {
            $slide.css('left', '-' + this._$slidesContainer.outerWidth() + "px");
            $slide.stop().animate({
                left: 0
            }, duration);
        }
        ;
    };

    SlideShow.prototype.getCurrentSlide = function getCurrentSlide() {
        return this._$slides[this._currentSlideIndex];
    };

    SlideShow.prototype.getNextSlide = function getNextSlide() {
        var nextIndex = this._$slides[this._currentSlideIndex + 1] ? this._currentSlideIndex + 1 : 0;

        return {
            index: nextIndex,
            slide: this._$slides[nextIndex]
        };
    };

    SlideShow.prototype.getPrevSlide = function getPrevSlide() {
        var prevIndex = this._currentSlideIndex > 0 ? this._currentSlideIndex - 1 : this._$slides.length - 1;

        return {
            index: prevIndex,
            slide: this._$slides[prevIndex]
        };
    };

    function startSlideShow(interval) {
        var interval = this._autoSlideShow.interval || 5000,
            _this = this;

        this._slideShowHolder = setInterval(function () {
            _this.showNextSlide();
        }, interval)
    };

    SlideShow.prototype.config = {
        sliderId: 'slider',
        sliderContainer: 'sliderContainer',
        nextSlideButtonClass: 'nextSlideButton',
        prevSlideButtonClass: 'prevSlideButton',
        slidesClass: 'slide',
        startFromIndex: 0
    };

    SlideShow.prototype.setControlPosition = function setControlPosition(top) {
        var prevButton = $('.' + this.config.prevSlideButtonClass),
            nextButton = $('.' + this.config.nextSlideButtonClass),
            middleOfSlidesContainer,
            buttonsHeight;
        if (!top) {
            middleOfSlidesContainer = (this._$slidesContainer.height() - prevButton.height()) / 2;
            top = middleOfSlidesContainer;
        }

        prevButton.css('top', top + 'px');
        nextButton.css('top', top + 'px');
    };

    function setEvents() {
        var nextSlideBtn = $('.' + this.config.nextSlideButtonClass),
            prevSlideBtn = $('.' + this.config.prevSlideButtonClass),
            $sliderDiv = this._$slider,
            _this = this;
        nextSlideBtn.on('click', function () {
            _this.showNextSlide();
        });
        prevSlideBtn.on('click', function () {
            _this.showPrevSlide();
        });
        $sliderDiv.on('mouseenter', function () {
            prevSlideBtn.fadeIn(200);
            nextSlideBtn.fadeIn(200);
            clearInterval(_this._slideShowHolder);
        });
        $sliderDiv.on('mouseleave', function () {
            prevSlideBtn.fadeOut(200);
            nextSlideBtn.fadeOut(200);
            if(_this._autoSlideShow && _this._autoSlideShow.auto == true){
                startSlideShow.call(_this);
            }
        });
    }

    return SlideShow;
})();