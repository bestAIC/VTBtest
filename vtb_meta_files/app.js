/**
 * Created by sunlardo on 15.01.16.
 */
define(['angular', 'common', 'index', 'cards', 'credit'], function (angular) {
    'use strict';

    var dependencies = [
        "ngAnimate",
        "ngRoute",
        "ui.bootstrap",
        "rzModule",
        "jtt_imagesLoaded",
        "app.common",
        "app.index",
        "app.cards",
        "app.credit"
    ];

    // We must already declare most dependencies here (except for common), or the submodules' routes
    // will not be resolved
    return angular.module('app', dependencies)
        .config(['$locationProvider', function ($locationProvider) {
            $locationProvider.html5Mode(false);
        }])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/404', {templateUrl: 'tpls/errors/404.html'})
                .otherwise({redirectTo: '/404'});
        }]);
});