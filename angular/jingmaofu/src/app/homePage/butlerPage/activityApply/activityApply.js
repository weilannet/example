angular.module('jinmaofu.activityApply', [
    'ionic',
    'jinmaofu.activityApply.mock',
    'jinmaofu.activityDetail'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('activityApply', {
        url: '/activityApply',
        controller: 'activityApplyController',
        templateUrl: 'homePage/butlerPage/activityApply/activityApply.tpl.html',
        cache: false,
        authorizedRuleType: ['1', '2', '3', '4']
    })
}])

.controller('activityApplyController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams', '$ionicTabsDelegate', 'transferParams',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams, $ionicTabsDelegate, transferParams) {

        var apis = [
            '/community/activities?' + 'pageIndex=0&pageSize=10&projectCode=' + transferParams.params.pinyinCode + '&cityId=' + transferParams.cityId,
            '/community/myActivities?pageIndex=0&pageSize=10'
        ];
        pageInitService.pageInit(apis).then(function(result) {
            $scope.data2 = result[1].data;
            $scope.data = result[0].data;
            console.log($scope.data);
            var myDate = new Date();
            $scope.timeDone = [];
            if ($scope.data[0] && $scope.data[0] != '') {
                $scope.timeNow = parseInt(($scope.data[0].date.substr(0, 4)) + ($scope.data[0].date.substr(5, 2)) + ($scope.data[0].date.substr(8, 2)));
            }
            for (var i = 0; i < $scope.data.length; i++) {
                $scope.timeDone[i] = parseInt(($scope.data[i].publishDate.substr(0, 4)) + ($scope.data[i].publishDate.substr(5, 2)) + ($scope.data[i].publishDate.substr(8, 2)));
            };
        });
        $scope.showConfirm = function(k) {
            var item = $scope.data2[k];
            var cancelNumber = $scope.data[0].cancelNumber || $scope.data[1].cancelNumber || 0;
            var cansetNum = 3 - cancelNumber;
            var textcontent = '您还剩余' + cansetNum + '次取消活动的机会，超过三次取消活动半年内将不能报名参加业主活动，请您慎重取消。';
            if (cansetNum == 0) {
                textcontent = '您已经达到取消次数上限，半年内将不能报名参加业主活动。';
            };

            var confirmPopup = $ionicPopup.confirm({
                title: '温馨提示',
                template: textcontent,
                cancelText: '返回',
                cancelType: 'button-energized',
                okText: '确定',
                okType: 'button-light'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    $http.post('/community/cancel', { id: item.id }).then(
                        function(result) {
                            var apis = [
                                '/community/activities?pageIndex=0&pageSize=10',
                                '/community/myActivities?pageIndex=0&pageSize=10'
                            ];
                            pageInitService.pageInit(apis).then(function(result) {
                                $scope.data2 = [];
                                $scope.data1 = result[0].data;
                                console.log('测试');
                                $scope.data = [];
                                for (item in $scope.data1) {
                                    if ($scope.data1[item].state == "1") {
                                        $scope.data2.push($scope.data1[item]);
                                        console.log('进来');
                                    } else {
                                        console.log('去除');
                                        $scope.data.push($scope.data1[item]);
                                    }
                                };

                                var myDate = new Date();
                                $scope.timeDone = [];
                                $scope.timeNow = parseInt(($scope.data[0].date.substr(0, 4)) + ($scope.data[0].date.substr(5, 2)) + ($scope.data[0].date.substr(8, 2)));
                                for (var i = 0; i < $scope.data.length; i++) {
                                    $scope.timeDone[i] = parseInt(($scope.data[i].publishDate.substr(0, 4)) + ($scope.data[i].publishDate.substr(5, 2)) + ($scope.data[i].publishDate.substr(8, 2)));
                                };
                            });

                        },
                        function(result) {
                            showAlert(result.data);
                        });
                } else {}
            });
            $scope.$on('$ionicView.beforeLeave', function() {
                confirmPopup.close();
            })
        };
        $scope.apply = function(l) {
            var item3 = $scope.data[l]
            $http.post('/community/apply', { id: item3.id }).then(
                function(result) {
                    showAlert('报名成功');
                    item3.people--;
                    $scope.data[l].state = 1;
                    $scope.data2.push($scope.data[l]);
                    $ionicTabsDelegate.select(1);
                },
                function(result) {
                    showAlert(result.data);
                })
        }
        var showAlert = function(template) {
            var alertPopup = $ionicPopup.alert({
                template: template,
                okText: '确定',
                okType: 'button-energized'
            });
            alertPopup.then(function(res) {
                //wx.closeWindow();
            });
            $scope.$on('$ionicView.beforeLeave', function() {
                alertPopup.close();
            })
        };
    }
])