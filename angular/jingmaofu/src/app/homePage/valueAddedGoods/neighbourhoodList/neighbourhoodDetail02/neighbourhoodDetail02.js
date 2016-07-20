angular.module('jinmaofu.neighbourhoodDetail02',[
    'ionic',
    'jinmaofu.neighbourhoodDetail02.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('neighbourhoodDetail02', {
        url: '/neighbourhoodDetail02',
        controller: 'neighbourhoodDetail02Controller',
        templateUrl: 'homePage/valueAddedGoods/neighbourhoodList/neighbourhoodDetail02/neighbourhoodDetail02.tpl.html',
        cache:false,
        authorizedRuleType: ["1", "2", "3"],
    })
}])

.controller('neighbourhoodDetail02Controller',['pageInitService','$scope','$http','$ionicPopup','$stateParams',
    function(pageInitService,$scope, $http,$ionicPopup,$stateParams){
        
        var apis = ['/getNeighbourhoodDetail02'];
        pageInitService.pageInit(apis).then(function(res){
            $scope.goodDetail = res[0].data;
        },function(err){});
}])