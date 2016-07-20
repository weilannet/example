angular.module('jinmaofu.floorDetail.mock',[
  	'ngMockE2E','jinmaofu.common.mocksData'
])

.run(['$httpBackend','mocksData',function($httpBackend,mocksData) {
	
  $httpBackend.whenGET(/\/communityArea\/communityDetail(\s\S)?/).passThrough();
}])
