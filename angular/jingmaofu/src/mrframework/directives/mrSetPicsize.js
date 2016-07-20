angular.module('maxrocky.framework.directives.setPicSize', [])

.directive('mrSetPicsize', ['$filter', function($filter) {

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var ele = element[0];
            var scW = window.screen.width;
            var scH = window.screen.height;
            ele.setAttribute("style", "height:" + scH + "px!important" + "width:" + scW + "px!important" + "min-height:" + scH + "px!important" + "min-width:" + scW + "px!important" + "max-height:" + scH * 2 + "px!important" + "max-width:" + scW * 2 + "px!important");
        }

    };
}])
