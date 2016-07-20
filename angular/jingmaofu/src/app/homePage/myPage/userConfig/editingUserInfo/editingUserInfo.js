angular.module('jinmaofu.editingUserInfo', [
    'ionic',
    'jinmaofu.editingUserInfo.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('editingUserInfo', {
        url: '/editingUserInfo',
        controller: 'editingUserInfoController',
        templateUrl: 'homePage/myPage/userConfig/editingUserInfo/editingUserInfo.tpl.html',
        cache: false,
        authorizedRuleType: ['2', '3', '4']
    })
}])

.controller('editingUserInfoController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams', '$state', 'CurrentUserService', 'MrActionSheet', 'MrImagePicker', 'MrCamera', '$ionicHistory',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams, $state, CurrentUserService, MrActionSheet, MrImagePicker, MrCamera, $ionicHistory) {
        $scope.data = {
            'imageList': []
        };
        $scope.userInfo = {
            'nickName': CurrentUserService.userSession().userInfoData.nickName,
            'userId': CurrentUserService.userSession().userInfoData.token,
            'logo': CurrentUserService.userSession().userInfoData.logo,
            'realName': CurrentUserService.userSession().userInfoData.realName,
            'mobile': Number(CurrentUserService.userSession().userInfoData.mobile),
            'sex': (CurrentUserService.userSession().userInfoData.sex == '1' ? '男' : '女').toString(),
            'idCard': CurrentUserService.userSession().userInfoData.idCard,
            'birthday': CurrentUserService.userSession().userInfoData.birthday
        };
        // 修改信息方法
        $scope.modifyPersonalInfo = function() {
            var params = {
                'userId': CurrentUserService.userSession().userInfoData.token,
                'logo': $scope.userInfo.logo,
                'realName': $scope.userInfo.realName,
                'nickName': $scope.userInfo.nickName,
                'mobile': $scope.userInfo.mobile.toString(),
                'sex': ($scope.userInfo.sex == '男' ? '1' : '2').toString(),
                'idCard': CurrentUserService.userSession().userInfoData.idCard,
                'birthday': CurrentUserService.userSession().userInfoData.birthday
            };
            if ($scope.userInfo.sex == '男' || $scope.userInfo.sex == '女' || $scope.userInfo.sex == '') {
                console.log(params);
                $http.post('/user/changeuserinfo', params).then(function(res) {
                    console.log(res);
                    CurrentUserService.updateSession(res.data);
                    showConfirm('修改成功', '确定', 2);
                }, function(err) {
                    // showConfirm('请检查输入信息', '确定', 1);
                    showConfirm(err.data + '失败', '确定', 1);
                });
            } else {
                showConfirm('请输入正确的性别', '确定', 1);
            }

        }

        //更新Session
        var updateSession = function(sessionData) {
            var validTime = parseInt($filter('date')(new Date(), 'yyyyMMdd')) + 2;
            Session.create(sessionData, validTime);
        }

        $scope.setSex = function(sex) {
            alert(sex);
        }

        //修改头像
        $scope.addAttachment = function() {
            // takePicture();
            MrActionSheet.show({
                buttons: [
                    { text: '相机' },
                    { text: '相册' }
                ],
                cancelText: '取消',
                cancel: function() {
                    return true;
                },
                buttonClicked: function(index) {
                    switch (index) {
                        case 0:
                            takePicture();
                            break;
                        case 1:
                            pickImage();
                            break;
                        default:
                            break;
                    }
                    return true;
                }
            });
        }
        var takePicture = function() {
            var options = {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 200,
                targetHeight: 200,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true,
                correctOrientation: true
            };
            MrCamera.getPicture(options).then(function(imageData) {
                var imageUrl = "data:image/jpg;base64*" + imageData;
                postPicture(imageUrl);
            }, function(err) {});
        };
        var pickImage = function() {
            var options = {
                maximumImagesCount: 1,
                width: 200,
                height: 200,
                quality: 100
            };
            MrImagePicker.getPictures(options).then(
                function(results) {
                    for (var i = 0; i < results.length; i++) {
                        var image = results[i];
                    };
                    if (results.length > 0) {
                        convertToDataStream(results);
                    };
                },
                function(error) {
                    console.log(error);
                });
        };
        var convertToDataStream = function(picturesUrl) {
            MRBase64Image.convertToDataStream(successCallback, errorCallback, picturesUrl);

            function successCallback(content) {
                var dataArray = new Array();
                for (var i = 0; i < content.length; i++) {
                    var fullFile = "data:image/jpg;base64*" + content[i];
                    dataArray.push(fullFile);
                }
                if (content.length > 0) {
                    postPicture(dataArray[0]);
                };
            }

            function errorCallback(message) {}
        };
        var showConfirm = function(template, okText, num) {
            var confirmPopup = $ionicPopup.alert({
                template: template,
                okText: okText
            });
            confirmPopup.then(function(res) {
                if (res && num == 2) {
                    $ionicHistory.clearCache().then(function() {
                        $ionicHistory.goBack();
                    });
                }
            });
        };
        /*上传图片*/
        var postPicture = function(images) {
            var imageDataArray = [];
            imageDataArray[0] = images;
            var pictureParams = {
                "uploadFile": imageDataArray,
                "imageType": "2"
            };
            $http.post('/upload/uploadImage', pictureParams).then(function(result) {
                $scope.userInfo.logo = result.data[0].imgUrl;
            }, function(msg) {});
        }
    }
])