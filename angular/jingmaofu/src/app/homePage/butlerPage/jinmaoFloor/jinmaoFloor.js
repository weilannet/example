angular.module('jinmaofu.jinmaoFloor', [
    'jinmaofu.jinmaoFloor.mock',
    'jinmaofu.floorDetail'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('jinmaoFloor', {
        url: '/jinmaoFloor',
        controller: 'jinmaoFloorController',
        templateUrl: 'homePage/butlerPage/jinmaoFloor/jinmaoFloor.tpl.html',
        authorizedRuleType: ['1', '2', '3', '4']
    })
}])

.controller('jinmaoFloorController', ['pageInitService', '$scope', '$http', '$stateParams', 'transferParams',
    function(pageInitService, $scope, $http, $stateParams, transferParams) {

        var apis = [
            //'/sharingActivity2/info/'+ $stateParams.id,
            '/communityArea/communitys?projectCode=' + transferParams.params.pinyinCode + '&' + 'cityId=' + transferParams.cityId
        ];
        pageInitService.pageInit(apis).then(function(result) {
            $scope.data = result[0].data;
        })
    }
])