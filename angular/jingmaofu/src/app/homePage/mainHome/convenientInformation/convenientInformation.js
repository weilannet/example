angular.module('jinmaofu.convenientInformation', [
    'jinmaofu.convenientInformation.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('convenientInformation', {
        url: '/convenientInformation',
        controller: 'convenientInformationController',
        templateUrl: 'homePage/mainHome/convenientInformation/convenientInformation.tpl.html',
        authorizedRuleType: ['1', '2', '3', '4'],
    })
}])

.controller('convenientInformationController', ['$ionicTabsDelegate', 'pageInitService', '$scope', '$http', '$stateParams', 'transferParams',
    function($ionicTabsDelegate, pageInitService, $scope, $http, $stateParams, transferParams) {
        $scope.projectActive = transferParams.params.projectName;
        var apis = [
            '/propertyHelpline/serviceInfo/' + transferParams.params.pinyinCode,
            '/propertyHelpline/servicePhoneA/' + transferParams.params.pinyinCode
        ];

        $scope.changeProject = function(project) {
            $scope.projectActive = project.projectName;
            $http.get('/propertyHelpline/servicePhoneA/' + project.projectId).then(function(data) {
                $scope.data = data.data[0];
            });
            // $scope.data.url=urlList[project.projectId-1];
            $http.get('/propertyHelpline/serviceInfo/' + project.projectId).then(function(data) {
                $scope.data1 = data.data;
                $ionicTabsDelegate.select(0);
            })
        }
        pageInitService.pageInit(apis).then(function(result) {
            $scope.data = result[1].data[0];
            $scope.data1 = result[0].data;
        })
    }
])