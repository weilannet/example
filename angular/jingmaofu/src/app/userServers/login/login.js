angular.module('jinmaofu.login', [
    'ionic',
    'jinmaofu.login.mock'
])

.controller('LoginController', ['$ionicHistory', '$http', '$ionicModal', '$rootScope', '$scope', '$ionicPopup', 'CurrentUserService', '$state', '$stateParams', '$interval',
    function($ionicHistory, $http, $ionicModal, $rootScope, $scope, $ionicPopup, CurrentUserService, $state, $stateParams, $interval) {

        $scope.pageShow = {
            login: true,
            forgotPwd: false,
            register: false
        };
        $scope.credentials = {
            username: "",
            password: "",
        }
        $scope.showConfirm = function(title, template, rightText, leftText) {
            var confirmPopup = $ionicPopup.confirm({
                title: title,
                okText: leftText,
                template: template,
                cancelText: rightText
            });

            confirmPopup.then(function(res) {
                if (res) { //
                } else {}
            });
        };
        $scope.login = function(credentials, formName) {
            // var username = base64encode("username");
            // var password = base64encode("password");
            // var form = base64encode("form");
            // var phoneUUID = base64encode("phoneUUID");
            // var sendData = {};
            // sendData[username] = base64encode(credentials.username);
            // sendData[password] = base64encode(credentials.password);

            if (formName.$valid) {
                CurrentUserService.login(credentials)
                    .then(function(user) {
                            if (user) {
                                $scope.modal.remove();
                                if (!$scope.modal.nextState) {
                                    $state.reload($state.current.name);
                                    return;
                                };
                                if ($scope.modal.nextState.toState.name == "blankPage") {
                                    $ionicHistory.clearCache().then(function() {
                                        // $state.go("homeRunE/workPlatform", {}, { location: 'replace' });
                                        $state.go("homePage", {}, { location: 'replace' });
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
                                // var rule = $scope.modal.nextState.toState.authorizedRuleType;
                                // var isHasAuth = CurrentUserService.contains(rule, user.data.userType);
                                // if (isHasAuth) {
                                //     //上传device
                                //     // obtainDeviceToken();
                                //     //新添加的

                                // };
                            } else {
                                formName.$submitted = false;
                            };
                        },
                        function() {});
            } else {
                $scope.showAlert('请输入用户名或密码', '请输入用户名或密码', '确认');
                formName.$submitted = false;
                // formName.$submitted = true;
            };
            // $scope.modal.remove();
            // $state.go("home/index",{},{location:'replace'});
            //     $ionicHistory.nextViewOptions({
            //         disableAnimate:true,
            //         disableBack:true,
            //     });
        }

        $scope.showAlert = function(title, template, okText) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                okText: okText,
                template: template
            });
            alertPopup.then(function(res) {});
        };

        $scope.toLogin = function() {
            $scope.pageShow = {
                login: true,
                forgotPwd: false,
                register: false
            };
        };

        $scope.toForgotPwd = function() {
            $scope.pageShow = {
                login: false,
                forgotPwd: true,
                register: false
            };
        };
        $scope.toRegister = function() {
            $scope.pageShow = {
                login: false,
                forgotPwd: false,
                register: true
            };
        };

        $scope.getContentTpl = function(currentTab) {
            return currentTab + '.tpl.html';
        };
        // 关闭模态框
        $scope.goBack = function() {
            $scope.modal.hide();
        };
    }
])