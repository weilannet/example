angular.module('jinmaofu.myFavorite', [
    'ionic',
    'jinmaofu.myFavorite.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('mine/myFavorite', {
        url: '/mine/myFavorite',
        controller: 'myFavoriteController',
        templateUrl: 'homePage/myPage/myFavorite/myFavorite.tpl.html',
        authorizedRuleType: ['2', '3', '4']
    })
}])

.controller('myFavoriteController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams', '$state',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams, $state) {

        function getData() {
            $http.post('/user/getpersonalcollection').then(function(res) {
                console.log(res.data);
                $scope.favoriteList = res.data;
            }, function(err) {});
        }
        getData();
        // 删除个人收藏
        $scope.deleteFavorite = function(id, $event) {
                $event.stopPropagation();
                var obj = {
                    'id': id
                };
                $http.post('/user/deletecollection', obj).then(function(res) {
                    showMessage('取消收藏成功', '好');
                    getData();
                }, function(err) {
                    console.log('出错了');
                });
            }
            // 去详情页方法
        $scope.goPage = function(id, collectionID, $event, urlName) {
            $event.stopPropagation();
            $state.go(urlName, { 'detailidId': id });
        };
        // 添加个人收藏
        $scope.addFavorite = function(id, $event) {
            $event.stopPropagation();
            var obj = {
                'messageId': id,
                'messageType': '1'
            };
            $http.post('/user/addcollection', obj).then(function(res) {
                showMessage('收藏成功', '确定');
                getData();
            }, function(err) {
                console.log('出错了');
            });
        };
        // 提示消息
        var showMessage = function(template, okText) {
            var msgPopup = $ionicPopup.alert({
                template: template,
                okText: okText
            });
        }
    }
])