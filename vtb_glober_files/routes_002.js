/**
 * Created by sunlardo on 15.01.16.
 */
define(['angular',"./controller"],function(angular, controller){
    "use strict";

    var mod = angular.module('credit.routes', []);
    mod.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/credit', {
                templateUrl: 'tpls/credit.html',
                controller: controller
            });
    }]);
    return mod;
});