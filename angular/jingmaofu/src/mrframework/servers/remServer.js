angular.module('maxrocky.framework.servers.rem', [])

.service('remData', ['$location',function($location) {
	this.data = null;
    this.setRemData = function(data){
    	this.data = data;
    };

    this.domain = function(){
    	var locationHost = $location.$$host;
        return locationHost;
    };
  
    return this;
}])