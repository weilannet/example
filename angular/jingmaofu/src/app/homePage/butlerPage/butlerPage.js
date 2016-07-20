angular.module('jinmaofu.butlerPage', [
        'ionic',
        'jinmaofu.butlerPage.mock',
        'jinmaofu.communityNews',
        'jinmaofu.myPackage',
        'jinmaofu.propertyCharge',
        'jinmaofu.jinmaoBrand',
        'jinmaofu.jinmaoFloor',
        'jinmaofu.activityApply',
        'jinmaofu.feedback',
        'jinmao.communityNews.share'
    ])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('butlerPage', {
            url: '/butlerPage',
            controller: 'butlerPageController',
            templateUrl: 'homePage/butlerPage/butlerPage.tpl.html',
            authorizedRuleType: ['1', '2', '3', '4']
        })
    }])
    .controller('butlerPageController', ['pageInitService', '$scope', '$http', '$stateParams', '$state', '$ionicTabsDelegate',
        function(pageInitService, $scope, $http, $stateParams, $state, $ionicTabsDelegate) {
            $scope.$on('$ionicView.enter', function() {
                $scope.currentTab = 'homePage/butlerPage';
                $ionicTabsDelegate.select(1);
            });
        }
    ])