angular.module('jinmaofu.blankPage', [
    'ionic',
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('blankPage', {
        url: '/blankPage',
        controller: 'blankPageController',
        templateUrl: 'userServers/blankPage/blankPage.tpl.html',
        aauthorizedRuleType: ['1', '2', '3', '4']
    })
}])

.controller('blankPageController', ['$scope', '$http', '$ionicListDelegate', '$ionicHistory',
    function($scope, $http, $ionicListDelegate, $ionicHistory) {

    }
])