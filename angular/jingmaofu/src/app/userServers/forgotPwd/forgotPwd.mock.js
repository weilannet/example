angular.module('jinmaofu.forgotPwd.mock',[
  	'ngMockE2E','jinmaofu.common.mocksData'
])

.run(['$httpBackend','mocksData',function($httpBackend,mocksData) {

  $httpBackend.whenPUT('/user/password').passThrough();
}])

