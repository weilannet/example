angular.module('jinmaofu.newAddressPage', [
    'ionic',
    'jinmaofu.newAddressPage.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('newAddressPage', {
        url: '/newAddressPage',
        controller: 'newAddressPageController',
        templateUrl: 'homePage/myPage/memberRecord/shippingAddress/newAddressPage/newAddressPage.tpl.html',
        cache: false,
        authorizedRuleType: ['2', '3', '4']
    })
}])

.controller('newAddressPageController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams) {

    }
])