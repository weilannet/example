angular.module('jinmaofu.promotionList', [
    'ionic',
    'jinmaofu.promotionList.mock',
    'jinmaofu.promotionListDetail'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('promotionList', {
        url: '/promotionList',
        controller: 'promotionListController',
        templateUrl: 'homePage/valueAddedGoods/promotionList/promotionList.tpl.html',
        cache: false,
        authorizedRuleType: ["1", "2", "3"]
    })
}])

.controller('promotionListController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams', '$state',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams, $state) {

        var apis = ['/getValueGoodList'];
        pageInitService.pageInit(apis).then(function(res) {
            $scope.goodsItem = res[0].data;

            $scope.goGoodsDetail = function() {
                $state.go('promotionDetail', {});
            };
        }, function(err) {})
    }
])