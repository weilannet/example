angular.module('jinmaofu.deliveryTime', [
    'jinmaofu.deliveryTime.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('deliveryTime', {
        url: '/deliveryTime/:id',
        controller: 'deliveryTime',
        templateUrl: 'appointment/deliveryTime/deliveryTime.tpl.html',
        authorizedRuleType: ['2', '3', '4']
    })
}])

.controller('deliveryTime', ['pageInitService', '$scope', '$http', '$stateParams',
    function(pageInitService, $scope, $http, $stateParams) {

        var apis = [
            '/sharingActivity5/info/' + $stateParams.id
        ];
        pageInitService.pageInit(apis).then(function(result) {
            $scope.data = result[0].data;
        })
    }
])