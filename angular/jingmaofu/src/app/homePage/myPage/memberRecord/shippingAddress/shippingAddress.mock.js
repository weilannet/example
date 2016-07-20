angular.module('jinmaofu.shippingAddress.mock',[
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend','mocksData',function($httpBackend,mocksData) {
    
    var data = [{
        id: '111',
        userName: '郭佳',
        userPhone: '18888888888',
        address: '北京市西城区中化大厦9楼',
    },{
        id: '222',
        userName: '马强',
        userPhone: '17777777777',
        address: '北京市西城区中化大厦9楼',
    }];

    
    var result = mocksData.resetData(data);
    $httpBackend.whenGET('/getShippingAddress').respond(result);



}])
