angular.module('jinmaofu.valueGoodsDetail05', [
    'ionic',
    'jinmaofu.valueGoodsDetail05.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('valueGoodsDetail05', {
        url: '/valueGoodsDetail05',
        controller: 'valueGoodsDetail05Controller',
        templateUrl: 'homePage/valueAddedGoods/valueGoodsList/valueGoodsDetail05/valueGoodsDetail05.tpl.html',
        cache: false,
        authorizedRuleType: ["1", "2", "3"],
    })
}])

.controller('valueGoodsDetail05Controller', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams) {

        var apis = ['/getValueGoodsDetail05'];
        pageInitService.pageInit(apis).then(function(res) {
            $scope.goodDetail = res[0].data;
        }, function(err) {});
    }
])