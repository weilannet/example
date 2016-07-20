angular.module('jinmaofu.activityDetail', [
    'jinmaofu.activityDetail.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('activityDetail', {
        url: '/activityDetail/:id/:usertype',
        controller: 'activityDetailController',
        templateUrl: 'homePage/butlerPage/activityApply/activityDetail/activityDetail.tpl.html',
        authorizedRuleType: ['1', '2', '3', '4'],
        cache: false
    })
}])

.controller('activityDetailController', ['pageInitService', '$scope', '$http', '$stateParams', '$ionicPopup', '$ionicModal',
    function(pageInitService, $scope, $http, $stateParams, $ionicPopup, $ionicModal) {
        var apis = [
            '/community/activityInfo/' + $stateParams.id,
            // '/community/myActivities?pageIndex=0&pageSize=10'
        ];
        $scope.usertype = $stateParams.usertype;
        pageInitService.pageInit(apis).then(function(result) {
            $scope.data = result[0].data;
            $scope.applyState = {
                aplState: false
            };
            $scope.timeNow = parseInt(($scope.data.date.substr(0, 4)) + ($scope.data.date.substr(5, 2)) + ($scope.data.date.substr(8, 2)));
            $scope.timeDone = parseInt(($scope.data.publishDate.substr(0, 4)) + ($scope.data.publishDate.substr(5, 2)) + ($scope.data.publishDate.substr(8, 2)));
            if ($scope.timeDone - $scope.timeNow >= 0) {
                if ($scope.data.people > 0) {
                    $scope.applyState = {
                        aplState: false
                    };
                } else {
                    $scope.applyState = {
                        aplState: true
                    };
                }
            } else {
                $scope.applyState = {
                    aplState: true
                };
            };
        });
        $scope.apply = function() {
            $http.post('/community/apply', { id: $stateParams.id }).then(
                function(result) {
                    showAlert('报名成功');
                    $scope.data.status = 1;
                },
                function(result) {
                    showAlert(result.data);
                })
        }
        var showAlert = function(template) {
            var alertPopup = $ionicPopup.alert({
                template: template,
                okText: '确定',
                okType: 'button-energized'
            });
            alertPopup.then(function(res) {
                $state.goBack();
                // console.log('Thank you for not eating my delicious ice cream cone');
            });
            $scope.$on('$ionicView.beforeLeave', function() {
                alertPopup.close();
            })
        };
        var sharlLink = "http://ssmt.chinajinmao.cn/" + "/activityDetail/" + $stateParams.id;
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