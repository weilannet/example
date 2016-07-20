angular.module('jinmaofu.valueGoodsDetail02',[
    'ionic',
    'jinmaofu.valueGoodsDetail02.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('valueGoodsDetail02', {
        url: '/valueGoodsDetail02',
        controller: 'valueGoodsDetail02Controller',
        templateUrl: 'homePage/valueAddedGoods/valueGoodsList/valueGoodsDetail02/valueGoodsDetail02.tpl.html',
        cache:false,
        authorizedRuleType: ["1", "2", "3"],
    })
}])

.controller('valueGoodsDetail02Controller',['pageInitService','$scope','$http','$ionicPopup','$stateParams',
    function(pageInitService,$scope, $http,$ionicPopup,$stateParams){
        
        var apis = ['/getValueGoodsDetail02'];
        pageInitService.pageInit(apis).then(function(res){
            $scope.goodDetail = res[0].data;
        },function(err){});
}])