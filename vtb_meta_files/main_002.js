/**
 * Created by sunlardo on 15.01.16.
 */
define(['angular', './format', './format-directive'], function(angular){
    var dependencies = ['common.formatNumberFilter', 'common.formatNumberDirective'];

    return angular.module('app.common', dependencies)
        .controller('AppCtrl', ['$scope', '$location', '$timeout', function($scope, $location, $timeout){

            $scope.isDropdownMenuVisible = true;

            $scope.toggleDropdownMenu = function(){
                $scope.isDropdownMenuVisible = !$scope.isDropdownMenuVisible;
                console.log($scope.isDropdownMenuVisible);
            };


            $scope.tab = 'tab1';

            $scope.showTab = function(tab){
                $scope.tab = tab;
            };

            $scope.currentTimeHours = "00";
            $scope.currentTimeMins = "00";

            var tick = function() {
                var date = new Date();
                $scope.currentTimeHours = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
                $scope.currentTimeMins = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
                $timeout(tick, 1000);
            };

            tick();

            $scope.$on('$routeChangeStart', function(next, current) {
                $scope.currentModule = current.$$route.originalPath.split('/')[1];
                $scope.isDropdownMenuVisible = false;
                if($scope.currentModule == 'credit') $scope.tab = 'tab1';
                if($scope.currentModule == 'cards') $scope.tab = 'tab2';
            });

        }]);
});