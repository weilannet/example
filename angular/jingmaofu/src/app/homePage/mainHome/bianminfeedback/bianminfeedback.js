angular.module('jinmaofu.bianminfeedback', [
    'ionic',
    'jinmaofu.bianminfeedback.mock'
])

.config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('bianminfeedback', {
            url: '/bianminfeedback',
            controller: 'bianminfeedbackController',
            templateUrl: 'homePage/mainHome/bianminfeedback/bianminfeedback.tpl.html',
            resolve: {
                userInfoData: ['$http', function($http) {
                    return $http.get('/user/loginUserInfo');
                }]
            },
            authorizedRuleType: ['1', '2', '3', '4'],
        })
    }])
    .controller('bianminfeedbackController', ['$scope', '$http', '$ionicPopup', '$ionicHistory', 'pageInitService', '$ionicPopup', 'userInfoData',
        function($scope, $http, $ionicPopup, $ionicHistory, pageInitService, $ionicPopup, userInfoData) {
            var userTP = userInfoData.data.userinfo.userType;
            if (userTP == '1') {
                var confirmPopup = $ionicPopup.alert({
                    template: "您还不是会员，请先注册",
                    okText: '确认',
                });
            };

            $scope.inputdata = { bmfb_content: '' }

            $scope.bmfeedBack2 = function(formName) {
                var data2 = {
                    type: '3',
                    projectId: userTP, //房产ID（游客省略）    
                    content: $scope.inputdata.bmfb_content //反馈内容 
                };

                $http.post("/user/feedback", data2).then(function(res) {
                    var confirmPopup = $ionicPopup.alert({
                        template: "我们将尽快核实相关信息，感谢您的关注。",
                        okText: '确认',
                    });
                    confirmPopup.then(function(res) {
                        formName.$submitted = false;
                    });
                }, function(msg) {
                    var confirmPopup = $ionicPopup.alert({
                        template: "提交信息失败",
                        okText: '确认'
                    });
                    confirmPopup.then(function(res) {
                        formName.$submitted = false;
                    });
                });
            };
        }
    ]);