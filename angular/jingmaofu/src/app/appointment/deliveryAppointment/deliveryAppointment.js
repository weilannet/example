angular.module('jinmaofu.deliveryAppointment', [
        'jinmaofu.deliveryAppointment.mock'
    ])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('deliveryAppointment', {
            url: '/deliveryAppointment',
            cache: false,
            controller: 'deliveryAppointmentController',
            templateUrl: 'appointment/deliveryAppointment/deliveryAppointment.tpl.html',
            // resolve: {
            //     resolveData: ['$http', function($http) {
            //         document.getElementsByTagName('title')[0].text = "交付预约";
            //         // return $http.get('/user/loginUserInfo'); //ffxiugai
            //         return;
            //     }]
            // }
            authorizedRuleType: ['1', '2', '3', '4']
        })

    }])

.controller('deliveryAppointmentController', ['pageInitService', '$sce', '$scope', '$ionicPopup', "$ionicModal", '$http', '$ionicScrollDelegate', '$stateParams', 'CurrentUserService', 'transferParams',
    function(pageInitService, $sce, $scope, $ionicPopup, $ionicModal, $http, $ionicScrollDelegate, $stateParams, CurrentUserService, transferParams) {
        $scope.$on('$ionicView.beforeLeave', function() {
            if ($scope.modal) {
                $scope.modal.remove();
            };
        })

        var apis = [
            // '/communityArea/payDetail/' + resolveData.data.userinfo.userId //ffxiugai
            // '/communityArea/payDetail/' + 'fengfan'
            '/deliveryPlan/allBatch?projectId=' + transferParams.params.pinyinCode + '&' + 'cityId=' + transferParams.cityId
        ];

        // 页面初始化方法
        pageInitService.pageInit(apis).then(function(result) {
            $scope.data = result[0].data;

            // 获取开始年，月，日
            // $scope.data.ys = slsYear($scope.data[0].planStart);
            // $scope.data.ms = slsMonth($scope.data[0].planStart);
            // $scope.data.ds = slsDate($scope.data[0].planStart);

            // 获取结束年，月，日
            // $scope.data.ye = slsYear($scope.data[0].planEnd);
            // $scope.data.me = slsMonth($scope.data[0].planEnd);
            // $scope.data.de = slsDate($scope.data[0].planEnd);
        });


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






































        // lzl
        // $scope.appointmentNote = {
        //     xieyi: false
        // }


        // 隔离swiper作用域  lzl
        // $scope.swiper = { swiper1: {}, swiper2: {}, swiper3: {}, swiper4: {}, };

        // 计算时间差天数方法  lzl
        // function dateBetween(date1, date2) {
        //     // 初始时间
        //     var oneMonth = date1.substring(5, date1.lastIndexOf('-'));
        //     var oneDay = date1.substring(date1.length, date1.lastIndexOf('-') + 1);
        //     var oneYear = date1.substring(0, date1.indexOf('-'));
        //     // 结束时间
        //     var twoMonth = date2.substring(5, date2.lastIndexOf('-'));
        //     var twoDay = date2.substring(date2.length, date2.lastIndexOf('-') + 1);
        //     var twoYear = date2.substring(0, date2.indexOf('-'));
        //     var btTime = ((Date.parse(oneMonth + '/' + oneDay + '/' + oneYear) - Date.parse(twoMonth + '/' + twoDay + '/' + twoYear)) / 86400000);
        //     // 返回天数
        //     return Math.abs(btTime);
        // };


        // // 模态框方法   lzl
        // $scope.openModal = function(id, deliveryTime) {


        //     // $http.get('/communityArea/appointDetail/' + id).then(function(res) {   lzl
        //     $http.get('/communityArea/appointDetail/' + '3').then(function(res) { //ffxiugai
        //         var bakData = {
        //             begTime: res.data.appointStaDate,
        //             endTime: res.data.appointEndDate
        //         };
        //         $scope.textarea = {
        //             text: '姓名：' + res.data.userName + "\n" + '身份证：' + res.data.idCard + "\n" + '手机号：' + res.data.mobile
        //         };

        //         var time1 = bakData.begTime;
        //         var time2 = bakData.endTime;



        //         // 开始毫秒
        //         var begYear = time1.substring(0, time1.indexOf('-'));
        //         var begMonth = time1.substring(5, time1.lastIndexOf('-'));
        //         console.log(begMonth)
        //         var begDay = time1.substring(time1.length, time1.lastIndexOf('-') + 1);
        //         var begSec = Date.parse(begMonth + '/' + begDay + '/' + begYear);

        //         // 结束毫秒
        //         var endYear = time2.substring(0, time2.indexOf('-'));
        //         var endMonth = time2.substring(5, time2.lastIndexOf('-'));
        //         var endDay = time2.substring(time2.length, time2.lastIndexOf('-') + 1);
        //         var endSec = Date.parse(endMonth + '/' + endDay + '/' + endYear);

        //         // 每天毫秒
        //         var daySec = 86400000;

        //         //总共天数
        //         var dateNum = dateBetween(time1, time2);

        //         // 时间范围数组
        //         var dateArr = [];

        //         function pushArr(sec) {
        //             var newTime = new Date(sec);
        //             var y = newTime.getFullYear();
        //             var m = newTime.getMonth() < 10 ? '0' + (newTime.getMonth() + 1) : newTime.getMonth();
        //             var d = newTime.getDate() < 10 ? '0' + newTime.getDate() : newTime.getDate();
        //             y.toString();
        //             m.toString();
        //             d.toString();
        //             var newDay = y + '-' + m + '-' + d;
        //             dateArr.push(newDay);
        //         };

        //         // 每天的时间插入数组
        //         for (var i = 0; i <= dateNum; i++) {
        //             pushArr(begSec);
        //             begSec += daySec;
        //         };

        //         // 要显示的年份
        //         var showYear = [];
        //         if (begYear == endYear) {
        //             showYear.push(begYear);
        //         } else {
        //             for (var j = begYear; j <= endYear; j++) {
        //                 showYear = [];
        //                 showYear.push(j);
        //             };
        //         };

        //         // 要显示的月份
        //         var showMonth = [];
        //         // 时间跨年了
        //         if (showYear.length > 1) {
        //             for (var k = parseInt(begMonth); k <= endMonth; k++) {
        //                 if (k < 10) {
        //                     k = '0' + k;
        //                 } else {
        //                     k = k.toString();
        //                 };
        //                 showMonth.push(k);
        //             };
        //             for (var l = 1; l <= endMonth; l++) {
        //                 if (l < 10) {
        //                     l = '0' + l;
        //                 } else {
        //                     l = '' + l;
        //                 };
        //                 showMonth.push(l);
        //             }
        //         } else {
        //             // 未跨年
        //             for (var b = parseInt(begMonth); b <= endMonth; b++) {
        //                 if (b < 10) {
        //                     b = '0' + b;
        //                 } else {
        //                     b = '' + b;
        //                 };
        //                 showMonth.push(b);
        //             };
        //         };

        //         // 显示的日期
        //         var showDate = [];

        //         // // 2月显示的日期
        //         // var specDate = [];
        //         // // 判断闰年算法
        //         // function isLeapYear(year) {
        //         //     return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
        //         // };

        //         // 正常月份显示的天数
        //         for (var h = 1; h <= 31; h++) {
        //             if (h < 10) {
        //                 h = '0' + h;
        //             } else {
        //                 h = h.toString();
        //             };
        //             showDate.push(h);
        //         };



        //         // 当滑动到2月的时候显示特殊天数，其他时间显示正常天数
        //         // $scope.onChangeEnd = function() {
        //         //     febdayset();
        //         // }
        //         // var febdayset = function() {
        //         //     var isLeapYears = isLeapYear($scope.data1[$scope.swiper.swiper1.activeIndex]);
        //         //     var bigmouth = ["01", "03", "05", "07", "08", "10", "12"];
        //         //     var isbigdata = CurrentUserService.contains(bigmouth, $scope.data2[$scope.swiper.swiper2.activeIndex]);
        //         //     if (isbigdata) {
        //         //         $scope.day.data3 = ["31", "03", "05", "07", "08", "10", "12"];
        //         //     } else if (($scope.data1[$scope.swiper.swiper1.activeIndex] == "02") && isLeapYears) {
        //         //         $scope.day.data3 = ["2yue29", "03", "05", "07", "08", "10", "12"];
        //         //     } else if ($scope.data1[$scope.swiper.swiper1.activeIndex] == "02" && !isLeapYears) {
        //         //         $scope.day.data3 = ["2yue28", "03", "05", "07", "08", "10", "12"];
        //         //     } else {
        //         //         $scope.day.data3 = ["30", "03", "05", "07", "08", "10", "12"];
        //         //     }
        //         // }

        //         // 前台页面数据绑定
        //         $scope.data1 = showYear; // 年
        //         $scope.data2 = showMonth; // 月
        //         $scope.date3 = showDate; // 日
        //         // $scope.day = { data3: showDate } // 日
        //         // febdayset();
        //         $scope.data4 = ["上午", "下午"];

        //         $scope.choseTime1 = function(formName) {

        //             var yearSent = $scope.data1[$scope.swiper.swiper1.activeIndex];
        //             var monthSent = $scope.data2[$scope.swiper.swiper2.activeIndex];
        //             var daySent = $scope.day.data3[$scope.swiper.swiper3.activeIndex];
        //             var noonSent = $scope.data4[$scope.swiper.swiper4.activeIndex];

        //             // 拼接时间
        //             var timeSent = yearSent.toString() + '-' + monthSent.toString() + '-' + daySent.toString();
        //             console.log(timeSent);
        //             // 判断时间是否合法
        //             var timevalid = CurrentUserService.contains(dateArr, timeSent);
        //             if (timevalid) { //ffxiugai
        //                 // if (true) {
        //                 var choseT = {
        //                     timePush: timeSent,
        //                     noonPush: noonSent
        //                 };
        //                 // 改接口名称
        //                 // /communityArea/appointDetail/{id}/{date}/{amorpm}
        //                 $http.get("/communityArea/appointDetail/" + res.data.id + "/" + timeSent + "/" + $scope.swiper.swiper4.activeIndex).then(function(back) {
        //                     deliveryTime = timeSent;
        //                     var alertPopup = $ionicPopup.alert({
        //                         title: "提交信息成功",
        //                         okText: '确认',
        //                     });
        //                     alertPopup.then(function(back) {
        //                         formName.$submitted = false;
        //                         $scope.closeModal();
        //                         $scope.showRes();
        //                         // 微信关闭方法
        //                         // wx.closeWindow();
        //                     });
        //                 }, function(msg) {
        //                     var alertPopup = $ionicPopup.alert({
        //                         title: "提交信息失败",
        //                         okText: '确认'
        //                     });
        //                     alertPopup.then(function(back) {
        //                         formName.$submitted = false;
        //                     });
        //                 });
        //             } else {
        //                 var timePopup = $ionicPopup.alert({
        //                     title: "时间选择不合法，请重新选择",
        //                     okText: '确认',
        //                 });
        //             };
        //         };
        //         $ionicModal.fromTemplateUrl('appointment/modal/modal.tpl.html', {
        //             scope: $scope,
        //             backdropClickToClose: false,
        //             hardwareBackButtonClose: false,
        //             animation: 'slide-in-right'
        //         }).then(function(modal) {
        //             $scope.modal = modal;
        //             $scope.modal.show();
        //         });
        //     }, function() {

        //     })

        // };

        // // 关闭模态框方法  lzl
        // $scope.closeModal = function() {
        //     //  $scope.modal.hide();
        //     $scope.modal.remove();
        // };

        // 计算页面高度逻辑  lzl
        // $scope.$watch($scope.)
        // $scope.showMain=false;

        // $scope.resize = function() {
        //     // $scope.showMain=!$scope.showMain;
        //     $ionicScrollDelegate.resize();
        // };

        // 取消预约提示方法  lzl
        // $scope.showConfirm = function(k) {
        //     // var item=$scope.data.myActivity[k];
        //     var confirmPopup = $ionicPopup.confirm({
        //         title: '温馨提示',
        //         template: '预定前24小时内将不能取消预约',
        //         cancelText: '返回',
        //         cancelType: 'button-energized',
        //         okText: '确认取消',
        //         okType: 'button-light'
        //     });
        //     confirmPopup.then(function(res) {
        //         if (res) {
        //             $http.get('/communityArea/appointDetailClose/' + 'a');
        //             $scope.showInit();
        //         } else {
        //             console.log('You are sure');
        //         }
        //     });
        //     $scope.$on('$ionicView.beforeLeave', function() {
        //         confirmPopup.close();
        //     })
        // };


        // lzl
        // $scope.pageShow = {
        //     page1: true,
        //     page2: false,
        //     pages3: false
        // };


        // $scope.showRes = function() {
        //     $scope.pageShow = {
        //         page1: false,
        //         page2: true,
        //         pages3: false
        //     };
        // }
        // $scope.showInit = function() {
        //     $scope.pageShow = {
        //         page1: true,
        //         page2: false,
        //         pages3: false
        //     };
        // }




        //修改预约 lzl
        // $scope.putRequest = function() {
        //     $http.put('/communityArea/appointDetail/' + 'a/2016-05-11/1');
        // }
    }
])