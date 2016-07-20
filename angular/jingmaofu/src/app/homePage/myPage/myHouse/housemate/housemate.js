angular.module('jinmaofu.myHouse.housemate', [
    'jinmaofu.myHouse.housemate.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('housemate', {
        url: '/housemate/:id',
        controller: 'housemateController',
        templateUrl: 'homePage/myPage/myHouse/housemate/housemate.tpl.html',
        authorizedRuleType: ['3', '4']
    })
}])

.controller('housemateController', ['pageInitService', '$scope', '$http', '$stateParams',
    function(pageInitService, $scope, $http, $stateParams) {

        var apis = [
            '/jinmaoHappiness/myHouse/housemate/' + $stateParams.id
        ];
        pageInitService.pageInit(apis).then(function(result) {
            $scope.data = result[0].data;
            $scope.deleteHousemate = function(k) {
                var item = $scope.data.mateList[k];
                item.show = 0;
            }
        })
    }
])