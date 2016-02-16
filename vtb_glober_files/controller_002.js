define(['ScrollMagic', 'scrollmagic.debug'], function(ScrollMagic){

    var CreditCtrl = function($scope, $routeParams, $uibModal){

        $(window).scrollTop(0);

        if($routeParams.limit){
            $scope.creditAmount = $routeParams.limit;
            // scrollTo calculator
        }
        else{
            $scope.creditAmount = 200000;
        }

        $scope.creditTime = 8;

        $scope.percents = 18;

        $scope.tabs = [
            {
                id: 1,
                name: 'Документы',
                url: 'tpls/credit-tabs/documents.html'
            },
            {
                id: 2,
                name: 'Требования к заемщику',
                url: 'tpls/credit-tabs/requirements.html'
            },
            {
                id: 3,
                name: 'Погашение кредита',
                url: 'tpls/credit-tabs/payments.html'
            },
            {
                id: 4,
                name: 'Страхование',
                url: 'tpls/credit-tabs/insurance.html'
            }
        ];

        $scope.tab = {};

        $scope.changeTab = function(id){
            $scope.tab = _.find($scope.tabs, function(t){return t.id == id;});
        };

        $scope.changeTab(1);


        var ModalInstanceCtrl = function ($scope, $uibModalInstance, credit) {
            $scope.creditRequest = {
                creditAmount: credit.amount,
                creditTime: credit.time
            };
            $scope.loginForm = {};
            $scope.filled = [
                {
                    login: 'vasya',
                    password: '123',
                    creditRequest: {
                        firstName: 'Василий',
                        lastName: 'Васильев',
                        middleName: 'Васильевич',
                        birthdate: '11.03.1982',
                        phone: '+7 (926) 321-42-78',
                        email: 'v.vailyev@gmail.com',
                        isRussianCitizen: true,
                        personalDataAgreement: true,
                        region: 'Москва',
                        salaryToCard: true,
                        creditCity: 'Москва',
                        passport: '45 06 587 658',
                        passportDate: '04.04.2006'
                    }
                },
                {
                    login: 'masha',
                    password: '321',
                    creditRequest: {
                        firstName: 'Мария',
                        lastName: 'Захарова',
                        middleName: 'Петровна',
                        birthdate: '09.11.1976',
                        phone: '+7 (916) 745-12-85',
                        email: 'm.zakharova@rambler.ru',
                        isRussianCitizen: true,
                        personalDataAgreement: true,
                        region: 'Санкт-Петербург',
                        salaryToCard: false,
                        creditCity: 'Москва',
                        passport: '45 04 524 145',
                        passportDate: '14.12.2003'
                    }
                }
            ];
            $scope.auth = false;
            $scope.showLogin = function(show){
                $scope.auth = show;
            };
            $scope.login = function(valid){
                if(valid){
                    var data = _.find($scope.filled, function(i){
                        return i.login == $scope.loginForm.login && i.password == $scope.loginForm.password;
                    });
                    if(data){
                        $scope.creditRequest = data.creditRequest;
                        $scope.showLogin(false);
                    }
                    else{
                        $scope.loginForm.failed = true;
                        $scope.loginForm.password = '';
                    }
                }
            };
            $scope.ok = function(formValid){
                if(formValid) $uibModalInstance.close($scope.creditRequest);
            };
            $scope.cancel = function(){
                $uibModalInstance.dismiss('cancel');
            };
        };
        ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'credit'];

        $scope.openModal = function(){
            var modalInstance = $uibModal.open({
                templateUrl: 'tpls/modals/credit-request.html',
                controller: ModalInstanceCtrl,
                resolve: {
                    "credit": function(){
                        return {
                            amount: $scope.creditAmount,
                            time: $scope.creditTime
                        };
                    }
                },
                size: 'lg'
            });
            modalInstance.result.then(function (creditRequest) {
                console.log(creditRequest);
            });
        };

        var controller = new ScrollMagic.Controller({
            globalSceneOptions: {triggerHook: "onCenter"}
        });
        // init scene
        var scene = new ScrollMagic.Scene({
            duration: 644
        })
        .addTo(controller)
        .on("progress", function (e) {
            // banner fade out
            $('.banner').css('opacity', (1-e.progress).toFixed(2));

            var color = 255-25*e.progress.toFixed(2);
            // menu
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
        });

        $scope.$on('$destroy', function(){
            controller.destroy();
            scene.destroy();
        });

    };

    CreditCtrl.$inject = ['$scope', '$routeParams', '$uibModal'];

    return CreditCtrl;

});