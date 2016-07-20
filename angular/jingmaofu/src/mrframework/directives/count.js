angular.module('maxrocky.framework.directives.count',[
])

.directive('mrCount',['$parse', '$filter', function($parse, $filter){

	return {
		restrict:'C',
		scope:{
			width:"=",
			dataStatistics:"="
		},
		link: function(scope, element, attrs){
			var num = Math.round(Math.random()*6+1);
            var pst=attrs.numw*100/attrs.maxw;
            if (pst<5) {
            	pst = 5;
            }else if(pst>100){
            	pst = 100;
            };
            // element.addClass('color'+num);
            if(num == 1) {
                num = 'red';
            }else if (num == 2) {
                num = 'orange';
            }else if (num == 3) {
                num = 'yellow';
            }else if (num == 4) {
                num = 'lightgreen';
            }else if (num == 5) {
                num = 'lightblue';
            }else if (num == 6) {
                num = 'lightgreen';
            }else {
                num = 'purple';
            };
            element[0].setAttribute('style','background-color:'+num);
			element.css('width',pst+'%');
		}

	};
}])