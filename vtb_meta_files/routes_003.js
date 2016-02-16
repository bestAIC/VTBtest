/**
 * Created by sunlardo on 15.01.16.
 */
define(['angular',"./controller"],function(angular, controller){
    "use strict";

    var mod = angular.module('index.routes', []);
    mod.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'tpls/index.html',
                controller: controller
            });
    }]);
    return mod;
});