angular.module('jinmaofu.aboutApp', [
    'ionic',
    'jinmaofu.aboutApp.mock',
    'jinmaofu.functionInfo',
    'jinmaofu.appFeedback'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('aboutApp', {
        url: '/mine/aboutApp',
        controller: 'aboutAppController',
        templateUrl: 'homePage/myPage/aboutApp/aboutApp.tpl.html',
        cache: false,
        authorizedRuleType: ['2', '3', '4']
    })
}])

.controller('aboutAppController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams) {

    }
])