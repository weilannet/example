angular.module('jinmaofu.myHouse.houseIndex', [
    'jinmaofu.myHouse.houseIndex.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('houseIndex', {
        url: '/houseIndex',
        controller: 'houseIndexController',
        templateUrl: 'homePage/myPage/myHouse/houseIndex/houseIndex.tpl.html',
        cache: false,
        authorizedRuleType: ['3', '4']
    })
}])

.controller('houseIndexController', ['pageInitService', '$scope', '$http', '$stateParams', '$ionicPopup',
    function(pageInitService, $scope, $http, $stateParams, $ionicPopup) {

        var apis = [
            '/house/defaultHouse',
            '/house/houses'
        ];

        pageInitService.pageInit(apis).then(function(result) {
            $scope.data = result[0].data;
            $scope.data1 = result[1].data;
        })

        var userTP = $scope.usertype;
        if (userTP == '1') {
            var alertPopup1 = $ionicPopup.alert({
                title: "您还不是会员，请先注册",
                okText: '确认',
            });
            alertPopup1.then(function(res) {
                // 微信关闭方法
                wx.closeWindow();
            });
            $scope.$on('$ionicView.beforeLeave', function() {
                alertPopup1.close();
            });
            return false;
        } else if (userTP == '2') {
            var alertPopup1 = $ionicPopup.alert({
                title: "您还不是业主，请先认证",
                okText: '确认',
            });
            alertPopup1.then(function(res) {
                // 微信关闭方法
                wx.closeWindow();
            });
            $scope.$on('$ionicView.beforeLeave', function() {
                alertPopup1.close();
            });
            return false;
        };
    }
])