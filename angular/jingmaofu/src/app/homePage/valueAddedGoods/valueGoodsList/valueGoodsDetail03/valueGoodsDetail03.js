angular.module('jinmaofu.valueGoodsDetail03', [
    'ionic',
    'jinmaofu.valueGoodsDetail03.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('valueGoodsDetail03', {
        url: '/valueGoodsDetail03',
        controller: 'valueGoodsDetail03Controller',
        templateUrl: 'homePage/valueAddedGoods/valueGoodsList/valueGoodsDetail03/valueGoodsDetail03.tpl.html',
        cache: false,
        authorizedRuleType: ["1", "2", "3"],
    })
}])

.controller('valueGoodsDetail03Controller', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams) {

        var apis = ['/getValueGoodsDetail03'];
        pageInitService.pageInit(apis).then(function(res) {
            $scope.goodDetail = res[0].data;
        }, function(err) {});
    }
])