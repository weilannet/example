angular.module('jinmaofu.shippingAddress', [
    'ionic',
    'jinmaofu.shippingAddress.mock',
    'jinmaofu.newAddressPage'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('mine/shippingAddress', {
        url: '/mine/shippingAddress',
        controller: 'shippingAddressController',
        templateUrl: 'homePage/myPage/memberRecord/shippingAddress/shippingAddress.tpl.html',
        cache: false,
        authorizedRuleType: ['3', '4']
    })
}])

.controller('shippingAddressController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams) {

        var apis = ['/getShippingAddress']

        pageInitService.pageInit(apis).then(function(res) {
            $scope.addressData = res[0].data;
        }, function(err) {})
    }
])