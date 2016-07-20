angular.module('maxrocky.framework.directives.fadeInOut',[
])

.directive('mrFadeOut',['$filter', function($filter){

    return {
        restrict:'C',
        link: function(scope, element, attrs){
            var ele = element[0];
            ele.onclick= function(){
                ele.getElementsByClassName('circle')[0].setAttribute('class','circle fadeOut');
                var content = ele.getElementsByClassName('newCon');
                content[1].setAttribute('class','content newCon fadeIn');
                content[0].style.opacity = 1;
                content[1].style.opacity = 1;
            };
        }

    };
}])