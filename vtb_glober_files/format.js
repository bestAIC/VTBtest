/**
 * Created by sunlardo on 26.01.16.
 */
define(['angular'], function (angular) {
    'use strict';

    var mod = angular.module('common.formatNumberFilter', []);
    mod.filter('formatNumber', function(){
        return function(x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        };
    });

});