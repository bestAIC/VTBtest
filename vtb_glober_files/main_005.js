/**
 * Created by sunlardo on 15.01.16.
 */
(function(requirejs){
    'use strict';

    requirejs.config({
        packages: ['common', 'index', 'cards', 'credit'],
        shim: {
            "angular": {
                exports: 'angular'
            },
            "angular-route": {
                deps: ['angular']
            },
            "angular-animate": {
                deps: ['angular']
            },
            "angular-images-loaded": {
                deps: ['angular']
            },
            "ui.bootstrap": {
                deps: ['angular']
            },
            "angularjs-slider": {
                deps: ['angular']
            },
            'jquery': {
                exports: 'jquery'
            },
            "underscore": {
                exports: '_'
            }
        },
        paths: {
            "angular": '../lib/angular/angular.min',
            "angular-route": '../lib/angular-route/angular-route.min',
            "angular-animate": '../lib/angular-animate/angular-animate.min',
            "angular-images-loaded": '../lib/angular-images-loaded-jtt/dist/angular-images-loaded-directive.min',
            "ui.bootstrap": '../lib/angular-bootstrap/ui-bootstrap-tpls.min',
            "angularjs-slider": '../lib/angularjs-slider/dist/rzslider.min',
            "underscore": '../lib/underscore/underscore-min',
            "jquery": '../lib/jquery/dist/jquery.min',
            "ScrollMagic": '../lib/scrollmagic/scrollmagic/minified/ScrollMagic.min',
            "scrollmagic.debug": '../lib/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min'
        },
        waitSeconds: 60
    });

    require([
            'angular',
            'angular-route',
            'angular-animate',
            'angular-images-loaded',
            'ui.bootstrap',
            'angularjs-slider',
            'underscore',
            'jquery',
            'ScrollMagic',
            './app'
        ],
        function (angular) {
            angular.bootstrap(document, ['app']);
        },
        function(err){
            console.log(err);
        }
    );

})(requirejs);