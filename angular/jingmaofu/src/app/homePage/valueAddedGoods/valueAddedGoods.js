angular.module('jinmaofu.valueAddedGoods', [
        'ionic',
        'jinmaofu.valueAddedGoods.mock',
        'jinmaofu.valueGoodsList',
        'jinmaofu.neighbourhoodDetail'
    ])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('valueAddedGoods', {
            url: '/valueAddedGoods',
            controller: 'valueAddedGoodsController',
            templateUrl: 'homePage/valueAddedGoods/valueAddedGoods.tpl.html',
            authorizedRuleType: ["1", "2", "3"]
        })
    }])
    .controller('valueAddedGoodsController', ['pageInitService', '$scope', '$http', '$stateParams', '$state', '$ionicTabsDelegate',
        function(pageInitService, $scope, $http, $stateParams, $state, $ionicTabsDelegate) {
            $scope.$on('$ionicView.enter', function() {
                $scope.currentTab = 'homePage/valueAddedGoods';
                $ionicTabsDelegate.select(2);
            });
            $scope.toDetail = function(index) {
                if (index == '0') {
                    $state.go('valueGoodsDetail', {});
                } else if (index == '1') {
                    $state.go('valueGoodsDetail01', {});
                } else if (index == '2') {
                    $state.go('valueGoodsDetail02', {});
                } else if (index == '3') {
                    $state.go('valueGoodsDetail03', {});
                } else if (index == '4') {
                    $state.go('valueGoodsDetail04', {});
                } else if (index == '5') {
                    $state.go('valueGoodsDetail05', {});
                } else if (index == '6') {
                    $state.go('neighbourhoodDetail', {});
                } else if (index == '7') {
                    $state.go('neighbourhoodDetail01', {});
                } else if (index == '8') {
                    $state.go('neighbourhoodDetail02', {});
                } else if (index == '9') {
                    $state.go('neighbourhoodDetail03', {});
                }

            };
        }
    ])