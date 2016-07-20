angular.module('jinmaofu.valueGoodsDetail01', [
    'ionic',
    'jinmaofu.valueGoodsDetail01.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('valueGoodsDetail01', {
        url: '/valueGoodsDetail01',
        controller: 'valueGoodsDetail01Controller',
        templateUrl: 'homePage/valueAddedGoods/valueGoodsList/valueGoodsDetail01/valueGoodsDetail01.tpl.html',
        cache: false,
        authorizedRuleType: ["1", "2", "3"],
    })
}])

.controller('valueGoodsDetail01Controller', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams) {

        var apis = ['/getValueGoodsDetail01'];
        pageInitService.pageInit(apis).then(function(res) {
            $scope.goodDetail = res[0].data;
        }, function(err) {});
    }
])