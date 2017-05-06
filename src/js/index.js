;
(function($, window, document, undefined) {

    "use strict";
    /*---------------*/
    /* MENU */
    /*---------------*/
    var $first_child_link = $('.menu-item-has-children > a').append('<span class="fa fa-angle-down"></span>');

    $('.nav-menu-icon').click(function(e) {
        $(this).toggleClass('active');
        $('.main-navigation').toggleClass('active');
    });

    $first_child_link.find('span').click(function(e) {
        $(this).closest('li').toggleClass('active');
    });



    /*---------------*/
    /* SWIPER SLIDER */
    /*---------------*/
    /*  data-slides-per-view = '3' // default slide for view
        data-loop = true // circle slides
        data-autoplay = '3000' // default, can add time for view slide ( 3000 )
        data-speed = '3000' //time animation slide
        data-space-between = '70' // 40 space between slides
        data-center = false //  If true, then active slide will be centered, not always on the left side.
        data-mode = 'horizontal' //Could be 'horizontal' or 'vertical' (for vertical slider).

        data-lg-slides = '3' //3 slider 
        data-md-slides = '2' //2 slider 
        data-sm-slides = '1'  //1 slider 
        data-effect = 'slide' //  Could be "slide", "fade", "cube", "coverflow" or "flip"*/

    function initSwiper() {
        var swipers = {};
        $('.swiper-container').each(function(index) {
            var that = $(this),
                sliderIndex = 'swiper-unique-id-' + index,
                thisButtonNext = '.swiper-button-next' + index,
                thisButtonPrev = '.swiper-button-prev' + index;

            var autoHeight = that.attr('data-autoheight'),
                autoPlayVar = that.attr('data-autoplay'),
                mode = that.attr('data-mode'),
                slidesPerViewVar = parseInt(that.attr('data-slides-per-view'), 10),
                loopVar = that.attr('data-loop'),
                speedVar = parseInt(that.attr('data-speed'), 10),
                centerVar = that.attr('data-center'),
                effect = that.attr('data-effect'),
                spaceBetweenVar = parseInt(that.attr('data-space-between'), 10),
                dataLgSlides = that.attr('data-lg-slides'),
                dataMdSlides = that.attr('data-md-slides'),
                dataSmSlides = that.attr('data-sm-slides');

            that.find('.swiper-button-next').addClass('swiper-button-next' + index);
            that.find('.swiper-button-prev').addClass('swiper-button-prev' + index);
            that.find('.swiper-pagination').addClass('pagination-' + sliderIndex);
            that.addClass(sliderIndex + ' initialized').attr('id', sliderIndex);



            swipers[sliderIndex] = new Swiper('.' + sliderIndex, {
                speed: speedVar || 300,
                pagination: '.pagination-' + sliderIndex,
                loop: loopVar || false,
                paginationClickable: true,
                autoplay: autoPlayVar || false,
                slidesPerView: slidesPerViewVar || 'auto',
                keyboardControl: true, // Set to true to enable navigation through slides using keyboard right and left (for horizontal mode), top and borrom (for vertical mode) keyboard arrows
                autoHeight: autoHeight || true, // Set to true and slider wrapper will adopt its height to the height of the currently active slide
                simulateTouch: true, //If true, Swiper will accept mouse events like touch events (click and drag to change slides)
                roundLengths: true, //Set to true to round values of slides width and height to prevent blurry texts on usual resolution screens (if you have such)
                centeredSlides: centerVar || false,
                effect: effect || 'slide',
                direction: mode || 'horizontal',
                autoplayDisableOnInteraction: false,
                spaceBetween: spaceBetweenVar || 0,
                grabCursor: true,
                // Navigation arrows
                nextButton: thisButtonNext, //CSS selector or HTML element of the element that will work like "next" button
                prevButton: thisButtonPrev, //CSS selector or HTML element of the element that will work like "prev" button
                // Responsive breakpoints
                breakpoints: {
                    // when window width is <= 768px
                    768: {
                        slidesPerView: dataSmSlides || 1
                            // spaceBetween: 10
                    },
                    // when window width is <= 992px
                    992: {
                        slidesPerView: dataMdSlides || 1
                            // spaceBetween: 20
                    },
                    // when window width is <= 1200px
                    1200: {
                        slidesPerView: dataLgSlides || 1
                            // spaceBetween: 30
                    }
                },
                onInit: function(swiper) {},
                onSlideChangeEnd: function(swiper) {},
                onSlideChangeStart: function(swiper) {},
                onSlideClick: function(swiper) {}
            });
            swipers[sliderIndex].update();

            // when mouse hover on slider - slide stop
            $('.swiper-container').on('mouseover', function() {
                swipers[sliderIndex].stopAutoplay();
            });

            $('.swiper-container').on('mouseout', function() {
                swipers[sliderIndex].startAutoplay();
            });
        });


    }


    initSwiper();


    /////////////////////////////////
    // BACKGROUND IMAGE
    ////////////////////////////////

    function wpc_add_img_bg(img_sel, parent_sel, img_height) {
        if (!img_sel) {
            console.info('no img selector');
            return false;
        }
        var $parent, $that;
        $(img_sel).each(function() {
            $that = $(this);
            $parent = $that.closest(parent_sel);
            $parent = $parent.length ? $parent : $that.parent();
            if (img_height) {
                $parent.css('background-image', 'url(' + this.src + ')');
                $that.css('visibility', 'hidden');
            } else {
                $parent.css('background-image', 'url(' + this.src + ')');
                $that.hide();
            }
        });
    }



    wpc_add_img_bg('.js-bg-img > img', '.js-bg-img');
    wpc_add_img_bg('.js-bg-img_with-height > img', '.js-bg-img_with-height', true); // BACKGROUND IMAGE with images height

    /////////////////////////////////
    // scroll
    ////////////////////////////////
    $(document).on('scroll', function() {

    });
    /////////////////////////////////
    // load
    ////////////////////////////////
    $(document).on('load', function() {
        initSwiper();
    });

    /////////////////////////////////
    // Resize
    ////////////////////////////////
    $(document).on('resize', function() {
        initSwiper();
    });

})(jQuery, window, document);