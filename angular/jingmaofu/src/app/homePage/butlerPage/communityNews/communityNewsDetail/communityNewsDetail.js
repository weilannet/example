angular.module('jinmaofu.communityNewsDetail', [
    'ionic',
    'jinmaofu.communityNewsDetail.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('butlerPage/communityNewsDetail', {
        url: '/butlerPage/communityNews/communityNewsDetail/?detailidId & userType',
        controller: 'communityNewsDetailController',
        templateUrl: 'homePage/butlerPage/communityNews/communityNewsDetail/communityNewsDetail.tpl.html',
        cache: false,
        authorizedRuleType: ['1', '2', '3', '4']
    })
}])

.controller('communityNewsDetailController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams', 'CurrentUserService', '$state', '$ionicModal',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams, CurrentUserService, $state, $ionicModal) {

        $scope.tourists = $stateParams.userType;

        var paramsInfo = {
            'announcementId': $stateParams.detailidId
        };

        function refereshPage() {
            $http.post('/user/getpropertyannouncementbyid', paramsInfo).then(function(res) {
                console.log(res.data);
                var secReleaseTime = res.data[0].releaseDate;
                $scope.commNewsDetail = res.data[0];

                if ($scope.tourists != 1) {
                    $scope.commentItems = res.data[1];
                    $scope.collectionData = res.data[2];
                }
            }, function(err) {});
        };
        refereshPage();

        /*以下是分享和复制链接*/
        var sharlLink = "http://ssmt.chinajinmao.cn" + "/butlerPage/communityNews/communityNewsDetail/?detailidId=" + $stateParams.detailidId + "&" + "userType=" + '1';
        console.log('shareUrl' + sharlLink);
        // 绑定评论信息
        $scope.text = {
            textInfo: ''
        };
        // 控制显示评论
        $scope.showComment = {
            show: false
        };
        // 提交评论
        $scope.submitComment = function() {
            if ($scope.text.textInfo == '' || $scope.text.textInfo == null) {
                showConfirm('内容不能为空', '确定', 2);
            } else {
                $scope.showComment = {
                    show: false
                };
                var params = {
                    'announcementId': paramsInfo.announcementId,
                    'content': $scope.text.textInfo
                };
                console.log(params);
                $http.post('/announcement/submitReply', params).then(function(res) {
                    showConfirm('问题已提交', '确定', 2);
                    // 刷新页面数据
                    refereshPage();
                }, function(err) {
                    $scope.showComment = {
                        show: false
                    };
                    console.log(err.data);
                })
            }
        };
        // 点赞
        $scope.pressLike = function() {
            $http.get('/announcement/clickPraise/' + paramsInfo.announcementId).then(function(res) {
                refereshPage();
            }, function(err) {
                showMessage(err.data, '好');
            });
        };
        // 添加个人收藏
        $scope.addFavorite = function() {
            var obj = {
                'messageId': $scope.commNewsDetail.id,
                'messageType': '1'
            };
            $http.post('/user/addcollection', obj).then(function(res) {
                refereshPage();
                showConfirm('收藏成功', '确定', 2);
            }, function(err) {
                showConfirm('收藏失败', '确定', 2);
            });
        };
        // 删除个人收藏
        $scope.deleteFavorite = function() {
            var obj = {
                'id': $scope.collectionData.collectionId
            };
            $http.post('/user/deletecollection', obj).then(function(res) {
                refereshPage();
                showMessage('取消收藏成功', '好');
                $scope.commNewsDetail.collectionID = null;
            }, function(err) {
                console.log('出错了');
            });
        }

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

        $scope.clipboard = function() {
            if (isApp) {
                MRClipboard.clipboard(function success() {}, function failed(message) {}, sharlLink);
            }
        }

        // 提示消息
        var showMessage = function(template, okText) {
                var msgPopup = $ionicPopup.alert({
                    template: template,
                    okText: okText
                });
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