/**
 * Created by sunlardo on 15.01.16.
 */
define(['angular',"./controller"],function(angular, controller){
    "use strict";

    var mod = angular.module('cards.routes', []);
    mod.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/cards', {
                templateUrl: 'tpls/cards.html',
                controller: controller
            });
    }]);
    return mod;
});