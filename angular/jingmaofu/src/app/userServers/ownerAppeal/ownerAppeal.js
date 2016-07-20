angular.module('jinmaofu.ownerAppeal', [
    'ionic',
    'jinmaofu.ownerAppeal.mock'
])

.controller('ownerAppealController', ['$ionicHistory', '$http', '$ionicModal', '$rootScope', '$scope', '$ionicPopup', 'CurrentUserService', '$state', '$stateParams', '$interval',
    function($ionicHistory, $http, $ionicModal, $rootScope, $scope, $ionicPopup, CurrentUserService, $state, $stateParams, $interval) {

        $scope.userData = {
            idCard: '',
            realName: '',
            address: ''
        };

        // 认证方法
        $scope.approve = function(regForm) {
            var appealData = {
                idCard: $scope.userData.idCard,
                realName: $scope.userData.realName,
                address: $scope.userData.address
            };
            $http.post('/user/appappeal', appealData).then(function(res) {
                showMessage('注册成功', '好');
                CurrentUserService.updateSession(res.data);
                if (res) {
                    $scope.modal.remove();
                    if ($scope.modal.nextState.toState.name == "blankPage") {
                        $ionicHistory.clearCache().then(function() {
                            $state.go("home/index", {}, { location: 'replace' });
                        });
                        $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true
                        });
                    } else {
                        $ionicHistory.clearCache().then(function() {
                            $state.go($scope.modal.nextState.toState, $scope.modal.nextState.toParams);
                        });
                    };
                    regForm.$submitted = false;
                };
            }, function(err) {
                showMessage(err.data, '好');
                regForm.$submitted = false;
            });
        }

        var showMessage = function(template, okText) {
            var msgPopup = $ionicPopup.alert({
                template: template,
                okText: okText
            });
        };

        // 回到之前页面方法
        $scope.goBack = function() {
            $scope.modal.remove();
        };
    }
])