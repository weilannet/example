angular.module('jinmaofu.repairMessageDetail', [
    'ionic',
    'jinmaofu.repairMessageDetail.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('repairMessageDetail', {
        url: '/repairMessageDetail',
        cache: 'false',
        controller: 'repairMessageDetailController',
        templateUrl: 'homePage/myPage/personalInfo/repairMessageDetail/repairMessageDetail.tpl.html',
        authorizedRuleType: ['2', '3', '4'],
        params: { 'allData': null },
    })
}])

.controller('repairMessageDetailController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams', '$state', '$ionicHistory',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams, $state, $ionicHistory) {

        // 获取个人消息
        $http.post('/user/getpersonalmessage', {}).then(function(res) {
            // 全部报修消息
            $scope.allRepairData = res.data;
            if ($scope.allRepairData == null) {} else {
                var allData = $scope.allRepairData;
                // 排序已完成 未完成
                var noFin = [];
                var fin = [];
                for (var i = 0; i < allData.length; i++) {
                    var items = allData[i];
                    if (items.readStatus == '0') {
                        noFin.push(items);
                    } else {
                        fin.push(items);
                    };
                };
                var afterArr = noFin.concat(fin);
                $scope.sortArr = afterArr;
            }
        }, function(err) {
            console.log(err.data);
        });
        // 删除并发送请求
        $scope.deleteMarkRead = function(id) {
            var params = {
                taskId: id
            };
            $http.post('/user/changepersonalcollectionstatus', params).then(function(res) {}, function(err) {
                console.log('出错了' + err.data);
            });
        };
        $scope.goRepairDetail = function(taskId, repairId) {
            $scope.deleteMarkRead(taskId);
            $state.go('propertrepairdetail', { 'repairData': repairId });
        };
    }
])