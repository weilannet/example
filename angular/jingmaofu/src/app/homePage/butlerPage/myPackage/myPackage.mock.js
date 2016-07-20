angular.module('jinmaofu.myPackage.mock',[
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend','mocksData',function($httpBackend,mocksData) {
    
    
    // var result = mocksData.resetData(data);
    // $httpBackend.whenGET('/getNewFunction').respond(result);



}])
