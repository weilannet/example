angular.module('jinmaofu.valueGoodsList', [
    'ionic',
    'jinmaofu.valueGoodsList.mock',
    'jinmaofu.valueGoodsDetail',
    'jinmaofu.valueGoodsDetail01',
    'jinmaofu.valueGoodsDetail02',
    'jinmaofu.valueGoodsDetail03',
    'jinmaofu.valueGoodsDetail04',
    'jinmaofu.valueGoodsDetail05'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('valueGoodsList', {
        url: '/valueGoodsList',
        controller: 'valueGoodsListController',
        templateUrl: 'homePage/valueAddedGoods/valueGoodsList/valueGoodsList.tpl.html',
        cache: false,
        authorizedRuleType: ["1", "2", "3"]
    })
}])

.controller('valueGoodsListController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams', '$state',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams, $state) {

        var apis = ['/getValueGoodList'];
        pageInitService.pageInit(apis).then(function(res) {
            $scope.goodsItem = res[0].data;
        }, function(err) {})
        $scope.goGoodsDetail = function(index) {
            if (index == '0') {
                $state.go('valueGoodsDetail', {});
            } else if (index == '1') {
                $state.go('valueGoodsDetail01', {});
            } else if (index == '2') {
                $state.go('valueGoodsDetail02', {});
            } else if (index == '3') {
                $state.go('valueGoodsDetail03', {});
            } else if (index == '4') {
                $state.go('valueGoodsDetail04', {});
            } else if (index == '5') {
                $state.go('valueGoodsDetail05', {});
            }

        };
    }
])