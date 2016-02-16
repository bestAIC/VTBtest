define(['ScrollMagic', 'scrollmagic.debug'], function(ScrollMagic){

    var CardsCtrl = function($scope, $timeout){

        $(window).scrollTop(0);

        $scope.isLoaded = false;

        $scope.creditLimit = 0;
        $scope.serviceCosts = 10000;

        $scope.cards = [
            {
                img: 'img/cards/card-1.jpg',
                creditLimit: 1500000,
                serviceCosts: 0
            },
            {
                img: 'img/cards/card-2.jpg',
                creditLimit: 300000,
                serviceCosts: 1000
            },
            {
                img: 'img/cards/card-3.jpg',
                creditLimit: 300000,
                serviceCosts: 5000
            },
            {
                img: 'img/cards/card-4.jpg',
                creditLimit: 1000000,
                serviceCosts: 9000
            },
            {
                img: 'img/cards/card-5.jpg',
                creditLimit: 600000,
                serviceCosts: 10000
            }
        ];

        $scope.allCards = [
            {
                title: 'Карта мира',
                description1: '2 мили за каждые 35 руб. потраченных по карте при оплате покупок',
                description2: 'Билеты авиакомпаний за накопленные мили',
                description3: 'Страховая программа «Защита путешественников»',
                img: 'img/cards/cards-1.jpg'
            },
            {
                title: 'Карта впечатлений',
                description1: '3% cash back при оплате счета в кафе, ресторане, покупке билетов в кино',
                description2: '1% cash back при оплате других покупок, включая оплату через интернет',
                description3: 'Услуги по резервированию столиков и билетов',
                img: 'img/cards/cards-2.jpg'
            },
            {
                title: 'Автокарта',
                description1: '5% cash back при оплате покупок на любых АЗС и оплате парковки',
                description2: '3% cash back при оплате счета в кафе, ресторане, покупке билетов в кино',
                description3: 'Набор услуг «Помощь на дорогах»',
                img: 'img/cards/cards-3.jpg'
            },
            {
                title: 'Карта Коллекция',
                description1: '1 бонус за каждые 25 рублей потраченных по карте при оплате покупок',
                description2: '1% cash back при оплате других покупок, включая оплату через интернет',
                description3: 'Услуги по резервированию столиков и билетов',
                img: 'img/cards/cards-4.jpg'
            }
        ];

        $scope.cardsFilter = function(creditLimit, serviceCosts){
            return function(item){
                return item.creditLimit >= parseInt(creditLimit) && item.serviceCosts <= parseInt(serviceCosts);
            }
        };

        $scope.$on('imagesLoaded.ALWAYS', function() {
            $timeout(function(){
                $scope.isLoaded = true;
            }, 100, false);
        });

        var controllerCard = new ScrollMagic.Controller({
            globalSceneOptions: {triggerHook: "onEnter"}
        });

        var sceneCard = new ScrollMagic.Scene({triggerElement: ".card-bottom", duration: 400})
        .addTo(controllerCard)
        .on("progress", function (e) {
            $('#cardBottom')
                .css('transform', 'rotateX('+(72-87*e.progress).toFixed(0)+'deg)')
                .css('-webkit-transform', 'rotateX('+(72-87*e.progress).toFixed(0)+'deg)')
                .css('-o-transform', 'rotateX('+(72-87*e.progress).toFixed(0)+'deg)')
                .css('-moz-transform', 'rotateX('+(72-87*e.progress).toFixed(0)+'deg)')
                .css('-ms-transform', 'rotateX('+(72-87*e.progress).toFixed(0)+'deg)');
        });

        var controller = new ScrollMagic.Controller({
            globalSceneOptions: {triggerHook: "onCenter"}
        });

        var scene = new ScrollMagic.Scene({
            duration: 644
        })
        .addTo(controller)
        .on("progress", function (e) {
            // cards submenu
            $('.submenu').css('top', (644-644*e.progress < 50 ? 50 : 644-644*e.progress).toFixed(2) + 'px');

            // animate top banner if loaded
            if($scope.isLoaded){
                $('.banner').css('opacity', (1-e.progress).toFixed(2));
            }

            var color = 255-25*e.progress.toFixed(2);
            // top-menu white bg and height
            $('#menu')
                .css('background-color', 'rgba(255,255,255,'+e.progress.toFixed(2)+')')
                .css('border-bottom-color', 'rgb('+color+','+color+','+color+')')
                .css('min-height', (75-35*e.progress+10).toFixed(2)+'px');
            $('.navbar-nav>li>a').css('line-height', (75-35*e.progress).toFixed(2)+'px');

            // menu 2
            $('.dropdown-menu-block').css('top', (0-36*e.progress).toFixed(2)+'px');

            // hamburger
            $('.hamburger').css('line-height', (70-35*e.progress).toFixed(2)+'px');

            // watch height
            $('.clock')
                .css('line-height', (75-35*e.progress).toFixed(2)+'px')
                .css('font-size', (39-9*e.progress).toFixed(2)+'px')
                .css('padding-right', (10*e.progress).toFixed(2)+'px');

            // logo position
            $('.logo-cards')
                .css('margin-top', (73-68*e.progress).toFixed(2)+'px');
        });


        $scope.$on('$destroy', function(){
            controller.destroy();
            scene.destroy();
            controllerCard.destroy();
            sceneCard.destroy();
        });

    };

    CardsCtrl.$inject = ['$scope', '$timeout'];

    return CardsCtrl;

});