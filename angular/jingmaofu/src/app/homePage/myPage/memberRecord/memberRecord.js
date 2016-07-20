angular.module('jinmaofu.memberRecord', [
    'ionic',
    'jinmaofu.memberRecord.mock',
    'jinmaofu.shippingAddress'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('memberRecord', {
        url: '/mine/memberRecord',
        controller: 'memberRecordController',
        templateUrl: 'homePage/myPage/memberRecord/memberRecord.tpl.html',
        cache: false,
        authorizedRuleType: ['2', '3', '4']
    })
}])

.controller('memberRecordController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams) {

        // var apis = ['/memberRecord'];
        // pageInitService.pageInit(apis).then(function(res){
        //     $scope.infoData = res[0].data;
        // },function(err){})
    }
])