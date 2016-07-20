angular.module('jinmaofu.myPackage', [
    'ionic',
    'jinmaofu.myPackage.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('myPackage', {
        url: '/myPackage',
        controller: 'myPackageController',
        templateUrl: 'homePage/butlerPage/myPackage/myPackage.tpl.html',
        cache: false,
        authorizedRuleType: ['3', '4']
    })
}])

.controller('myPackageController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams) {

    }
])