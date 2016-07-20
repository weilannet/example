angular.module('jinmaofu.votePage', [
    'ionic',
    'jinmaofu.votePage.mock',
    'jinmaofu.voteDetail'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('votePage', {
        url: '/votePage/?:detailidId',
        controller: 'votePageController',
        templateUrl: 'homePage/butlerPage/communityNews/votePage/votePage.tpl.html',
        cache: false,
        authorizedRuleType: ['2', '3', '4']
    })
}])

.controller('votePageController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams', '$state', 'transferParams', 'SaveWordOrderIdService', 'CurrentUserService',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams, $state, transferParams, SaveWordOrderIdService, CurrentUserService) {
        $scope.tourists = CurrentUserService.userSession().userInfoData.token;
        // 获得投票信息
        $http.get('/vote/getVoteDetail/' + $stateParams.detailidId + '/' + transferParams.params.pinyinCode).then(function(res) {
            console.log($stateParams.announceInfo);
            $scope.voteData = res.data;
        }, function(err) {});

        // 投票方法
        $scope.postVote = function() {
            console.log(SaveWordOrderIdService.isEmpty($scope.workOrderArray));
            if (SaveWordOrderIdService.isEmpty($scope.workOrderArray)) {
                showMessage('请先选择再进行投票', '确定');
            } else {
                var params = {
                    'vestaToken': $stateParams.detailidId,
                    'announcementVoteIds': $scope.workOrderArray
                };
                $http.post('/vote/voteAction/', params).then(function(res) {
                    showMessage('投票成功！', '确定');
                    $scope.goVoteSummery();
                }, function(err) {
                    showMessage(err.data, '确定');
                });
            };
        };
        // 去投票详情页
        $scope.goVoteSummery = function() {
            $state.go('voteDetail', { 'announcementId': $stateParams.detailidId });
        };

        $scope.workOrderArray = [];
        $scope.addIdSingle = function(id) {
                $scope.workOrderArray[0] = id;
                console.log($scope.workOrderArray[0]);
            }
            //选择id数组多选
        $scope.addIDdouble = function(id) {
                if (SaveWordOrderIdService.containsBool($scope.workOrderArray, id)) {
                    $scope.workOrderArray.push(id);
                } else {
                    $scope.workOrderArray.splice(SaveWordOrderIdService.containsIndex($scope.workOrderArray, id), 1);
                };
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