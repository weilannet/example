angular.module('jinmaofu.neighbourhoodList', [
    'ionic',
    'jinmaofu.neighbourhoodList.mock',
    'jinmaofu.neighbourhoodDetail',
    'jinmaofu.neighbourhoodDetail01',
    'jinmaofu.neighbourhoodDetail02',
    'jinmaofu.neighbourhoodDetail03'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('neighbourhoodList', {
        url: '/neighbourhoodList',
        controller: 'neighbourhoodListController',
        templateUrl: 'homePage/valueAddedGoods/neighbourhoodList/neighbourhoodList.tpl.html',
        cache: false,
        authorizedRuleType: ["1", "2", "3"]
    })
}])

.controller('neighbourhoodListController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams', '$state',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams, $state) {

        var apis = ['/getValueGoodList01'];
        pageInitService.pageInit(apis).then(function(res) {
            $scope.goodsItem = res[0].data;
        }, function(err) {})
        $scope.goGoodsDetail = function(index) {
            if (index == '0') {
                $state.go('neighbourhoodDetail', {});
            } else if (index == '1') {
                $state.go('neighbourhoodDetail01', {});
            } else if (index == '2') {
                $state.go('neighbourhoodDetail02', {});
            } else if (index == '3') {
                $state.go('neighbourhoodDetail03', {});
            }
        };
    }
])