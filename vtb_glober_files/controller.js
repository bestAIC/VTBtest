define(['ScrollMagic', 'scrollmagic.debug'], function(ScrollMagic){

    var IndexCtrl = function($scope){

        $(window).scrollTop(0);

        $scope.toggleSwitch = function(state){
            if(state !== null) $scope.services = state;
            else $scope.services = !$scope.services;
        };

        $scope.creditAmount = 700000;

        $scope.variants = [
            {
                src: 'img/index/pic1.jpg',
                title: 'Сделать ремонт'
            },
            {
                src: 'img/index/pic2.jpg',
                title: 'Создание и планирование семьи'
            },
            {
                src: 'img/index/pic3.jpg',
                title: 'Путешественникам'
            }
        ];


        var controller = new ScrollMagic.Controller({
            globalSceneOptions: {triggerHook: "onCenter"}
        });

        var logoContainerStartPosition = parseInt($('.logo-container').css('top'));

        var scene = new ScrollMagic.Scene({
            duration: logoContainerStartPosition
        })
        .addTo(controller)
        .on("progress", function (e) {
            // top-menu white bg and height
            $('#menu')
                .css('background-color', 'rgba(255,255,255,'+e.progress.toFixed(2)+')')
                .css('min-height', (75-35*e.progress+5-5*e.progress+5).toFixed(2)+'px')
                .css('padding-bottom', (5-5*e.progress).toFixed(2)+'px');
            $('.navbar-nav>li>a').css('line-height', (75-35*e.progress).toFixed(2)+'px');

            // menu 2
            $('.dropdown-menu-block').css('top', (0-35*e.progress).toFixed(2)+'px');

            // hamburger
            $('.hamburger').css('line-height', (70-35*e.progress).toFixed(2)+'px');

            // watch height
            $('.clock')
                .css('line-height', (75-35*e.progress).toFixed(2)+'px')
                .css('font-size', (39-9*e.progress).toFixed(2)+'px')
                .css('padding-right', (10*e.progress).toFixed(2)+'px');

            // second-menu white bg, top offset and shadow
            $('.top-menu')
                .css('background-color', 'rgba(255,255,255,'+e.progress.toFixed(2)+')')
                .css('top', (75-35*e.progress+5-5*e.progress+5).toFixed(2)+'px')
                .css('box-shadow', '0 45px 70px -15px rgba(233, 233, 240, '+e.progress.toFixed(2)+')');

            // logo position
            $('.logo-container')
                .css('top', (logoContainerStartPosition-(logoContainerStartPosition-132)*e.progress).toFixed(2)+'px');

            // logo width
            $('.logo').css('width', (193-43*e.progress).toFixed(2)+'px');

            // banner fade out
            $('.banner').css('opacity', (1-e.progress).toFixed(2));
        });

        $scope.$on('$destroy', function(){
           controller.destroy();
            scene.destroy();
        });

    };

    IndexCtrl.$inject = ['$scope'];

    return IndexCtrl;

});