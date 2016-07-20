if (!isApp) {
    var module = angular.module('mr.common.cordova', [])
    module.factory('MrCamera', [function() {
        return {
            getPicture: function() {
                //alert("没有硬件");
            },
        };
    }])
    module.factory('MrImagePicker', [function() {
        return {
            getPictures: function() {
                //  alert("没有硬件");
            },
        };
    }])
    module.factory('MrActionSheet', [function() {
        return {
            show: function() {
                //alert("没有硬件");
            },
        };
    }])
    module.factory('MrDevice', [function() {
        return {
            getDevice: function() {
                // alert("没有硬件");
            },
        };
    }])
} else {
    var module = angular.module('mr.common.cordova', ['ngCordova'])
    module.factory('MrCamera', ['$cordovaCamera', function($cordovaCamera) {
        return $cordovaCamera;
    }])
    module.factory('MrImagePicker', ['$cordovaImagePicker', function($cordovaImagePicker) {
        return $cordovaImagePicker;
    }])
    module.factory('MrActionSheet', ['$ionicActionSheet', function($ionicActionSheet) {
        return $ionicActionSheet;
    }])
    module.factory('MrDevice', ['$cordovaDevice', function($cordovaDevice) {
        return $cordovaDevice;
    }])
}