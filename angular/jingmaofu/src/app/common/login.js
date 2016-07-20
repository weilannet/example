angular.module('jinmao.common.login', [])

.service('Session', [function() {
    this.userInfoData = null;
    this.validTime = null;
    this.create = function(userInfoData, validTime) {
        this.userInfoData = userInfoData;
        this.validTime = validTime;
    };
    this.destroy = function() {
        this.userInfoData = null;
        this.validTime = null;
    };
    return this;
}])

.factory('CurrentUserService', ['$rootScope', '$timeout', '$ionicHistory', '$http', 'Session', '$filter', '$state', '$ionicModal', '$ionicPopup',
    function($rootScope, $timeout, $ionicHistory, $http, Session, $filter, $state, $ionicModal, $ionicPopup) {
        var currentUser = {};
        currentUser.login = function(credentials) {
            return $http
                .post('/user/loginforup', credentials)
                //  .post('http://172.16.0.179:8080/user/login', credentials)
                .then(function(res) {
                        var validTime = parseInt($filter('date')(new Date(), 'yyyyMMdd')) + 2;
                        Session.create(res.data, validTime);
                        // localStorage.setItem('localToken',res.token);
                        return res;
                    },
                    function(data) {
                        var alertPopup = $ionicPopup.alert({
                            title: data.data || data,
                            okText: '取消',
                            template: data.data || data
                        });
                    });
        };
        currentUser.userSession = function() {
            return Session;
        };
        currentUser.destroyUserSession = function() {
            Session.destroy();
            return Session;
        };
        currentUser.contains = function(arr, obj) {
            var i = arr.length;
            while (i--) {
                if (arr[i] === obj) {
                    return true;
                }
            }
            return false;
        };

        currentUser.usrAuth = function(evt, toState, toParams, fromState, fromParams) {
            var rule = toState.authorizedRuleType;
            pageAuth(rule, evt, toState, toParams);
            // 无Session
            if (!Session.userInfoData) {
                $http.post('/user/getuserinfobyid', {}).then(function(res) {
                    // 有cookie
                    currentUser.updateSession(res.data).userInfoData.userType;
                    blankPageToHomeIndex(toState);

                }, function(err) {
                    // 请求失败
                    var defaultData = {
                        address: "",
                        beginTime: "",
                        endTime: "",
                        idCard: "",
                        idType: null,
                        logo: "",
                        mobile: "",
                        nickName: "",
                        projectId: "",
                        projectName: "",
                        realName: null,
                        sex: null,
                        token: "",
                        userName: "",
                        userState: 1,
                        userType: "1",
                    };
                    currentUser.updateSession(defaultData);
                    isHasAuth = currentUser.contains(rule, defaultData.userType);
                    $state.go(toState.name, toParams);
                });

                // $http.get('/user/userInfo').then(
                //     function(data) { //有cookie 更新用户信息
                //         usr = currentUser.updateSession(data.data).userInfoData.userType;
                //         blankPageToHomeIndex(toState);
                //     },
                //     function() {
                //         if (!!rule) { //没有cookie 重新登录
                //             if (!Session.userInfoData) {
                //                 $ionicModal.fromTemplateUrl('userServers/login/login.tpl.html', {
                //                         nextState: {
                //                             toState: toState,
                //                             toParams: toParams
                //                         },
                //                         backdropClickToClose: false,
                //                         animation: 'slide-in-right'
                //                     })
                //                     .then(function(modal) {
                //                         modal.show();
                //                     });
                //                 return;
                //             };
                //         };
                //     });
            } else {
                blankPageToHomeIndex(toState);
            };
        }
        currentUser.tokenBug = function(event, mass) {
            if ($state.current.name != "blankPage") {
                if ($rootScope.tokenBugThenFn) {
                    $timeout.cancel($rootScope.tokenBugThenFn);
                }
                $rootScope.tokenBugThenFn = $timeout(function() {
                    showAlert(mass, mass, "确定");
                    $rootScope.tokenBugThenFn = null;
                }, 50);
            }
        }
        var showAlert = function(title, template, okText) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                okText: okText,
                template: template
            });
            alertPopup.then(function(res) {
                currentUser.destroyUserSession();
                $state.go("blankPage", {}, { location: 'replace' });
            });
        };
        currentUser.updateSession = function(data) {
            var validTime = parseInt($filter('date')(new Date(), 'yyyyMMdd')) + 2;
            Session.create(data, validTime);
            return Session;
        };


        // var pageAuth = function(rule, evt, toState, toParams) {
        //     var showConfirm = function(title, template, leftText, rightText) {
        //         var confirmPopup = $ionicPopup.confirm({
        //             title: title,
        //             template: template,
        //             okText: leftText,
        //             cancelText: rightText
        //         });
        //         confirmPopup.then(function(res) {
        //             if (res) {
        //                 $ionicModal.fromTemplateUrl('userServers/register/register.tpl.html', {
        //                         nextState: {
        //                             toState: toState,
        //                             toParams: toParams
        //                         },
        //                         animation: 'slide-in-right'
        //                     })
        //                     .then(function(modal) {
        //                         modal.show();
        //                     });

        //             } else {
        //                 $ionicHistory.nextViewOptions({ historyRoot: false });
        //             }
        //         });
        //     }


        //     if (!Session.userInfoData) return;
        //     var usr = Session.userInfoData.userType;

        //     var isHasAuth = currentUser.contains(rule, usr);
        //     if (!isHasAuth) {
        //         evt.preventDefault();
        //         showConfirm('权限不足', '非常抱歉，本功能目前仅对正式用户开放，来注册成为正式用户吧', '去登录', '取消');

        //     } else {}
        // }

        // lzl
        var pageAuth = function(rule, evt, toState, toParams) {
            var showConfirm = function(title, template, leftText, rightText, url) {
                var confirmPopup = $ionicPopup.confirm({
                    title: title,
                    template: template,
                    okText: leftText,
                    cancelText: rightText
                });
                confirmPopup.then(function(res) {
                    if (res) {
                        $ionicModal.fromTemplateUrl(url, {
                                nextState: {
                                    toState: toState,
                                    toParams: toParams
                                },
                                animation: 'slide-in-right'
                            })
                            .then(function(modal) {
                                modal.show();
                            });

                    } else {
                        $ionicHistory.nextViewOptions({ historyRoot: false });
                    }
                });
            };
            if (!Session.userInfoData) return;
            var isHasAuth = Boolean();
            // 有Session
            var usr = Session.userInfoData.userType;
            var userID = Session.userInfoData.idCard;

            isHasAuth = currentUser.contains(rule, usr);
            if (userID == null || userID == '') {
                isHasID = false;
            } else {
                isHasID = true;
            };
            if (!isHasAuth && !isHasID && usr != '1') {
                // 业主权限未通过
                evt.preventDefault();
                showConfirm('权限不足', '非常抱歉，本功能目前仅对业主用户开放，来注册成为业主用户吧', '确定', '取消', 'userServers/ownerApprove/ownerApprove.tpl.html');

            } else if (!isHasAuth && isHasID && usr != '1') {
                evt.preventDefault();
                showConfirm('权限不足', '非常抱歉，本功能目前仅对业主用户开放，来申诉成为业主用户吧', '确定', '取消', 'userServers/ownerAppeal/ownerAppeal.tpl.html');
            } else if (!isHasAuth && usr == '1') {
                evt.preventDefault();
                showConfirm('权限不足', '非常抱歉，本功能目前仅对会员用户开放，来注册成为会员用户吧', '确定', '取消', 'userServers/login/login.tpl.html');
            }
        }

        var blankPageToHomeIndex = function(toState) {
            if (toState.name == "blankPage") {
                $state.go("homePage", {}, { location: 'replace' });
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
            }
        }
        return currentUser;
    }
])