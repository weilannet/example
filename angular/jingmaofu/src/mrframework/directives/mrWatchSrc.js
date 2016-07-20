angular.module('maxrocky.framework.directives.watchSrc',[
])

.directive('mrWatchSrc',['$filter', function($filter){

    return {
        restrict:'A',

        controller: function($scope, $element, $attrs){
            alert('222');
            var ele = $element[0];
            var eleSrc = ele.getAttribute('ng-src');
            $scope.$watch('ngSrc',function(newValue,oldValue,scope){
                ele.setAttribute('ng-scr',newValue);
                alert('111');
            });
        }
    }
}])