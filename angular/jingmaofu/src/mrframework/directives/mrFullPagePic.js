angular.module('maxrocky.framework.directives.fullPagePic', [
    ])

.directive('mrFullImg', [function() {
    return {
        restrict: 'A',
        controller: function($scope, $element, $attrs) {
            var imgWidth =  window.screen.width;
            var imgHeight = window.screen.height-44;
             $attrs.ngSrc = $attrs.ngSrc + '@' + imgWidth + 'w_' + imgHeight + 'h_1e_1c_70q';
       },
    }
}])