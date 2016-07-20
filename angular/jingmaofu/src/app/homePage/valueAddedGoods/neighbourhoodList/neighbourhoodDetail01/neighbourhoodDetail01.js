angular.module('jinmaofu.neighbourhoodDetail01',[
    'ionic',
    'jinmaofu.neighbourhoodDetail01.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('neighbourhoodDetail01', {
        url: '/neighbourhoodDetail01',
        controller: 'neighbourhoodDetail01Controller',
        templateUrl: 'homePage/valueAddedGoods/neighbourhoodList/neighbourhoodDetail01/neighbourhoodDetail01.tpl.html',
        cache:false,
        authorizedRuleType: ["1", "2", "3"],
    })
}])

.controller('neighbourhoodDetail01Controller',['pageInitService','$scope','$http','$ionicPopup','$stateParams',
    function(pageInitService,$scope, $http,$ionicPopup,$stateParams){
        
        var apis = ['/getNeighbourhoodDetail01'];
        pageInitService.pageInit(apis).then(function(res){
            $scope.goodDetail = res[0].data;
        },function(err){});
}])