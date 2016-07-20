angular.module('jinmaofu.valueGoodsDetail',[
    'ionic',
    'jinmaofu.valueGoodsDetail.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('valueGoodsDetail', {
        url: '/valueGoodsDetail',
        controller: 'valueGoodsDetailController',
        templateUrl: 'homePage/valueAddedGoods/valueGoodsList/valueGoodsDetail/valueGoodsDetail.tpl.html',
        cache:false,
        authorizedRuleType: ["1", "2", "3"],
    })
}])

.controller('valueGoodsDetailController',['pageInitService','$scope','$http','$ionicPopup','$stateParams',
    function(pageInitService,$scope, $http,$ionicPopup,$stateParams){
        
        var apis = ['/getValueGoodsDetail'];
        pageInitService.pageInit(apis).then(function(res){
            $scope.goodDetail = res[0].data;
        },function(err){});
}])