angular.module('jinmaofu.neighbourhoodDetail',[
    'ionic',
    'jinmaofu.neighbourhoodDetail.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('neighbourhoodDetail', {
        url: '/neighbourhoodDetail',
        controller: 'neighbourhoodDetailController',
        templateUrl: 'homePage/valueAddedGoods/neighbourhoodList/neighbourhoodDetail/neighbourhoodDetail.tpl.html',
        cache:false,
        authorizedRuleType: ["1", "2", "3"],
    })
}])

.controller('neighbourhoodDetailController',['pageInitService','$scope','$http','$ionicPopup','$stateParams',
    function(pageInitService,$scope, $http,$ionicPopup,$stateParams){
        
        var apis = ['/getNeighbourhoodDetail'];
        pageInitService.pageInit(apis).then(function(res){
            $scope.goodDetail = res[0].data;
        },function(err){});
}])