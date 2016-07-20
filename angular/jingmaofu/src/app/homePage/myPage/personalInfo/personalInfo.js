angular.module('jinmaofu.personalInfo', [
    'ionic',
    'jinmaofu.personalInfo.mock',
    'jinmaofu.repairMessageDetail'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('personalInfo', {
        url: '/mine/personalInfo',
        controller: 'personalInfoController',
        templateUrl: 'homePage/myPage/personalInfo/personalInfo.tpl.html',
        cache: false,
        authorizedRuleType: ['2', '3', '4']
    })
}])

.controller('personalInfoController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams', '$state',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams, $state) {

        var apis = [
            '/repairInfo',
            '/chargeInfo',
            '/activityInfo',
            '/deliveryInfo'
        ];
        pageInitService.pageInit(apis).then(function(res) {
            $scope.repairData = res[0].data;
            $scope.chargeData = res[1].data;
            $scope.activityData = res[2].data;
            $scope.deliveryData = res[3].data;
        }, function(err) {})

        // 获取个人消息
        $http.post('/user/getpersonalmessage', {}).then(function(res) {
            // 全部报修消息
            var allRepairData = res.data;

            // 获取全部未读消息
            var noReadMsg = [];
            for (var i = 0; i < allRepairData.length; i++) {
                var item = allRepairData[i];
                if (item.readStatus == '0') {
                    noReadMsg.push(item);
                };
            };

            // 显示未读报修数量
            $scope.noReadNum = noReadMsg.length;

            // 得到全部时间
            var allTime = [];
            for (var j = 0; j < noReadMsg.length; j++) {
                var item = noReadMsg[j];
                allTime.push(transSec(item.taskDate));
            };
            var sortArr = allTime.sort(function(a, b) {
                return b - a;
            });
            var newSec = new Date(sortArr[0])
            var showTime = (newSec.getFullYear()).toString() + '-' + (newSec.getMonth() < 10 ? '0' + newSec.getMonth() : newSec.getMonth()).toString() + '-' + (newSec.getDate() < 10 ? '0' + newSec.getDate() : newSec.getDate()).toString();

            // 最新未读消息显示时间
            $scope.updateTime = showTime;

            // 去报修消息页面
            $scope.goRepairMsgDetail = function() {
                $state.go('repairMessageDetail', { 'allData': allRepairData });
            };
        }, function(err) {
            console.log(err.data);
        });

        // 转换毫秒方法
        function transSec(time) {
            var formatTime = time.replace(new RegExp("-", "gm"), "/");
            return (new Date(formatTime)).getTime();
        };
    }
])