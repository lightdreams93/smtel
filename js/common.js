$(function () {
    var reviewsList = $('.reviews-list.owl-carousel').owlCarousel({
        items: 3,
        dots: true,
        margin: 0,
        responsive: {
            1920: {
                items: 3
            },
            1600: {
                items: 3
            },
            1440: {
                items: 3
            },
            1280: {
                items: 3
            },
            991: {
                items: 3
            },
            720: {
                items: 2
            },
            440: {
                items: 1
            },
            360: {
                items: 1
            },
            0: {
                items: 1
            }
        }
    });
    reviewsList.on('mousewheel', '.owl-stage', function (e) {
        if (e.deltaY > 0) {
            reviewsList.trigger('prev.owl');
        } else {
            reviewsList.trigger('next.owl');
        }
        e.preventDefault();
    });


    var citiesList = $('.locations.owl-carousel').owlCarousel({
        items: 8,
        loop: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        margin: 10,
        responsive: {
            1920: {
                items: 8
            },
            1600: {
                items: 7
            },
            1440: {
                items: 6
            },
            1280: {
                items: 5
            },
            991: {
                items: 4
            },
            720: {
                items: 3
            },
            440: {
                items: 2
            },
            360: {
                items: 1
            },
            0: {
                items: 1
            }
        }
    });
    citiesList.on('mousewheel', '.owl-stage', function (e) {
        if (e.deltaY > 0) {
            citiesList.trigger('prev.owl');
        } else {
            citiesList.trigger('next.owl');
        }
        e.preventDefault();
    });

    $('.hamburger').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('is-active');
        if ($(this).hasClass('is-active')) {
            $('.mobile-nav').css({ "display": "block" });
            $('.mobile-nav nav').animate({
                "margin-left": "0"
            }, 500);
            $('.wrapper').css({ "overflow": "hidden" });
            $('body').css({ "overflow": "hidden" });
        }
    });

    $('.mobile-nav').click(function (e) {
        if ($('.hamburger').hasClass('is-active')) {
            $('.mobile-nav nav').animate({
                "margin-left": "-300px"
            }, 500, function () {
                $('.mobile-nav').css({ "display": "none" });
            });
            $('.wrapper').css({ "overflow": "auto" });
            $('body').css({ "overflow": "auto" });
            $('.hamburger').removeClass('is-active');
        }
    });


    $('.simple-accordion').accordion({
        heightStyle: 'content',
        collapsible: true,
        header: '> .simple-accordion__item > .simple-accordion__header',
        activate: function (e, ui) {
            accordionsMaps.forEach(element => {
                //Refresh maps
                element.invalidateSize();
            });
        }
    });

    const data = shopData;

    if ($('#map').length != 0) {
        DG.then(function () {
            var map;

            var prevNum = 0;

            map = DG.map('map', {
                center: data[0].position,
                zoom: 17
            });

            data.forEach(element => {
                DG.marker(element.position).addTo(map);
            });

            $('.map .location').click(function () {
                var num = $(this).index();
                $('.map__info-panel').children().eq(prevNum).removeClass('active');
                $(this).addClass('active');

                map.panTo(data[num].position);
                prevNum = num;
            });
        });
    }

    var accordionsMaps = [];

    DG.then(function () {
        data.forEach((element, index) => {
            if ($('#map-' + index).length != 0) {
                var accordionMap;

                accordionMap = DG.map('map-' + index, {
                    center: element.position,
                    zoom: 17
                });

                DG.marker(element.position).addTo(accordionMap);

                accordionsMaps.push(accordionMap);
            }
        });
    });


});
