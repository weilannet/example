angular.module('jinmaofu.communityNews', [
    'ionic',
    'jinmaofu.communityNews.mock',
    'jinmaofu.communityNewsDetail',
    'jinmaofu.votePage'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('butlerPage/communityNews', {
        url: '/butlerPage/communityNews',
        controller: 'communityNewsController',
        templateUrl: 'homePage/butlerPage/communityNews/communityNews.tpl.html',
        cache: false,
        authorizedRuleType: ['1', '2', '3', '4']
    })
}])

.controller('communityNewsController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams', 'transferParams', '$state', 'CurrentUserService',
        function(pageInitService, $scope, $http, $ionicPopup, $stateParams, transferParams, $state, CurrentUserService) {

            $scope.tourists = CurrentUserService.userSession().userInfoData.userType;

            function getData() {
                if (transferParams.params != null) {
                    $http.post('/user/getpropertyannouncement', { 'houseProjectId': transferParams.params.pinyinCode }).then(function(res) {
                        console.log(res.data)
                        $scope.communityAnnounce = res.data;
                    }, function(err) {});
                }
            }
            getData();
            // 去详情页方法
            $scope.goPage = function(id, collectionID, $event, urlName) {
                $event.stopPropagation();
                $state.go(urlName, { 'detailidId': id, 'userType': $scope.tourists });
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
                // 提示消息
            var showMessage = function(template, okText) {
                var msgPopup = $ionicPopup.alert({
                    template: template,
                    okText: okText
                });
            };
        }
    ])
    .filter('characters', function() {
        return function(input, chars, breakOnWord) {
            if (isNaN(chars)) return input;
            if (chars <= 0) return '';
            if (input && input.length > chars) {
                input = input.substring(0, chars);

                if (!breakOnWord) {
                    var lastspace = input.lastIndexOf(' ');
                    //get last space
                    if (lastspace !== -1) {
                        input = input.substr(0, lastspace);
                    }
                } else {
                    while (input.charAt(input.length - 1) === ' ') {
                        input = input.substr(0, input.length - 1);
                    }
                }
                return input + '…';
            }
            return input;
        };
    });