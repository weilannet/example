angular.module('maxrocky.framework.directives.rem', [
    'maxrocky.framework.servers.rem'
])

.directive('mrRem', [function() {
    return {
        restrict: 'A',
        controller: function($scope, $element, $attrs, remData) {
            var _size = 50;
            var p = (document.body && document
                .body.clientWidth || $element[0].offsetWidth) / 375;
            _size = p * 50;
            remData.setRemData(_size);
            $element[0].setAttribute("style", "font-size:" + _size + "px!important");
        }
    };
}])