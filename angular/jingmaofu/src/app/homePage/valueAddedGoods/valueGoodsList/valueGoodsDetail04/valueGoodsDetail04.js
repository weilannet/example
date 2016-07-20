angular.module('jinmaofu.valueGoodsDetail04', [
    'ionic',
    'jinmaofu.valueGoodsDetail04.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('valueGoodsDetail04', {
        url: '/valueGoodsDetail04',
        controller: 'valueGoodsDetail04Controller',
        templateUrl: 'homePage/valueAddedGoods/valueGoodsList/valueGoodsDetail04/valueGoodsDetail04.tpl.html',
        cache: false,
        authorizedRuleType: ["1", "2", "3"],
    })
}])

.controller('valueGoodsDetail04Controller', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams) {

        var apis = ['/getValueGoodsDetail04'];
        pageInitService.pageInit(apis).then(function(res) {
            $scope.goodDetail = res[0].data;
        }, function(err) {});
    }
])