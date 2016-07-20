angular.module('jinmaofu.neighbourhoodDetail03', [
    'ionic',
    'jinmaofu.neighbourhoodDetail03.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('neighbourhoodDetail03', {
        url: '/neighbourhoodDetail03',
        controller: 'neighbourhoodDetail03Controller',
        templateUrl: 'homePage/valueAddedGoods/neighbourhoodList/neighbourhoodDetail03/neighbourhoodDetail03.tpl.html',
        cache: false,
        authorizedRuleType: ["1", "2", "3"],
    })
}])

.controller('neighbourhoodDetail03Controller', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams) {

        var apis = ['/getNeighbourhoodDetail03'];
        pageInitService.pageInit(apis).then(function(res) {
            $scope.goodDetail = res[0].data;
        }, function(err) {});
    }
])