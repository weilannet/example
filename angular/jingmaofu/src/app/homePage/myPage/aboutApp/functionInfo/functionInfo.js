angular.module('jinmaofu.functionInfo', [
    'ionic',
    'jinmaofu.functionInfo.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('aboutApp/functionInfo', {
        url: '/mine/aboutApp/functionInfo',
        controller: 'functionInfoController',
        templateUrl: 'homePage/myPage/aboutApp/functionInfo/functionInfo.tpl.html',
        cache: false,
        authorizedRuleType: ['2', '3', '4']
    })
}])

.controller('functionInfoController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams', '$ionicModal',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams, $ionicModal) {
        // var apis = ['/system/getappremark'];
        // pageInitService.pageInit(apis).then(function(res){
        //     $scope.updateInfo = res[0].data;
        // },function(err){
        //     console.log(err)
        // })

        /*以下是分享和复制链接*/
        var sharlLink = "http://ssmt.chinajinmao.cn" + "/mine/aboutApp/functionInfo";
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
            title: '金茂荟功能介绍',
            appName: '金茂荟',
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