angular.module('jinmaofu.floorDetail', [
    'ionic',
    'jinmaofu.floorDetail.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('floorDetail', {
        url: '/floorDetail',
        controller: 'floorDetailController',
        templateUrl: 'homePage/butlerPage/floorDetail/floorDetail.tpl.html',
        cache: false,
        authorizedRuleType: ['1', '2', '3', '4']
    })
}])

.controller('floorDetailController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams', '$ionicSlideBoxDelegate', '$ionicModal',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams, $ionicSlideBoxDelegate, $ionicModal) {

        var apis = ['/getFloorDetail'];
        pageInitService.pageInit(apis).then(function(res) {
            $scope.detailData = res[0].data;
            $ionicSlideBoxDelegate.update();
            $ionicSlideBoxDelegate.loop(true);
            $scope.showMore = false;

            $scope.openModal = function(index) {
                $ionicModal.fromTemplateUrl('homePage/butlerPage/floorDetail/modal/modal.tpl.html', {
                    scope: $scope,
                    backdropClickToClose: false,
                    hardwareBackButtonClose: false,
                    animation: 'slide-in-right'
                }).then(function(modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                })
            };
            $scope.closeModal = function() {
                $scope.modal.remove();
            };


        }, function(err) {});
    }
])