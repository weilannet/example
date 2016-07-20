angular.module('jinmaofu.myPage', [
        'ionic',
        'jinmaofu.myPage.mock',
        'jinmaofu.aboutApp',
        'jinmaofu.personalInfo',
        'jinmaofu.memberRecord',
        'jinmaofu.userConfig'
    ])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('myPage', {
            url: '/myPage',
            controller: 'myPageController',
            templateUrl: 'homePage/myPage/myPage.tpl.html',
            authorizedRuleType: ['1', '2', '3', '4']
        })
    }])
    .controller('myPageController', ['pageInitService', '$scope', '$http', '$stateParams', '$state', '$ionicTabsDelegate', 'CurrentUserService', '$ionicModal', '$ionicPopup', '$ionicHistory', 'transferParams',
        function(pageInitService, $scope, $http, $stateParams, $state, $ionicTabsDelegate, CurrentUserService, $ionicModal, $ionicPopup, $ionicHistory, transferParams) {
            $scope.$on('$ionicView.enter', function() {
                $scope.currentTab = 'homePage/myPage';
                $ionicTabsDelegate.select(3);
                getSession();
                getUserDefaultLogo();
            });

            var getUserDefaultLogo = function() {
                $http.get('/user/getDefaultHeadImg').then(function(res) {
                    $scope.UserDefaultLogo = res;
                }, function(err) {});
            }
            var getSession = function() {
                if (!CurrentUserService.userSession().userInfoData) {
                    $http.post('/user/getuserinfobyid', {}).then(function(res) {
                        // 有cookie
                        CurrentUserService.updateSession(res.data).userInfoData;
                        $scope.outUserData = res.data;
                        $scope.isLogin = true;
                    }, function(err) {
                        // 无cookie
                        $scope.isLogin = false;
                    });
                } else {
                    $scope.outUserData = CurrentUserService.userSession().userInfoData;
                    if ($scope.outUserData.userType == '1') {
                        $scope.isLogin = false;
                    } else {
                        $scope.isLogin = true;
                    }
                };
            }

            // 判断去登录页面还是去我的信息页面
            $scope.doCheck = function() {
                if ($scope.isLogin) {
                    $state.go('userConfig', {});
                } else {
                    showModal();
                };
            };
            var showModal = function() {
                $ionicModal.fromTemplateUrl('userServers/login/login.tpl.html', {
                        backdropClickToClose: false,
                        animation: 'slide-in-right'
                    })
                    .then(function(modal) {
                        modal.show();
                    });
            };
            $scope.logoff = function() {
                showMessage('您确定要退出登录？', '确定', '取消');
            };
            // 消息提示
            var showMessage = function(content, leftText, rightText) {
                var messagePopup = $ionicPopup.confirm({
                    template: content,
                    okText: leftText,
                    cancelText: rightText
                });
                messagePopup.then(function(res) {
                    if (res) {
                        $http.post('/user/appexit').then(function(res) {
                            CurrentUserService.destroyUserSession();
                            transferParams.destroy();
                            $scope.isLogin = false;
                            $scope.outUserData = res.data;
                            $ionicHistory.clearCache();
                            $ionicHistory.clearHistory();
                        }, function(err) {
                            console.log(err.data);
                        });
                    }
                })
            };
        }
    ])