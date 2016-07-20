angular.module('maxrocky.framework.directives.title', [])

.directive('mrTitle', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
           document.getElementsByTagName('title')[0].text=attrs.mrTitle;
        }
    };
}])