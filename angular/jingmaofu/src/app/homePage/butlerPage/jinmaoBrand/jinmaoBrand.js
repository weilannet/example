angular.module('jinmaofu.jinmaoBrand', [
    'jinmaofu.jinmaoBrand.mock',
    'jinmaofu.newsDetail'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('jinmaoBrand', {
        url: '/jinmaoBrand',
        controller: 'jinmaoBrandController',
        templateUrl: 'homePage/butlerPage/jinmaoBrand/jinmaoBrand.tpl.html',
        authorizedRuleType: ['1', '2', '3', '4']
    })
}])

.controller('jinmaoBrandController', ['pageInitService', '$scope', '$http', '$stateParams', 'transferParams',
    function(pageInitService, $scope, $http, $stateParams, transferParams) {

        console.log(transferParams);
        var apis = [
            '/communityArea/news?pinyinCode=' + transferParams.params.pinyinCode + '&' + 'cityId=' + transferParams.cityId
            // 'http://as.chinajinmao.cn/api/communityArea/news'
        ];
        pageInitService.pageInit(apis).then(function(result) {
            $scope.data = result[0].data;
        })
    }
])