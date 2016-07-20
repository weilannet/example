/**
 * Created by LiZhenlin on 2016/4/1.
 */
angular.module('jinmaofu.feedback', [
    'ionic',
    'jinmaofu.feedback.mock'
])

.config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('feedback', {
            url: '/feedback',
            controller: 'feedbackController',
            templateUrl: 'homePage/butlerPage/feedback/feedback.tpl.html',
            resolve: {
                userInfoData: ['$http', function($http) {
                    //     document.getElementsByTagName('title')[0].text = "意见反馈";
                    return $http.post('/user/getuserinfobyid', {});
                }],
                userHouseData: ['$http', function($http) {
                    return $http.get('/house/allHouse');
                }]
            },
            cache: false,
            authorizedRuleType: ['2', '3', '4']
        })
    }])
    .controller('feedbackController', ['$scope', '$http', '$ionicPopup', '$ionicHistory', 'pageInitService', '$ionicPopup', 'userHouseData', 'userInfoData',
        function($scope, $http, $ionicPopup, $ionicHistory, pageInitService, $ionicPopup, userHouseData, userInfoData) {

            // $scope.inputdata = {fb_content: '231313212313131321'};
            var data2 = null;
            // 权限判断
            console.log(userInfoData.data.userType);
            $scope.usertype = userInfoData.data.userType;

            // var userTP = $scope.usertype;


            // 暴露数据
            $scope.data = {
                houseList: userHouseData.data
            };

            // 反馈内容
            $scope.inputdata = {
                fb_content: ''
            };

            // 设置默认id
            if ($scope.data.houseList.length != 0) {
                $scope.defaultID = {
                    selectID: $scope.data.houseList[0].id
                };
            } else {
                $scope.defaultID = {
                    selectID: ''
                };
            };
            // 提交反馈
            $scope.feedBack2 = function(formName) {

                var data2 = {
                    type: '1',
                    projectId: $scope.defaultID.selectID,
                    content: $scope.inputdata.fb_content,
                };

                $http.post("/user/feedback", data2).then(function(res) {
                    var alertPopup = $ionicPopup.alert({
                        template: "已提交",
                        okText: '确认',
                    });
                    alertPopup.then(function(res) {
                        formName.$submitted = false;
                        // 微信关闭方法
                        $ionicHistory.goBack(-1);
                    });
                }, function(msg) {
                    var alertPopup = $ionicPopup.alert({
                        template: msg.data + '提交信息失败',
                        okText: '确认'
                    });
                    alertPopup.then(function(res) {
                        formName.$submitted = false;
                    });
                });
            };
        }
    ]);