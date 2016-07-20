angular.module('maxrocky.framework.directives.fullPage', [
])

.directive('mrFullPage', [function() {
    return {
        restrict: 'C',
        controller: function($scope, $element, $attrs, remData) {
            var p = window.screen.height-44;
            $element[0].setAttribute("style", "Height:" + p + "px!important");
        }
    };
}])