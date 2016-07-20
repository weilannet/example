angular.module('jinmaofu.details', [
    'jinmaofu.details.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('details', {
        url: '/details/:id/:projectName/:planName/:state',
        controller: 'detailsController',
        templateUrl: 'appointment/details/details.tpl.html',
        resolve: {
            // resolveData: ['$http', function($http) {
            //     return $http.get('/user/loginUserInfo');
            // }],
            reserveData: ['$http', '$stateParams', function($http, $stateParams) {
                return $http.get('/deliveryPlan/queryStatus/' + $stateParams.planName);
                // return { data: '0' };
            }]
        },
        authorizedRuleType: ['1', '2', '3', '4']
    })
}])

.controller('detailsController', ['reserveData', 'pageInitService', '$scope', '$http', '$stateParams', '$ionicModal', 'CurrentUserService', '$ionicPopup', '$state',
    function(reserveData, pageInitService, $scope, $http, $stateParams, $ionicModal, CurrentUserService, $ionicPopup, $state) {
        $scope.$on('$ionicView.beforeLeave', function() {
            if ($scope.modal) {
                $scope.modal.remove();
            };
        });
        $scope.appointStatus = {
            status: null
        }
        var pjcName = $stateParams.projectName;
        var plnName = $stateParams.planName;
        var deviceInfo = window.navigator.appVersion;
        var getDevice = deviceInfo.substr(5, 6);
        if (getDevice == 'iPhone') {
            pjcName = encodeURIComponent(pjcName);
            plnName = encodeURIComponent(plnName);
        };
        $scope.appointTimes = {
            // 1 already  0 non
            isfirst: reserveData.data
        };
        // 预约状态
        $scope.appointmentNote = {
            xieyi: false
        };

        //已预约
        var appointment = function() {
                // 页面显示控制
                $scope.pageShow = {
                    page1: false,
                    page2: true
                };
                $http.get('/deliveryPlan/batchDetail/' + $stateParams.id).then(function(res) {
                        $scope.data = res.data;
                    }, function(err) {})
                    //获取用户预约后要显示的信息
                $http.get('/deliveryPlan/userInfo').then(function(res) {
                    $scope.aftUserInfo = {
                        realName: res.data.realName,
                    };
                }, function(err) {});
                $http.get('/deliveryPlan/selfHouseList/' + pjcName + '/' + plnName).then(function(res) {
                    $scope.aftHouseInfo = {
                        houseList: res.data,
                    };
                }, function(err) {});
                $http.get('/deliveryPlan/queryReservationDate/' + plnName).then(function(res) {
                    $scope.aftAppoitnTime = {
                        times: res.data,
                    };
                });
            }
            //未预约
        var unAppointment = function() {
                // 页面显示控制
                $scope.pageShow = {
                    page1: true,
                    page2: false
                };
                // 用户没有进行过预约

                // 页面初始化
                var apis = [
                    '/deliveryPlan/batchDetail/' + $stateParams.id,
                    '/deliveryPlan/batchHouseDetail/' + $stateParams.id,
                    '/deliveryPlan/selfHouseList/' + pjcName + '/' + plnName
                ];
                pageInitService.pageInit(apis).then(function(result) {
                    $scope.data = result[0].data;
                    $scope.dataRoomList = result[1].data;
                    $scope.personalHouseList = result[2].data;
                    // for (var i = 0; i < $scope.personalHouseList.length; i++) {
                    //     for (var j = 0; j < $scope.dataRoomList.length; j++) {
                    //         if ($scope.personalHouseList[i] == $scope.dataRoomList[j]) {
                    //             $scope.showBtn1 = true;
                    //         } else {
                    //             $scope.showBtn1 = false;
                    //         };
                    //     };
                    // };

                    if ($scope.personalHouseList.length) {
                        $scope.showBtn1 = true;
                    } else {
                        $scope.showBtn1 = false;
                    };
                    if ($stateParams.state == 'start') {
                        $scope.showBtn2 = true;
                    } else {
                        $scope.showBtn2 = false;
                    };
                });
            }
            //判断用户是否已经预约，1为已预约
        if (reserveData.data == '1') {
            appointment();
        } else {
            unAppointment();
        };

        // 获取年份方法
        function slsYear(times) {
            return times.slice(0, 4);
        };

        // 获取月份方法
        function slsMonth(times) {
            return times.slice(5, 7);
        };

        //获取日期方法
        function slsDate(times) {
            return times.slice(8);
        };



        // 隔离swiper作用域  lzl
        $scope.swiper = { swiper1: {}, swiper2: {}, swiper3: {}, swiper4: {}, };

        // 计算时间差天数方法  lzl
        function dateBetween(date1, date2) {
            // 初始时间
            var oneMonth = date1.substring(5, date1.lastIndexOf('-'));
            var oneDay = date1.substring(date1.length, date1.lastIndexOf('-') + 1);
            var oneYear = date1.substring(0, date1.indexOf('-'));
            // 结束时间
            var twoMonth = date2.substring(5, date2.lastIndexOf('-'));
            var twoDay = date2.substring(date2.length, date2.lastIndexOf('-') + 1);
            var twoYear = date2.substring(0, date2.indexOf('-'));
            var btTime = ((Date.parse(oneMonth + '/' + oneDay + '/' + oneYear) - Date.parse(twoMonth + '/' + twoDay + '/' + twoYear)) / 86400000);
            // 返回天数
            return Math.abs(btTime);
        };


        // 第一次提交模态框方法   lzl
        $scope.openModal = function() {
            //获取用户信息接口
            $http.get('/deliveryPlan/userInfo').then(function(res) {
                    // 获取开始和结束时间
                    var bakData = {
                        begTime: $scope.data.planStart,
                        endTime: $scope.data.planEnd
                    };
                    // 模态框文本
                    $scope.textarea = {
                        // text: '姓名：' + res.data.userName + "\n" + '身份证：' + res.data.idCard + "\n" + '手机号：' + res.data.mobile
                        text: '姓名：' + res.data.realName + "\n" + '身份证：' + res.data.idCard + "\n" + '手机号：' + res.data.mobile
                    };
                    // 开始结束时间
                    var time1 = bakData.begTime;
                    var time2 = bakData.endTime;

                    // 开始毫秒
                    var begYear = time1.substring(0, time1.indexOf('-'));
                    var begMonth = time1.substring(5, time1.lastIndexOf('-'));
                    var begDay = time1.substring(time1.length, time1.lastIndexOf('-') + 1);
                    var begSec = Date.parse(begMonth + '/' + begDay + '/' + begYear);

                    // 结束毫秒
                    var endYear = time2.substring(0, time2.indexOf('-'));
                    var endMonth = time2.substring(5, time2.lastIndexOf('-'));
                    var endDay = time2.substring(time2.length, time2.lastIndexOf('-') + 1);
                    var endSec = Date.parse(endMonth + '/' + endDay + '/' + endYear);

                    // 每天毫秒
                    var daySec = 86400000;

                    //总共天数
                    var dateNum = dateBetween(time1, time2);

                    // 时间范围数组
                    var dateArr = [];

                    function pushArr(sec) {
                        var newTime = new Date(sec);
                        var y = newTime.getFullYear();
                        var m = (newTime.getMonth() + 1) < 10 ? '0' + (newTime.getMonth() + 1) : (newTime.getMonth() + 1);
                        var d = newTime.getDate() < 10 ? '0' + newTime.getDate() : newTime.getDate();
                        y.toString();
                        m.toString();
                        d.toString();
                        var newDay = y + '-' + m + '-' + d;
                        dateArr.push(newDay);
                    };

                    // 每天的时间插入数组
                    for (var i = 0; i <= dateNum; i++) {
                        pushArr(begSec);
                        begSec += daySec;
                    };

                    // 要显示的年份
                    var showYear = [];
                    if (begYear == endYear) {
                        showYear.push(begYear);
                    } else {
                        for (var j = begYear; j <= endYear; j++) {
                            showYear = [];
                            showYear.push(j);
                        };
                    };

                    // 要显示的月份
                    var showMonth = [];
                    // 时间跨年了
                    if (showYear.length > 1) {
                        for (var k = parseInt(begMonth); k <= 12; k++) {
                            if (k < 10) {
                                k = '0' + k;
                            } else {
                                k = k.toString();
                            };
                            showMonth.push(k);
                        };
                        for (var l = 1; l <= endMonth; l++) {
                            if (l < 10) {
                                l = '0' + l;
                            } else {
                                l = '' + l;
                            };
                            showMonth.push(l);
                        }
                    } else {
                        // 未跨年
                        for (var b = parseInt(begMonth); b <= endMonth; b++) {
                            if (b < 10) {
                                b = '0' + b;
                            } else {
                                b = '' + b;
                            };
                            showMonth.push(b);
                        };
                    };

                    // 显示的日期
                    // var showDate = ['01','02','03','04','05'];
                    var showDate = [];
                    for (var h = 1; h < 31; h++) {
                        if (h < 10) {
                            h = '0' + h;
                        } else {
                            h.toString();
                        };
                        showDate.push(h);
                    };

                    // 前台页面数据绑定
                    $scope.data1 = showYear; // 年
                    $scope.data2 = showMonth; // 月
                    $scope.data3 = showDate; // 日
                    // $scope.day = { data3: showDate } // 日
                    // febdayset();
                    $scope.data4 = ["上午", "下午"];

                    function isLeapYear(year) {
                        return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
                    };


                    $ionicModal.fromTemplateUrl('appointment/modal/modal.tpl.html', {
                        scope: $scope,
                        backdropClickToClose: false,
                        hardwareBackButtonClose: false,
                        animation: 'slide-in-right'
                    }).then(function(modal) {
                        $scope.modal = modal;
                        $scope.modal.show();


                        $scope.onChangeEnd = function() {
                            // 判断是否是闰年  返回布尔值
                            setTimeout(function() {
                                var isLeapYears = isLeapYear($scope.data1[$scope.swiper.swiper1.activeIndex]);
                                // 声明大月
                                var bigmouth = ["01", "03", "05", "07", "08", "10", "12"];
                                // 判断当前轮播图显示的月份是否在大月里边 返回布尔值
                                var isbigdata = CurrentUserService.contains(bigmouth, $scope.data2[$scope.swiper.swiper2.activeIndex]);
                                // 如果是大月
                                if (isbigdata) {
                                    // 则日期先显示31天
                                    showDate = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
                                    $scope.data3 = showDate;
                                    $state.reload($state.current.name);
                                }
                                // 如果显示月份为2月份，且是闰年
                                else if (($scope.data2[$scope.swiper.swiper2.activeIndex] == "02") && isLeapYears) {
                                    // 则日期显示为29天
                                    showDate = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'];
                                    $scope.data3 = showDate;
                                    $state.reload($state.current.name);
                                }
                                // 如果显示月份为2月份，且不是闰年
                                else if ($scope.data2[$scope.swiper.swiper2.activeIndex] == "02" && !isLeapYears) {
                                    // 则日期显示为28天
                                    showDate = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'];
                                    $scope.data3 = showDate;
                                    $state.reload($state.current.name);
                                } else {
                                    // 则日期显示为30天
                                    showDate = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
                                    $scope.data3 = showDate;
                                    $state.reload($state.current.name);
                                };
                            }, 50);
                        };



                        $scope.onChangeEnd();

                        $scope.choseTime1 = function(formName) {
                            // 获取最新状态
                            $http.get('/deliveryPlan/queryStatus/' + plnName).then(function(res) {
                                $scope.appointStatus = {
                                    status: res.data,
                                };
                            }, function(err) {
                                console.log(err);
                            }).then(function(bak) {

                                var yearSent = $scope.data1[$scope.swiper.swiper1.activeIndex];
                                var monthSent = $scope.data2[$scope.swiper.swiper2.activeIndex];
                                // var daySent = $scope.day.data3[$scope.swiper.swiper3.activeIndex];
                                var daySent = $scope.data3[$scope.swiper.swiper3.activeIndex];
                                var noonSent = '';
                                if ($scope.data4[$scope.swiper.swiper4.activeIndex] == '上午') {
                                    noonSent = '0';
                                } else {
                                    noonSent = '1';
                                };

                                // 拼接时间
                                var timeSent = yearSent.toString() + '-' + monthSent.toString() + '-' + daySent.toString();
                                // 判断时间是否合法
                                var timevalid = CurrentUserService.contains(dateArr, timeSent);

                                if (timevalid) { //ffxiugai
                                    // if (true) {
                                    var newTimeSent = timeSent.replace(/\-/g, '/');
                                    var choseT = {
                                        reservationDate: newTimeSent,
                                        amOrPm: noonSent,
                                        projectName: $scope.data.projectName,
                                        planName: $scope.data.planName
                                    };

                                    // 判断是否是第一次预约
                                    var appointApi = '';
                                    if ($scope.appointStatus.status == null) {
                                        appointApi = "/deliveryPlan/addReservationList";
                                    } else if ($scope.appointStatus.status == '1' || $scope.appointStatus.status == '0') {
                                        appointApi = "/deliveryPlan/updateReservationList";
                                    };
                                    $http.post(appointApi, choseT).then(function(back) {
                                        // deliveryTime = timeSent;
                                        var alertPopup = $ionicPopup.alert({
                                            template: "提交信息成功",
                                            okText: '确认',
                                        });
                                        alertPopup.then(function(back) {
                                            formName.$submitted = false;
                                            $scope.closeModal();
                                            $scope.showRes();
                                            // 微信关闭方法
                                            // wx.closeWindow();
                                        });
                                    }, function(msg) {
                                        var alertPopup = $ionicPopup.alert({
                                            template: "提交信息失败",
                                            okText: '确认'
                                        });
                                        alertPopup.then(function(back) {
                                            formName.$submitted = false;
                                        });
                                    });
                                } else {
                                    var timePopup = $ionicPopup.alert({
                                        template: "时间选择不在交付范围内，请重新选择",
                                        okText: '确认',
                                    });
                                };


                            }, function(errors) {

                            });



                        };

                    });
                },
                function() {

                })

        };




        //取消预约提示
        $scope.showConfirm = function(plnName) {
            var confirmPopup = $ionicPopup.confirm({
                title: '温馨提示',
                template: '预定前24小时内将不能取消预约',
                cancelText: '返回',
                cancelType: 'button-energized',
                okText: '确定',
                okType: 'button-light'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    var datass = {
                        planName: plnName
                    };
                    $http.post('/deliveryPlan/cancleReservationList/', datass).then(function(res) {
                        $scope.showInit();
                    }, function(err) {});
                } else {}
            });
            $scope.$on('$ionicView.beforeLeave', function() {
                confirmPopup.close();
            })
        };

        // 关闭模态框方法  lzl
        $scope.closeModal = function() {
            //  $scope.modal.hide();
            // if ($scope.modal) {
            $scope.modal.remove();
            // };
        };
        // 预约时间选择完成
        $scope.showRes = function() {
            //获取用户预约后要显示的信息
            $http.get('/deliveryPlan/userInfo').then(function(res) {
                $scope.aftUserInfo = {
                    realName: res.data.realName,
                };
            }, function(err) {});
            $http.get('/deliveryPlan/selfHouseList/' + pjcName + '/' + plnName).then(function(res) {
                $scope.aftHouseInfo = {
                    houseList: res.data,
                };
            }, function(err) {});
            $http.get('/deliveryPlan/queryReservationDate/' + plnName).then(function(res) {
                var aftReserTime = res.data.replace(/\//g, '-');
                $scope.aftAppoitnTime = {
                    times: aftReserTime,
                };
            });
            //说明：$scope.data.note
            //切换页面显示
            $scope.pageShow = {
                page1: false,
                page2: true
            };
        };
        // 取消预约后显示
        $scope.showInit = function() {
            unAppointment();
        };

    }
])