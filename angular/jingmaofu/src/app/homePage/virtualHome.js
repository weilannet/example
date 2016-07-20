angular.module('jinmaofu.virtualHome', [
    'ionic',
    'jinmaofu.homePage',
    'jinmaofu.butlerPage',
    'jinmaofu.myPage',
    'jinmaofu.myHouse',
    'jinmaofu.myFavorite',
    'jinmaofu.consumptionRecord',
    'jinmaofu.valueAddedGoods',
    'jinmaofu.promotionList',
    'jinmaofu.neighbourhoodList'
])

.controller('virtualHomeController', ['$scope', '$http', '$state', '$ionicViewSwitcher', '$ionicHistory', '$ionicScrollDelegate',
    function($scope, $http, $state, $ionicViewSwitcher, $ionicHistory, $ionicScrollDelegate) {

        $scope.getContentTpl = function() {
            // return $scope.currentTab+'/homePageContent.tpl.html';
            return $scope.currentTab + '/content.tpl.html';
        }
        $scope.isActived = function(tabName) {
            return tabName == $scope.currentTab;
        }
        $scope.goTab = function(tabName) {
                if (tabName != $scope.currentTab) {
                    $ionicViewSwitcher.nextDirection('none');
                    $ionicHistory.nextViewOptions({ historyRoot: true });
                    $ionicHistory.clearHistory();
                    $state.go(tabName, {}, {
                        location: 'replace'
                    });
                }
            }
            // $scope.refresh= function(){
            //        $ionicScrollDelegate.resize();
            //    }
    }
])