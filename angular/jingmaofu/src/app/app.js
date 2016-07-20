angular.module('jinmaofu.quality', [
    'ionic',
    'maxrocky.framework',
    'jinmaofu.templates',
    'jinmaofu.common',
    'jinmaofu.userServers',
    'jinmaofu.virtualHome',
    'jinmaofu.appointment',
    'jinmaofu.floorDetail',
    'jinmaofu.jinmaoBrand',
    'jinmaofu.property',
    'jinmaofu.convenientInformation'
])

.run(['$rootScope', '$ionicLoading', '$httpBackend', '$ionicLoading', 'wxConfigService', 'CurrentUserService', '$ionicPlatform', '$ionicPopup', '$location', '$ionicHistory',

    function($rootScope, $ionicLoading, $httpBackend, $ionicLoading, wxConfigService, CurrentUserService, $ionicPlatform, $ionicPopup, $location, $ionicHistory) {
        $rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromState, fromParams) {
                // 控制默认跳转
                CurrentUserService.usrAuth(evt, toState, toParams, fromState, fromParams);

                $ionicLoading.hide(); //ffxiugai  解决物理返回按钮导致loading动画不停的bug
            })
            // wxConfigService.wxInit();

        //主页面显示退出提示框  
        $ionicPlatform.registerBackButtonAction(function(e) {

            e.preventDefault();

            function showConfirm() {
                var confirmPopup = $ionicPopup.confirm({
                    title: '<strong>退出应用?</strong>',
                    template: '你确定要退出应用吗?',
                    okText: '退出',
                    cancelText: '取消'
                });

                confirmPopup.then(function(res) {
                    if (res) {
                        ionic.Platform.exitApp();
                    } else {
                        // Don't close  
                    }
                });
            }

            // Is there a page to go back to?  
            if ($location.path() == '/homePage' || $location.path() == '/butlerPage' || $location.path() == '/valueAddedGoods' || $location.path() == '/myPage') {
                showConfirm();
            } else {
                $ionicHistory.goBack();
            }

            return false;
        }, 400);
    }
])

.controller('AppController', ['$window', '$state', '$scope', '$ionicPopup', '$ionicHistory', '$http',
    function($window, $state, $scope, $ionicPopup, $ionicHistory, $http) {

    }
])