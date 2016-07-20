angular.module('jinmaofu.historyRepair', [
    'ionic', 'jinmaofu.historyRepair.mock'
])

.config(['$stateProvider', function($stateProvider) {

    $stateProvider.state('properthistoryrepair', {
        url: '/propertyrepair/historyRepair',
        controller: 'HistoryRepairController',
        templateUrl: 'propertyrepair/historyRepair/historyRepair.tpl.html',
        cache: false,
        authorizedRuleType: ['3', '4']
            // resolve: {
            //     resolveData: ['wxConfigService', '$http', function(wxConfigService, $http) {
            //         document.getElementsByTagName('title')[0].text = "物业报修";
            //         wxConfigService.wxInit();
            //         return $http.get('/user/loginUserInfo');
            //     }]
            // }
    })
}])

.controller('HistoryRepairController', ['pageInitService', '$scope', '$http', '$ionicViewSwitcher', '$ionicHistory',
    function(pageInitService, $scope, $http, $ionicViewSwitcher, $ionicHistory) {
        // 权限判断
        // if (resolveData.data.userinfo.userType != '3' && resolveData.data.userinfo.userType != '4') {
        //     var userAlerting = $ionicPopup.alert({
        //         title: '抱歉，此功能只对业主开放',
        //         okText: '确定'
        //     });
        //     userAlerting.then(function(res) {
        //         wx.closeWindow();
        //     });
        // };

        var apis = [
            // 'http://ssyhwx.maxrocky.com:55298/propertyRepair/historyRepair',
            // 'http://ssyhwx.maxrocky.com:55298/propertyRepair/finishRepair',
            '/propertyRepair/weChatRepairNumber',
            '/propertyRepair/weChatRepairHistory?type=0&p=0&c=10',
            '/propertyRepair/weChatRepairHistory?type=1&p=0&c=10'
        ];
        pageInitService.pageInit(apis).then(function(result) {
            // $scope.data = result[0].data;
            // $scope.finishData = result[1].data;
            // $scope.numData = result[2].data;

            // $scope.data = result[0].data;
            // $scope.data1 = result[0].data;
            $scope.repairNum = result[0].data;
            $scope.noFinRepair = result[1].data;
            $scope.finRepair = result[2].data;

            //标识的变量
            var hasNextPage = function(data) {
                return data ? data.length > 0 : false;
            }

            $scope.pageInfo = {
                hasNextPage: hasNextPage($scope.noFinRepair),
                pageNum: 0
            };
            $scope.doRefresh = function() {
                $http.get('/propertyRepair/weChatRepairHistory?type=0&p=0&c=10')
                    .success(function(result) {
                        $scope.noFinRepair = result;
                        $scope.pageInfo.pageNum = 0;
                        $scope.pageInfo.hasNextPage = hasNextPage($scope.noFinRepair);
                    })
                    .finally(function() {
                        $scope.$broadcast('scroll.refreshComplete');
                    });
            };

            $scope.loadMore = function() {
                // $http.get(nextPageApiUrl,{p:$scope.pageInfo.pageNum,c:3}).success(function(result) {
                $http.get('/propertyRepair/weChatRepairHistory', {
                    params: {
                        type: '0',
                        p: $scope.pageInfo.pageNum + 1,
                        c: 10
                    }
                }).success(function(result) {
                    //$http.get('http://ssyhwx.maxrocky.com:55298/propertyRepair/repairHistory/0?number=1&size=10').success(function(result) {
                    $scope.pageInfo.pageNum += 1;
                    $scope.pageInfo.hasNextPage = hasNextPage(result);
                    if (result.length) {
                        //add next page data to $scope
                        //TODO: need remove matched data
                        for (var i = 0; i < result.length; i++) {
                            $scope.noFinRepair.push(result[i]);
                        }
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }).finally(function() {
                    $scope.$broadcast('scroll.refreshComplete');
                });
            };

            var hasNextFinishPage = function(data) {
                return data ? data.length > 0 : false;
            }
            $scope.pageFinishInfo = {
                hasNextFinishPage: hasNextFinishPage($scope.finRepair),
                pageNum: 0
            };
            $scope.doFinishRefresh = function() {
                $http.get('/propertyRepair/weChatRepairHistory?type=1&p=0&c=10')
                    .success(function(result) {
                        $scope.finRepair = result;
                        $scope.pageFinishInfo.pageNum = 0;
                        $scope.pageFinishInfo.hasNextFinishPage = hasNextFinishPage($scope.finRepair);
                    })
                    .finally(function() {
                        $scope.$broadcast('scroll.refreshComplete');
                    });
            };
            $scope.loadFinishMore = function() {
                // $http.get(nextPageApiUrl,{p:$scope.pageFinishInfo.pageNum,c:3}).success(function(result) {
                $http.get('/propertyRepair/weChatRepairHistory', {
                    params: {
                        type: '1',
                        p: $scope.pageFinishInfo.pageNum + 1,
                        size: 10
                    }
                }).success(function(result) {
                    $scope.pageFinishInfo.pageNum += 1;
                    $scope.pageFinishInfo.hasNextFinishPage = hasNextFinishPage(result);
                    if (result.length) {
                        for (var i = 0; i < result.length; i++) {
                            $scope.finRepair.push(result[i]);
                        }
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }).finally(function() {
                    $scope.$broadcast('scroll.refreshComplete');
                });
            };
        });
    }
])

.filter('characters', function() {
    return function(input, chars, breakOnWord) {
        if (isNaN(chars)) return input;
        if (chars <= 0) return '';
        if (input && input.length > chars) {
            input = input.substring(0, chars);

            if (!breakOnWord) {
                var lastspace = input.lastIndexOf(' ');
                //get last space
                if (lastspace !== -1) {
                    input = input.substr(0, lastspace);
                }
            } else {
                while (input.charAt(input.length - 1) === ' ') {
                    input = input.substr(0, input.length - 1);
                }
            }
            return input + '…';
        }
        return input;
    };
});