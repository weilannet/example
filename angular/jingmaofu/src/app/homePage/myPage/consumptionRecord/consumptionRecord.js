angular.module('jinmaofu.consumptionRecord', [
    'ionic',
    'jinmaofu.consumptionRecord.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('mine/consumptionRecord', {
        url: '/mine/consumptionRecord',
        controller: 'consumptionRecordController',
        templateUrl: 'homePage/myPage/consumptionRecord/consumptionRecord.tpl.html',
        cache: false,
        authorizedRuleType: ['2', '3', '4']
    })
}])

.controller('consumptionRecordController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams) {

        var apis = ['/getconsumptionRecord']
        pageInitService.pageInit(apis).then(function(res) {
            $scope.csptData = res[0].data;
        }, function(err) {})
    }
])