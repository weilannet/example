angular.module('jinmaofu.ownerApprove', [
    'ionic',
    'jinmaofu.ownerApprove.mock'
])

.controller('ownerApproveController', ['$ionicHistory', '$http', '$ionicModal', '$rootScope', '$scope', '$ionicPopup', 'CurrentUserService', '$state', '$stateParams',
    function($ionicHistory, $http, $ionicModal, $rootScope, $scope, $ionicPopup, CurrentUserService, $state, $stateParams) {

        $scope.userData = {
            idCard: ''
        };

        // 认证方法
        $scope.approve = function(regForm) {
            var registerData = {
                idCard: $scope.userData.idCard
            };
            $http.post('/user/applandlord', registerData).then(function(res) {
                showMessage('注册成功', '确定');
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
                showMessage(err.data, '确定');
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