angular.module('jinmaofu.floorDetail', [
    'jinmaofu.floorDetail.mock', 'ksSwiper'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('floorDetail', {
        url: '/floorDetail/:id',
        controller: 'floorDetailController',
        cache: false,
        templateUrl: 'homePage/butlerPage/jinmaoFloor/floorDetails/floorDetail.tpl.html',
        resolve: {
            resolveData: ['$http', '$stateParams', function($http, $stateParams) {
                return $http.get('/communityArea/communityDetail/' + $stateParams.id);
            }]
        },
        authorizedRuleType: ['1', '2', '3', '4']
    })
}])

.controller('floorDetailController', ['resolveData', 'pageInitService', '$scope', '$http', '$stateParams', '$ionicModal',
    function(resolveData, pageInitService, $scope, $http, $stateParams, $ionicModal) {
        $scope.$on('$ionicView.beforeLeave', function() {
            if ($scope.modal) {
                $scope.modal.remove();
            };
        });

        $scope.data = resolveData.data;

        $scope.swiper = {};
        $scope.next = function() {
            $scope.swiper.slideNext();
        };
        $scope.onReadySwiper = function(swiper) {
            console.log('onReadySwiper');
            swiper.on('slideChangeStart', function() {
                console.log('slideChangeStart');
            });
        };
        //获取jinmaoFloor的电话号码
        $scope.telNum = function() {
            $http.get('/sharingActivity2/info/a').then(function(data) {
                $scope.phone = data.data[0].phone;
            })
        }
        $scope.pic = {};
        // 点击显示图片
        $scope.showPic = function(picdata) {
                $scope.pic.picSrc = picdata;
                $ionicModal.fromTemplateUrl('homePage/butlerPage/jinmaoFloor/floorDetails/floorDetailModal.tpl.html', {
                    scope: $scope,
                    backdropClickToClose: false,
                    hardwareBackButtonClose: false,
                    animation: 'slide-in-right'
                }).then(function(modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
            }
            // $scope.$on('$ionicView.beforeLeave', function() {
            //     $scope.modal.remove();
            // });
        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        var sharlLink = "http://ssmt.chinajinmao.cn" + "/floorDetail/" + $stateParams.id;
        $scope.share = function() {
            $ionicModal.fromTemplateUrl('share/share.tpl.html', {
                scope: $scope,
                animation: 'xx'
            }).then(function(modal) {
                modal.show();
                $scope.modalShare = modal;
            });
        }

        $scope.closeShare = function() {
            $scope.modalShare.remove();
        };

        //qq分享
        var share = {
            title: '金茂新闻',
            appName: "金茂荟",
        };
        $scope.qqShare = function() {
                if (sharlLink && sharlLink != "") {
                    $scope.modalShare.remove();
                    var args = {};
                    args.url = sharlLink;
                    args.title = share.title;
                    args.description = "";
                    args.imageUrl = sharlLink;
                    args.appName = share.appName;
                    YCQQ.shareToQQ(function() {}, function(failReason) {}, args);
                } else {
                    showConfirm('网络连接超时，请稍后再试', '确定', 2);
                }
            }
            //微信分享好友
        $scope.weChatShareSESSION = function() {
            if (sharlLink && sharlLink != "") {
                $scope.modalShare.remove();
                Wechat.share({
                    message: {
                        title: share.title,
                        description: "",
                        thumb: sharlLink,
                        media: {
                            type: Wechat.Type.WEBPAGE,
                            webpageUrl: sharlLink
                        }
                    },
                    scene: Wechat.Scene.SESSION // share to SESSION
                }, function() {}, function(reason) {});
            } else {
                showConfirm('网络连接超时，请稍后再试', '确定', 2);
            }
        }

        //微信分享朋友圈
        $scope.weChatShareTIMELINE = function() {
            if (sharlLink && sharlLink != "") {
                $scope.modalShare.remove();
                Wechat.share({
                    message: {
                        title: share.title,
                        description: "",
                        thumb: sharlLink,
                        media: {
                            type: Wechat.Type.WEBPAGE,
                            webpageUrl: sharlLink
                        }
                    },
                    scene: Wechat.Scene.TIMELINE // share to TIMELINE
                }, function() {}, function(reason) {});
            } else {
                showConfirm('网络连接超时，请稍后再试', '确定', 2);
            }
        }

        $scope.clipboard = function() {
            if (isApp) {
                MRClipboard.clipboard(function success() {}, function failed(message) {}, sharlLink);
            }
        }
    }

])