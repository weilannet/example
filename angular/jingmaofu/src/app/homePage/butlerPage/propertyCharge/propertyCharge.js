angular.module('jinmaofu.propertyCharge', [
    'ionic',
    'jinmaofu.propertyCharge.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('propertyCharge', {
        url: '/propertyCharge',
        controller: 'propertyChargeController',
        templateUrl: 'homePage/butlerPage/propertyCharge/propertyCharge.tpl.html',
        cache: false,
        authorizedRuleType: ['3', '4']
    })
}])

.controller('propertyChargeController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams) {

        var apis = ['/getPorpertyCharge'];
        pageInitService.pageInit(apis).then(function(res) {
            $scope.chargeData = res[0].data;
        }, function(err) {})
    }
])