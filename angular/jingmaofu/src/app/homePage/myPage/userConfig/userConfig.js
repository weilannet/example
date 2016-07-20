angular.module('jinmaofu.userConfig', [
    'ionic',
    'jinmaofu.userConfig.mock',
    'jinmaofu.editingUserInfo'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('userConfig', {
        url: '/userConfig',
        controller: 'userConfigController',
        templateUrl: 'homePage/myPage/userConfig/userConfig.tpl.html',
        cache: false,
        authorizedRuleType: ['2', '3', '4']
    })
}])

.controller('userConfigController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams', '$state', 'CurrentUserService',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams, $state, CurrentUserService) {
        $scope.userData = CurrentUserService.userSession().userInfoData;
    }
])