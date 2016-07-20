angular.module('maxrocky.framework.directives.mrImgConvert', [
    'maxrocky.framework.servers.rem'
    ])

.directive('mrImgConvert', ['$filter', 'ApiBaseUrl',function($filter,ApiBaseUrl) {
    return {
        restrict: 'A',
        scope:{
            imgw: '=',
            imgh: '='
        },
        controller: function($scope, $element, $attrs,remData) {
            var _size = remData.data * 2;
            var imgWidth =  Math.ceil(_size * $scope.imgw);
            var imgHeight = Math.ceil(_size * $scope.imgh);
            var domainHost = remData.domain();
           //if (ApiBaseUrl=="http://lifeowner.wanda.cn/") {
             $attrs.ngSrc = $attrs.ngSrc + '@' + imgWidth + 'w_' + imgHeight + 'h_2e_70q';
           //};
       },
    }
}])