angular.module('jinmaofu.forgotPwd', [
    'ionic', 'jinmaofu.forgotPwd.mock'
])

.controller('ForgotPwdController', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
    $scope.forgotPwd = {
        userPhone: "",
        authCode: "",
        password: "",
        passwordConfirm: ""
    }
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
        }, 1000, 100);
    }

    var phoneCodeforgotPwdTime = true;
    $scope.phoneCodeforgotPwd = function() {
        if (phoneCodeforgotPwdTime) {
            phoneCodeforgotPwdTime = false;
            $http.post('/sms/authCode', {
                phone: $scope.forgotPwd.userPhone,
                type: "PASSWORD_R"
            }).then(
                function(data) {
                    startTime();
                    $scope.showAlert('获取手机短信验证码成功', '获取手机短信验证码成功', '确认');
                    phoneCodeforgotPwdTime = true;
                },
                function() {
                    $scope.showAlert('获取手机短信验证码失败', '获取手机短信验证码失败', '确认');
                    phoneCodeforgotPwdTime = true;
                }
            )
        };
    }
    $scope.forgotPwdSend = function(formName) {
        if ($scope.forgotPwd.password == $scope.forgotPwd.passwordConfirm) {
            var paramsReg = {
                "phone": $scope.forgotPwd.userPhone,
                "authCode": $scope.forgotPwd.authCode,
                "password": Base64EncodeService.base64encode($scope.forgotPwd.password)
            };
            $http.put('/user/password', paramsReg).then(
                function(data) {
                    $scope.showAlert('修改密码成功', '修改密码成功', '确认');
                },
                function(msg) {
                    $scope.showAlert('修改密码失败', msg.data, '确认');
                }
            )
        } else {
            $scope.showAlert('校验密码不一致', '校验密码不一致', '确认');
        }
    }
}])