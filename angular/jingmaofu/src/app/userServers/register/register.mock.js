angular.module('jinmaofu.register.mock',[
  	'ngMockE2E','jinmaofu.common.mocksData'
])

.run(['$httpBackend','mocksData',function($httpBackend,mocksData) {

  $httpBackend.whenPOST(/\/user\/appadduser(\s\S)?/).passThrough();
  $httpBackend.whenPOST(/\/sms\/authCode(\s\S)?/).passThrough();
}])

