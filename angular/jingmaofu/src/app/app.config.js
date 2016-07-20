angular.module('jinmaofu.wx.config', [
    'ionic'
])

//测试
.constant('ApiBaseUrl', 'http://apimt.chinajinmao.cn/')
    //正式
    // .constant('ApiBaseUrl', 'http://apim.chinajinmao.cn')
    //预发布
    // .constant('ApiBaseUrl', 'http://apimy.chinajinmao.cn')
    .constant('AppDefaultRootUrl', '/homePage')
    // .constant('AppDefaultRootUrl', '/mine/myFavorite')
    .constant('HTTP_COMMON_ERROR_MESSAGE', '服务器请求返回错误!')
    //.constant('$ionicLoadingConfig', {template: '<div id="MrLoading"></div>'})

//configs
.config(['$ionicConfigProvider', '$provide', function($ionicConfigProvider, $provide) {
        $ionicConfigProvider.tabs.style('standard');
        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.navBar.alignTitle('center');
        $ionicConfigProvider.navBar.positionPrimaryButtons('left');
        $ionicConfigProvider.backButton.text('');
        $ionicConfigProvider.backButton.icon('backBtn');
        $ionicConfigProvider.scrolling.jsScrolling(true);
        $ionicConfigProvider.views.swipeBackEnabled(false);

        $provide.decorator('ngClickDirective', ['$delegate', '$timeout', function($delegate, $timeout) {
            var original = $delegate[0].compile;
            var delay = 1000;
            $delegate[0].compile = function(element, attrs, transclude) {

                var disabled = false;

                function onClick(evt) {
                    if (disabled) {
                        evt.preventDefault();
                        evt.stopImmediatePropagation();
                    } else {
                        disabled = true;
                        $timeout(function() { disabled = false; }, delay, false);
                    }
                }
                //   scope.$on('$destroy', function () { iElement.off('click', onClick); });
                element.on('click', onClick);

                return original(element, attrs, transclude);
            };
            return $delegate;
        }]);
    }])
    .config(['$urlRouterProvider', 'AppDefaultRootUrl', function($urlRouterProvider, AppDefaultRootUrl) {
        $urlRouterProvider.otherwise(AppDefaultRootUrl);
    }])
    .config(['$locationProvider', function($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        // $locationProvider.html5Mode(true);
    }])