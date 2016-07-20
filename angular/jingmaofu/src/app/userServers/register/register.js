angular.module('jinmaofu.register', [
    'ionic', 'jinmaofu.register.mock'
])

.controller('registerController', ['$scope', '$http', '$ionicPopup', 'CurrentUserService', '$state', '$ionicHistory', '$ionicModal', '$interval',
    function($scope, $http, $ionicPopup, CurrentUserService, $state, $ionicHistory, $ionicModal, $interval) {

        // // 数据绑定
        $scope.userData = {
            passWord: '',
            confirmPass: '',
            mobileNumber: '',
            phoneCode: ''
        };

        $scope.paracont = "获取验证码";
        var startTime = function() {
            $scope.showButton = false;
            var second = 120, //倒计时的时间
                timePromise = undefined;
            timePromise = $interval(function() {
                if (second <= 0) {
                    $interval.cancel(timePromise);
                    timePromise = undefined;
                    second = 120;
                    $scope.paracont = "重发验证码";
                    $scope.showButton = false;
                } else {
                    $scope.showButton = true; //用ng-disabled控制按钮的显隐
                    $scope.paracont = second + "秒后可重发";
                    second--;
                }
            }, 1000, 121);
        }

        function getDeviceInfo() {
            var deviceInfoAll = navigator.userAgent;
            if (deviceInfoAll.indexOf('Android') != '-1') {
                return 'android';
            } else if (deviceInfoAll.indexOf('iPhone') != '-1') {
                return 'ios';
            };
        };
        // // 注册方法
        $scope.register = function(regForm) {
            var version = getDeviceInfo();
            if ($scope.userData.passWord != $scope.userData.confirmPass) {
                showMessage('两次输入密码不一致，请重新输入', '确定');
                return;
            };
            var registerData = {
                passWord: $scope.userData.passWord,
                mobileNumber: $scope.userData.mobileNumber,
                phoneCode: $scope.userData.phoneCode,
                os: version
            };
            $http.post('/user/appadduser', registerData).then(function(res) {
                localStorage.setItem('localToken', res.token);
                showMessage('注册成功', '确定');
                CurrentUserService.updateSession(res.data);
                if (res) {
                    $scope.modal.remove();
                    if (!$scope.modal.nextState) {
                        $state.reload($state.current.name);
                        return;
                    };
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



        // // 获取验证码
        var codeTime = true;
        $scope.phoneCode = function(phone, formName) {
            if (codeTime) {
                codeTime = false;
                var reqType = 'REGISTER';
                $http.post('/sms/authCode', {
                    phone: phone,
                    type: reqType
                }).then(
                    function(data) {
                        startTime();
                        var confirmPopup = $ionicPopup.alert({
                            template: '验证码已发送',
                            okText: '确定'
                        });
                        codeTime = true;
                        $scope.$on('$ionicView.beforeLeave', function() {
                            confirmPopup.close();
                        });
                    },
                    function(data) {
                        var confirmPopup = $ionicPopup.alert({
                            template: data.data,
                            okText: '确定'
                        });
                        codeTime = true;
                        $scope.$on('$ionicView.beforeLeave', function() {
                            confirmPopup.close();
                        });
                    }
                )
            }
        };

        var showMessage = function(template, okText) {
            var msgPopup = $ionicPopup.alert({
                template: template,
                okText: okText
            });
        };
    }
])