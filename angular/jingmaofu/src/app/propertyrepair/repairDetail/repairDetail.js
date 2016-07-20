angular.module('jinmaofu.repairDetail', [
    'ionic',
    'jinmaofu.repairDetail.mock',
    'ion-gallery'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('propertrepairdetail', {
        url: '/propertyRepair/weChatRepairInfo/:repairData',
        controller: 'RepairDetailController',
        templateUrl: 'propertyrepair/repairDetail/repairDetail.tpl.html',
        authorizedRuleType: ['2', '3', '4']
    })
}])

.controller('RepairDetailController', ['$scope', '$http', '$stateParams', '$ionicPopup', '$ionicHistory', 'pageInitService',
    function($scope, $http, $stateParams, $ionicPopup, $ionicHistory, pageInitService) {

        var api1 = '/propertyRepair/weChatRepairProgress/' + $stateParams.repairData;
        var api2 = '/propertyRepair/weChatRepairInfo/' + $stateParams.repairData;
        var apis = [api1, api2];
        pageInitService.pageInit(apis).then(function(res) {
            if (res[0] && res[1]) {
                $scope.progressData = res[0].data;
                $scope.statusData = res[1].data;
            }
            // 提交按钮标识符
            $scope.canSubmit = {
                yes: ''
            };
            if ($scope.progressData.status == '已完成') {
                $scope.canSubmit.yes = true;
            } else {
                $scope.canSubmit.yes = false;
            };

            var satisfiedArray = ["请评价", "非常不满意", "不满意", "一般", "满意", "非常满意"];
            $scope.satisfiedDegree = satisfiedArray[0];

            // $scope.showSatisfiedDegree = satisfiedArray[$scope.data.grade];
            $scope.satisfied = 0;

            $scope.setSpeedStar = function(i) {
                $scope.satisfied = i;
                $scope.badJudge = '0';
                $scope.satisfiedDegree = satisfiedArray[i];
            };

            // 评价方法
            $scope.postEvaluate = function() {
                if ($scope.satisfied != 0) {
                    // 在已经选择了星星的情况下
                    var evaluateParams = {
                        "id": $scope.statusData.id, //报修单id
                        "grade": $scope.satisfied, //评分：3星
                        "userId": $scope.progressData.userId, //被评价人id
                        "evaluateContent": $scope.satisfiedDegree //评价内容
                    };
                    $http.post('/propertyRepair/weChatRepairEvaluate', evaluateParams).success(function(res) {
                        showConfirm('评价完成', '确定', 1);
                    }).error(function(err) {
                        showConfirm(err, '确定', 2);
                    });
                } else {
                    showConfirm('请先评分', '确定', 3);
                };
            };

            // 提交按钮信息
            $scope.submitInfo = {
                text: ''
            };
            if ($scope.statusData.grade != '') {
                $scope.satisfied = $scope.statusData.grade;
                $scope.submitInfo.text = '重新评价';
            } else {
                $scope.submitInfo.text = '确认提交';
            };
            var showConfirm = function(template, okText, num) {
                var confirmPopup = $ionicPopup.alert({
                    template: template,
                    okText: okText
                });
                confirmPopup.then(function(res) {
                    if (res && num == 1) {
                        $scope.submitInfo.text = '重新评价';
                    };
                });
            };
        }, function(err) {})

        // $scope.progressData = resolvedDataProgress.data;
        // $scope.statusData = resolvedDataStatus.data;




        // $scope.data.picList1 = [];


        // for (var i = 0; i < resolvedData.data.imageList.length; i++) {
        //     var item = {
        //         "src": resolvedData.data.imageList[i].imageUrl
        //     }
        //     $scope.data.picList1.push(item);
        // }
    }
])