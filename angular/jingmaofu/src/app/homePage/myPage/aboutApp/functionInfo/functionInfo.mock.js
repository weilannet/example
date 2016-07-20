angular.module('jinmaofu.functionInfo.mock',[
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend','mocksData',function($httpBackend,mocksData) {
    
    var data = [
        '页面改版',
        '增加了报修、交付等功能模块'
    ]
    
    var result = mocksData.resetData(data);
    $httpBackend.whenGET('/getNewFunction').respond(result);

    $httpBackend.whenGET('/system/getappremark').passThrough();

}])
