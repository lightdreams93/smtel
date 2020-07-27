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

    $.getJSON('assets/js/shop-data.json', function (data) {
        showCitiesCarousel(data);
        showMapData(data);
        showAccordionData(data);
    }).fail(function () {
        $('.simple-accordion').accordion({
            heightStyle: 'content',
            collapsible: true,
            header: '> .simple-accordion__item > .simple-accordion__header'
        });
    });

    function showCitiesCarousel(data) {
        data.forEach(element => {
            $('.locations').append('<div class="location"><div class= "location__address">' + element.shopName + ', ' + element.address + '</div></div >')
        })

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
    }

    function showMapData(data) {

        if (data.length == 0) return;

        data.forEach((element, index) => {
            if (index == 0)
                $('.map__info-panel').append('<div class="location active"><div class="location__address">' + element.shopName + ', ' + element.address + '</div></div>')
            else
                $('.map__info-panel').append('<div class="location"><div class="location__address">' + element.shopName + ', ' + element.address + '</div></div>')
        });

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


    }

    function showAccordionData(data) {

        data.forEach((element, index) => {
            $('.contact-list').append('<div class="simple-accordion__item contact-list__item"><div class="simple-accordion__header contact-list__header"><div class="contact-list__contact-content"><div class="contact-list__contact-item"><p class="contact-list__city">' + element.shopName + '</p><p class="contact-list__address">' + element.address + '</p></div><div class="contact-list__contact-item"><div class="contact-list__phone"><div class="contact-list__icon"> <img src="assets/img/phone-gray.svg" alt=""></div> <a href="tel:+79009150297" class="contact-list__phone-link">+ 7 (900) 915-02-97</a></div><div class="contact-list__email"><div class="contact-list__icon"> <img src="assets/img/mail-gray.svg" alt=""></div> <a href="mailto:info@smtel29.ru" class="contact-list__email-link">info@smtel29.ru</a></div><div class="contact-list__work-time"><div class="contact-list__icon"> <img src="assets/img/clock-gray.svg" alt=""></div><p class="contact-list__work-time-text">' + element.workTime + '</p></div></div></div></div><div><div class="contact-list-gallery"><div class="contact-list-gallery__image"> <a href="assets/img/banner-bg.jpg" data-fancybox="images"> <img src="assets/img/banner-bg.jpg" alt="" /> </a></div><div class="contact-list-gallery__image"> <a href="assets/img/banner-bg.jpg" data-fancybox="images"> <img src="assets/img/banner-bg.jpg" alt="" /> </a></div><div class="contact-list-gallery__image"> <a href="assets/img/banner-bg.jpg" data-fancybox="images"> <img src="assets/img/banner-bg.jpg" alt="" /> </a></div></div><div id="map-' + index + '" class="contact-list__map"></div></div></div>')
        });

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
    }
});
