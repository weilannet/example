angular.module('jinmaofu.myHouse.houseDetail', [
    'jinmaofu.myHouse.houseDetail.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('houseDetail', {
        url: '/houseDetail/:id/:houseType',
        cache: false,
        controller: 'houseDetailController',
        templateUrl: 'homePage/myPage/myHouse/houseDetail/houseDetail.tpl.html',
        authorizedRuleType: ['3', '4']
    })
}])

.controller('houseDetailController', ['CurrentUserService', 'pageInitService', '$scope', '$http', '$stateParams', "$ionicModal", '$ionicPopup',
    function(CurrentUserService, pageInitService, $scope, $http, $stateParams, $ionicModal, $ionicPopup) {
        $scope.$on('$ionicView.beforeLeave', function() {
            $scope.modal.remove();
        })

        $scope.tourists = CurrentUserService.userSession().userInfoData.userType;

        var apis = [
            '/house/houseInfo/' + $stateParams.id,
            '/house/housemate/' + $stateParams.id
        ];

        $scope.defaultH = {
            code: $stateParams.houseType
        }

        pageInitService.pageInit(apis).then(function(result) {
            $scope.data = result[0].data;
            $scope.data2 = result[1].data;
        });
        $scope.houseMate = {
            name: "",
            idNum: "",
            phone: ""
        };
        $scope.defaultHouse = function() {
            $http.post('/house/defaultHouse', {
                id: $stateParams.id
            }).then(function(result) {
                showAlert('设置成功');
            }, function(result) {
                showAlert('请求失败');
            })
        };
        $scope.deleteHousemate = function(index) {
            showCommitConfirm('确定删除？', '取消', '确定', index);
        };
        var removePeople = function(index) {
            var item = $scope.data2[index];
            $http.post('/house/delHousemate', {
                id: $stateParams.id,
                userId: $scope.data2[index].userId
            }).success(function(result) {}).error(function(msg) {});
            $scope.data2.splice(index, 1);
        }

        $scope.frist = false;
        $scope.addMate = function() {
            if (!$scope.frist) {
                $scope.frist = true;
                if ($scope.data2.length <= 7) {
                    $http.post('/house/housemates', {
                        id: $stateParams.id,
                        name: $scope.houseMate.name,
                        phone: $scope.houseMate.phone,
                        idCardNumber: $scope.houseMate.idNum

                    }).then(function(result) {
                        $http.get('/house/housemate/' + $stateParams.id).then(function(result) {
                            $scope.data2 = result.data;
                        }, function(result) {
                            showAlert('房屋使用人列表更新失败，请刷新再试');
                        })
                        $scope.frist = false;
                        $scope.modal.hide();
                        $scope.houseMate.name = '';
                        $scope.houseMate.phone = '';
                        $scope.houseMate.idNum = '';
                    }, function(result) {
                        $scope.frist = false;
                        showAlert(result.data);
                    });
                } else {
                    $scope.frist = false;
                    showAlert('很抱歉，该房下只能添加8位房屋使用人。');
                }
            }
        };
        $scope.goback = function() {
            $scope.modal.hide();
        };
        $ionicModal.fromTemplateUrl('homePage/myPage/myHouse/addHousemate/addHousemate.tpl.html', {
            scope: $scope,
            backdropClickToClose: false,
            hardwareBackButtonClose: false,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            var addPerson = $ionicPopup.alert({
                title: '温馨提示',
                template: '添加房屋使用人后，您的房屋信息、会员权益等将会对房屋使用人开放，若因此导致您的信息泄露或权益受损，我公司不承担责任，请您知悉。',
                okText: '确定',
                cancelText: '取消'
            }).then(function(res) {
                if (res) {
                    $scope.modal.show();
                };
            })
        };
        var showAlert = function(title) {
            var alertPopup = $ionicPopup.alert({
                template: title,
                okText: '确定',
                okType: 'button-energized'
            });
            alertPopup.then(function(res) {});
            $scope.$on('$ionicView.beforeLeave', function() {
                alertPopup.close();
            })
        }
        var showCommitConfirm = function(template, leftText, rightText, index) {
            var confirmPopup = $ionicPopup.confirm({
                template: template,
                okText: rightText,
                cancelText: leftText
            });
            confirmPopup.then(function(res) {
                if (res) {
                    removePeople(index);
                }
            });
        };
    }
])