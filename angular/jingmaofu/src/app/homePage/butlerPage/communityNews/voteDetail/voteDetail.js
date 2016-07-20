angular.module('jinmaofu.voteDetail', [
    'ionic',
    'jinmaofu.voteDetail.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('voteDetail', {
        url: '/voteDetail?announcementId',
        controller: 'voteDetailController',
        templateUrl: 'homePage/butlerPage/communityNews/voteDetail/voteDetail.tpl.html',
        cache: false,
        authorizedRuleType: ['2', '3', '4'],
    })
}])

.controller('voteDetailController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams', '$ionicModal', 'transferParams',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams, $ionicModal, transferParams) {
        $scope.$on('$ionicView.beforeLeave', function() {
            if ($scope.modal) {
                $scope.modal.remove();
            };
        });
        $http.get('/vote/getVoteResult/' + $stateParams.announcementId + '/' + transferParams.params.pinyinCode).then(function(res) {
            $scope.voteData = res.data;
            var voteNumArr = [];
            var voteInfoArr = $scope.voteData.announcementVoteList;
            for (var i = 0; i < voteInfoArr.length; i++) {
                voteNumArr.push(voteInfoArr[i].voteNumber);
            };
            var percentArr = [];
            for (var j = 0; j < voteNumArr.length; j++) {
                percentArr.push((voteNumArr[j] / $scope.voteData.count).toFixed(3) * 100);
                var temp = (voteNumArr[j] / $scope.voteData.count).toFixed(3) * 100;
                $scope.voteData.announcementVoteList[j].percent = temp;
            };

        }, function(err) {});

        /*以下是分享和复制链接*/
        var sharlLink = "http://ssmt.chinajinmao.cn" + "/voteDetail?announcementId=" + $stateParams.announcementId;
        console.log(sharlLink);
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
            title: '公告详情',
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
            //弹出框
        var showConfirm = function(template, okText, num) {
            var confirmPopup = $ionicPopup.alert({
                template: template,
                okText: okText
            });
            confirmPopup.then(function(res) {
                if (res && num == 1) {
                    $ionicHistory.goBack();
                }
            });
        };
    }
])