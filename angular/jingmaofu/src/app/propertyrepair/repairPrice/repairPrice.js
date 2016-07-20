angular.module('jinmaofu.repairPrice',[
    'jinmaofu.repairPrice.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('repairPrice', {
        url: '/repairPrice/:id',
            controller: 'repairPriceController',
            templateUrl: 'repairPrice/repairPrice.tpl.html',
            authorizedRuleType: ['2', '3', '4']    })
}])

.controller('repairPriceController',['pageInitService','$scope','$http','$stateParams',
    function(pageInitService,$scope, $http,$stateParams){

        var apis = [
             '/propertyRepair/weChatRepairPrice/'+ $stateParams.id,
        ];
        pageInitService.pageInit(apis).then(function(result) {
            $scope.data = result[0].data;
       })
}])