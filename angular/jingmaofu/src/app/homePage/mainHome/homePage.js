angular.module('jinmaofu.homePage', [
        'ionic',
        'jinmaofu.homePage.mock',
        'jinmaofu.changeCommunity',
        'jinmaofu.convenientInformation',
        'jinmaofu.bianminfeedback'
    ])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('homePage', {
            url: '/homePage',
            controller: 'homePageController',
            templateUrl: 'homePage/mainHome/homePage.tpl.html',
            authorizedRuleType: ['1', '2', '3', '4'],
            params: { 'communityId': null }
        })
    }])
    .controller('homePageController', ['pageInitService', '$scope', '$http', '$stateParams', '$state', '$ionicTabsDelegate', '$ionicHistory', 'transferParams', '$ionicSlideBoxDelegate', 'CurrentUserService',
        function(pageInitService, $scope, $http, $stateParams, $state, $ionicTabsDelegate, $ionicHistory, transferParams, $ionicSlideBoxDelegate, CurrentUserService) {
            var notFirstIn = false;
            debugger
            $scope.$on('$ionicView.enter', function() {
                $scope.currentTab = 'homePage/mainHome';
                $ionicTabsDelegate.select(0);
            });
            $scope.$on('$ionicView.enter', function() {
                // //之前选择过小区
                // if (transferParams.params && transferParams.params != '') {
                //     getpropertyannouncement(transferParams.params.pinyinCode);
                //     shownewstitlelist(transferParams.params.pinyinCode);
                // } else {
                //     // 从未选择过小区
                //     $http.post('/user/getcitys', {}).then(function(res) {
                //         $scope.community = res.data[0].buildingList[0][0];
                //         getpropertyannouncement($scope.community.pinyinCode);
                //         shownewstitlelist($scope.community.pinyinCode);
                //         $scope.goCommunityList = function($event) {
                //             $event.stopPropagation();
                //             $state.go('changeCommunity', { 'cityInfo': res.data });
                //         };
                //     }, function(err) {
                //         console.log('报错：' + err.data);
                //     });
                // }

                if (CurrentUserService.userSession().userInfoData && CurrentUserService.userSession().userInfoData != null && CurrentUserService.userSession().userInfoData.token != '') {
                    getDefCity(CurrentUserService.userSession().userInfoData.token);
                } else if (isApp) {
                    MRDeviceId.getDeviceId(function success(message) {
                        $scope.uuid = message;
                        getDefCity($scope.uuid);
                    }, function failed() {});

                }
                getPersonalMessageIndex();
            });

            //获取默认项目
            var getDefCity = function(id) {
                $http.get('/user/getDefaultCity?userOrPhoneId=' + id).then(function(res) {
                    $scope.community = res.data;
                    getpropertyannouncement($scope.community.pinyinCode);
                    shownewstitlelist($scope.community.pinyinCode);
                    transferParams.create($scope.community);
                }, function(err) {
                    console.log(err.data);
                });
            }
            $scope.goCommunityList = function($event) {
                $event.stopPropagation();
                $state.go('changeCommunity');
            };

            var apis = [
                '/homePage/communityMsg/1'
            ];
            pageInitService.pageInit(apis).then(function(res) {
                $scope.communityMsg = res[0].data;
            });
            $scope.goPersonalInfo = function($event) {
                $event.stopPropagation();
                $state.go('personalInfo', {})
            }

            //物业公告
            var getpropertyannouncement = function(houseProjectId) {
                $http.post('/user/getpropertyannouncement', { 'houseProjectId': houseProjectId }).then(function(res) {
                    $scope.communityAnnounce = res.data[0];
                }, function(err) {
                    console.log('报错：' + err.data);
                })
            }

            // 轮播图信息
            // var shownewstitlelist = function(houseProjectId) {
            //     $http.get('/home/getCarousel' + '/' + houseProjectId).then(function(res) {
            //         $scope.sliderPic = res.data;
            //         $ionicSlideBoxDelegate.update();
            //     }, function(err) {
            //         console.log(err.data);
            //     });
            // }
            var shownewstitlelist = function(houseProjectId) {
                $http.get('/communitynews/shownewstitlelist').then(function(res) {
                    $scope.sliderPic = res.data;
                    $ionicSlideBoxDelegate.update();
                }, function(err) {
                    console.log(err.data);
                });
            }

            // 获取个人消息
            var getPersonalMessageIndex = function() {
                $http.post('/user/getPersonalMessageIndex', {}).then(function(res) {
                    // 全部报修消息
                    var allRepairData = res.data;
                    // 未读消息
                    var noReadMsg = [];
                    // 已读消息
                    var readMsg = [];
                    for (var i = 0; i < allRepairData.length; i++) {
                        if (allRepairData[i].readStatus == null || allRepairData[i].readStatus == '0') {
                            noReadMsg.push(allRepairData[i]);
                        } else {
                            readMsg.push(allRepairData[i]);
                        };
                    };
                    $scope.noReadArr = noReadMsg;

                    // 删除并发送请求
                    $scope.deleteMarkRead = function(num, data, taskId) {
                        var params = {
                            taskId: taskId
                        };
                        $http.post('/user/changepersonalcollectionstatus', params).then(function(res) {
                            data.splice(num, 1);
                            console.log('删除成功');
                        }, function(err) {
                            data.splice(num, 1);
                            console.log('出错了' + err.data);
                        });
                    };
                }, function(err) {
                    console.log(err.data);
                });
            }

            $scope.showList = {
                show: false
            };

            // 去报修详情页
            $scope.goRepairDetail = function(num, data, id, taskId) {
                $scope.deleteMarkRead(num, data, taskId);
                $state.go('propertrepairdetail', { 'repairData': id });
            };
            // 去公告详情页
            $scope.goCommunityDetail = function(obj) {
                $state.go('butlerPage/communityNewsDetail', { 'detailidId': obj.detailidId });
            };

            $scope.selectPage = function(id) {
                $state.go('newsDetail', { 'id': id });
            }
            $scope.toDetail = function(index) {
                if (index == '0') {
                    $state.go('valueGoodsDetail', {});
                } else if (index == '1') {
                    $state.go('valueGoodsDetail01', {});
                } else if (index == '2') {
                    $state.go('valueGoodsDetail02', {});
                } else if (index == '3') {
                    $state.go('valueGoodsDetail03', {});
                } else if (index == '4') {
                    $state.go('valueGoodsDetail04', {});
                } else if (index == '5') {
                    $state.go('valueGoodsDetail05', {});
                } else if (index == '6') {
                    $state.go('neighbourhoodDetail', {});
                } else if (index == '7') {
                    $state.go('neighbourhoodDetail01', {});
                } else if (index == '8') {
                    $state.go('neighbourhoodDetail02', {});
                } else if (index == '9') {
                    $state.go('neighbourhoodDetail03', {});
                }

            };
        }
    ])