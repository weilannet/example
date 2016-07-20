angular.module('jinmaofu.appFeedback', [
    'ionic',
    'jinmaofu.appFeedback.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('aboutApp/appFeedback', {
        url: '/mine/aboutApp/appFeedback',
        controller: 'appFeedbackController',
        templateUrl: 'homePage/myPage/aboutApp/appFeedback/appFeedback.tpl.html',
        cache: false,
        authorizedRuleType: ['2', '3', '4']
    })
}])

.controller('appFeedbackController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams', '$ionicHistory',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams, $ionicHistory) {
        // 数据绑定
        $scope.feedbackData = {
            content: '',
            mobile: ''
        };

        // 提交反馈
        $scope.appFeedback2 = function() {
            var param = {
                projectId: $scope.feedbackData.content,
                content: $scope.feedbackData.mobile
            };
            console.log(param);
            $http.post('/user/saveFeedback', param).then(function(res) {
                var alertPopup = $ionicPopup.alert({
                    template: "已提交",
                    okText: '确认',
                });
                alertPopup.then(function(res) {
                    // 微信关闭方法
                    $ionicHistory.goBack(-1);
                });
            }, function(msg) {
                var alertPopup = $ionicPopup.alert({
                    template: msg.data + '提交信息失败',
                    okText: '确认'
                });
                alertPopup.then(function(res) {});
            });
        };
    }

])