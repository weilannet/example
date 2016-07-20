angular.module('jinmaofu.changeCommunity', [
    'ionic',
    'jinmaofu.changeCommunity.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('changeCommunity', {
        url: '/changeCommunity',
        controller: 'changeCommunityController',
        templateUrl: 'homePage/mainHome/changeCommunity/changeCommunity.tpl.html',
        cache: false,
        authorizedRuleType: ['1', '2', '3', '4'],
        params: { 'cityInfo': null }
    })
}])

.controller('changeCommunityController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams', '$state', '$ionicHistory', 'transferParams', 'CurrentUserService',

    function(pageInitService, $scope, $http, $ionicPopup, $stateParams, $state, $ionicHistory, transferParams, CurrentUserService) {

        $http.post('/user/getcitys', {}).then(function(res) {
            $scope.fullArr = res.data;
            $scope.default = {
                defaultID: $scope.fullArr[0]
            };
        }, function(err) {
            console.log('报错：' + err.data);
        });
        $scope.goHomePage = function(id, name) {
            $scope.pinyinCode = id;
            $scope.projectName = name;
            var obj = {
                'pinyinCode': id,
                'projectName': name
            };
            transferParams.create(obj);
            console.log(transferParams.params)
            selectCity();
            $ionicHistory.goBack();
        };

        var selectCity = function() {
            if (CurrentUserService.userSession().userInfoData && CurrentUserService.userSession().userInfoData != null && CurrentUserService.userSession().userInfoData.token != '') {
                $scope.userIdOrPhoneUUID = CurrentUserService.userSession().userInfoData.token;
                var params = {
                    'pinyinCode': $scope.pinyinCode,
                    'projectName': $scope.projectName,
                    'userIdOrPhoneUUID': $scope.userIdOrPhoneUUID
                }
                $http.post('/home/replaceProject', params).then(function(res) {
                    console.log('保存成功');
                }, function(err) {
                    console.log(err.data);
                });
            } else {
                if (isApp) {
                    MRDeviceId.getDeviceId(function success(message) {
                        $scope.userIdOrPhoneUUID = message;
                        var params = {
                            'pinyinCode': $scope.pinyinCode,
                            'projectName': $scope.projectName,
                            'userIdOrPhoneUUID': $scope.userIdOrPhoneUUID
                        }
                        $http.post('/home/replaceProject', params).then(function(res) {
                            console.log('保存成功');
                        }, function(err) {
                            console.log(err.data);
                        });
                    }, function failed() {});
                }
            }
        }
    }
])