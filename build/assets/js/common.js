$(function () {
    var reviewsList = $('.reviews-list.owl-carousel').owlCarousel({
        items: 3,
        dots: true
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
        items: 5,
        loop: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true
    });
    citiesList.on('mousewheel', '.owl-stage', function (e) {
        if (e.deltaY > 0) {
            citiesList.trigger('prev.owl');
        } else {
            citiesList.trigger('next.owl');
        }
        e.preventDefault();
    });

    if ($('#map').length != 0) {
        DG.then(function () {
            const data = [
                {
                    address: 'СМТЕЛ-Архангельск, Архангельск, Площадь Ленина, 4, 16 этаж',
                    position: [64.538600, 40.518259]
                },
                {
                    address: 'Евросервис, г. Архангельск, ул. Урицкого, 43',
                    position: [64.536465, 40.565696]
                },
                {
                    address: 'Коноша - Мегафон, пгт. Коноша, пр. Октябрьский, 16',
                    position: [60.973160, 40.255238]
                },
                {
                    address: 'Шенкурск, г. Шенкурск, Кудрявцева, 38',
                    position: [62.104425, 42.901652]
                },
                {
                    address: 'Троицкий, г. Архангельск, пр. Троицкий 121/1',
                    position: [64.555690, 40.522167]
                },
                {
                    address: 'Полюс, г. Архангельск, ул. Тимме 4',
                    position: [64.542057, 40.570305]
                },
                {
                    address: 'Сульфат, г. Архангельск, ул. Химиков, 6',
                    position: [64.597951, 40.596287]
                },
                {
                    address: 'Северодвинска - Теле 2, г. Северодвинск, ул. Ленина, 35/37',
                    position: [64.557890, 39.830691]
                },
                {
                    address: 'СМТЕЛ-Северодвинск, г. Севродвинск, ул. Ленина, 16',
                    position: [64.562520, 39.825507]
                }
            ]

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
});