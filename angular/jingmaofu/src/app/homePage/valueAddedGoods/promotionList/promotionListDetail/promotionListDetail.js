angular.module('jinmaofu.promotionListDetail',[
    'ionic',
    'jinmaofu.promotionListDetail.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('promotionListDetail', {
        url: '/promotionListDetail',
        controller: 'promotionListDetailController',
        templateUrl: 'homePage/valueAddedGoods/valueGoodsList/promotionListDetail/promotionListDetail.tpl.html',
        cache:false,
        authorizedRuleType: ["1", "2", "3"],
    })
}])

.controller('promotionListDetailController',['pageInitService','$scope','$http','$ionicPopup','$stateParams',
    function(pageInitService,$scope, $http,$ionicPopup,$stateParams){
        
        var apis = ['/getValueGoodsDetail'];
        pageInitService.pageInit(apis).then(function(res){
            $scope.goodDetail = res[0].data;
        },function(err){});
}])