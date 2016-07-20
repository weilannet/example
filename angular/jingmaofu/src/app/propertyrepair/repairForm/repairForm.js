angular.module('jinmaofu.repairForm', [
        'ionic', 'jinmaofu.repairForm.mock', 'mr.common.cordova'
    ])
    .config(['$stateProvider', function($stateProvider) {
        //$routeProvider.when('/test2',{templateUrl:'test2/test2.tpl.html'});
        $stateProvider.state('propertrepairform', {
            url: '/propertyrepair',
            controller: 'RepairFormController',
            templateUrl: 'propertyrepair/repairForm/repairForm.tpl.html',
            cache: true,
            authorizedRuleType: ['3', '4']
        })

    }])

.controller('RepairFormController', ['CurrentUserService', 'pageInitService', '$state', '$scope', '$http', '$ionicListDelegate', '$ionicPopup', '$ionicHistory', 'MrActionSheet', 'MrImagePicker', 'MrCamera',

    function(CurrentUserService, pageInitService, $state, $scope, $http, $ionicListDelegate, $ionicPopup, $ionicHistory, MrActionSheet, MrImagePicker, MrCamera) {

        var apis = ['/propertyRepair/weChatOwnerInfo']; //'/propertyRepair/weChatOwnerInfo'
        pageInitService.pageInit(apis).then(function(result) {
            console.log(result[0].data)
            $scope.data = {};
            $scope.data.houseData = result[0].data;
            $scope.data.userName = '';
            $scope.data.userPhone = '';
            $scope.default = {
                'defaultID': result[0].data[0].houseInfoId
            };
            //房屋的地址列表
            // $scope.houseData = result[0].data;
            // $scope.data.houseData = ['',''];
            // 显示图片数组
            $scope.data.descriptions = "";
            $scope.data.imageList = new Array();
            var passImageArray = new Array();
            var imagesCount = 3;
            var postImages = new Array();

            // 获取本地储存中的userName 和 userPhone
            if (localStorage.getItem('userName')) {
                $scope.data.userName = localStorage.getItem('userName');
                $scope.data.userPhone = localStorage.getItem('userPhone');
            };

            // 启动选择图片方法
            $scope.addAttachment = function() {
                if ($scope.data.imageList.length < 3) {
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
                                    // <span style="color:#ff0000;">pickImage();</span>
                                    break;
                                default:
                                    break;
                            }
                            return true;
                        }
                    });
                } else {
                    showAlert("最多可选择3张图片！", "确定", 2);
                }
            };

            // 相机照相方法
            var takePicture = function() {
                var options = {
                    quality: 100,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: true,
                    correctOrientation: true
                };
                MrCamera.getPicture(options).then(function(imageData) {
                    var imageUrl = "data:image/jpg;base64*" + imageData;
                    var contentUrl = "data:image/jpg;base64," + imageData;
                    var images = new Array();
                    var contentImages = new Array();
                    images[0] = imageUrl;
                    contentImages[0] = contentUrl;
                    showPictures(images, contentImages);
                }, function(err) {
                    // alert(err);
                });
            };

            // 相册选择图片方法
            var pickImage = function() {
                var options = {
                    maximumImagesCount: 3 - $scope.data.imageList.length,
                    width: 300,
                    height: 300,
                    quality: 100
                };
                MrImagePicker.getPictures(options).then(
                    function(results) {
                        if (results.length > 0) {
                            convertToDataStream(results);
                        };
                    },
                    function(error) {
                        console.log(error);
                    });
            };

            // 相机选择照片后转流方法
            var convertToDataStream = function(picturesUrl) {
                MRBase64Image.convertToDataStream(successCallback, errorCallback, picturesUrl);

                function successCallback(content) {
                    var dataArray = new Array();
                    var contentArray = new Array();
                    for (var i = 0; i < content.length; i++) {
                        var fullFile = "data:image/jpg;base64*" + content[i];
                        var contentFile = "data:image/jpg;base64," + content[i];
                        dataArray.push(fullFile);
                        contentArray.push(contentFile);
                    }
                    console.log(contentArray);
                    showPictures(dataArray, contentArray);
                };

                function errorCallback(message) {
                    showAlert(message, '确定', 2);
                };
            };
            // 显示图片方法
            // 因为所有图片都要经过显示方法，在此方法中加入最后上传图片数组
            var postImagesArr = [];
            var showPictures = function(images, imagesShow) {
                for (var i = 0; i < imagesShow.length; i++) {
                    $scope.data.imageList.push(imagesShow[i]);
                    passImageArray.push(images[i]);
                    // postImagesArr.push(imagesShow[i]);
                };
                $scope.$digest();
            };

            var pictureHandle = function(images) {
                postImages.splice(0, postImages.length);
                for (var i = 0; i < images.length; i++) {
                    var pictureUrl = { imageUrl: images[i].imgUrl };
                    postImages.push(pictureUrl);
                    // $scope.data.imageList.push(imagesShow[i]);
                    // subtractOne();
                }
                // $scope.$digest();
            };

            // alert显示方法
            var showAlert = function(template, okText, num) {
                var confirmPopup = $ionicPopup.alert({
                    template: template,
                    okText: okText
                });
                confirmPopup.then(function(res) {
                    if (res && num == 3) {
                        $ionicHistory.goBack();
                    }
                });
                confirmPopup.then(function(res) {
                    if (num == 1) {
                        $state.go("properthistoryrepair");
                    };
                });
            };

            var postPicture = function(params) {
                // for (var i = 0; i < images.length; i++) {
                var pictureParams = {
                    "uploadFile": passImageArray,
                    "imageType": "1"
                };
                if (passImageArray.length > 0) {
                    $http.post('/upload/uploadImage', pictureParams).then(function(result) {
                        pictureHandle(result.data);
                        startPost(params);
                    }, function(msg) {
                        showAlert("图片上传失败！", "确定", 2);
                    });
                } else {
                    startPost(params);
                }
                // }
            }

            // 提交报修方法
            $scope.postRepairForm = function(pstform) {
                if (window.localStorage) {
                    localStorage.setItem('userName', $scope.data.userName);
                    localStorage.setItem('userPhone', $scope.data.userPhone);
                };
                if ($scope.data.imageList.length != 0) {
                    // 有图片情况
                    //上传图片方法
                    // uploadImages(postImagesArr);
                    // 提交报修图片数组
                    // var postImgArr = [];
                    // for(var i = 0; i < backImgUrlArr.length; i++) {
                    //     var imgObj = {
                    //         imageUrl: backImgUrlArr[i]
                    //     };
                    //     postImgArr.push(imgObj);
                    // };

                    var param2 = {
                        type: '0',
                        content: $scope.data.descriptions,
                        roomId: $scope.default.defaultID,
                        userName: $scope.data.userName,
                        userPhone: $scope.data.userPhone,
                        imageList: postImages,
                    };
                    postPicture(param2);
                    // $http.post('/propertyRepair/repairs',param2).then(function(res){
                    //     showAlert('保修提交成功','好',1);
                    // },function(err){})
                } else {
                    // 无图片情况
                    var param2 = {
                        type: '0',
                        content: $scope.data.descriptions,
                        roomId: $scope.default.defaultID,
                        userName: $scope.data.userName,
                        userPhone: $scope.data.userPhone,
                        imageList: [],
                    };
                    $http.post('/propertyRepair/repairs', param2).then(function(res) {
                        showAlert('报修提交成功', '确定', 1);
                    }, function(err) {})
                }
            };

            var startPost = function(params) {
                $http.post('/propertyRepair/repairs', params).success(function(result) {
                    showAlert('报修内容提交成功！', '确定', 1);
                    // sendMsg = true;
                }).error(function(msg) {
                    showAlert(msg, '确定', 2);
                    sendMsg = true;
                });
            };

            $scope.deletePicture = function($index) {
                /*点击哪张图片，删除哪张图片*/
                showConfirmTwo("删除此图片？", "确定", "取消", $index);
            };
            var showConfirmTwo = function(template, leftText, rightText, index) {
                var confirmPopup = $ionicPopup.confirm({
                    template: template,
                    okText: leftText,
                    cancelText: rightText
                });
                confirmPopup.then(function(res) {
                    if (res) {
                        $scope.data.imageList.splice(index, 1);
                        postImages.splice(index, 1);
                        passImageArray.splice(index, 1);
                    }
                });
            };

            $scope.voiceHandle = function() {
                VoicePlugin.createVoiceButtonClick(successCallback, errorCallback, {});

                function successCallback(messageString) {
                    if (!!$scope.data.descriptions) {
                        $scope.data.descriptions = $scope.data.descriptions + messageString;
                        $scope.$digest();
                    } else {
                        $scope.data.descriptions = messageString;
                        $scope.$digest();
                    }
                }

                function errorCallback(message) {
                    showAlert(message, '确定', 2);
                }
            };
        });
    }
])