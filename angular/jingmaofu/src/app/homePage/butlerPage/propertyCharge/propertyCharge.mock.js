angular.module('jinmaofu.propertyCharge.mock',[
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend','mocksData',function($httpBackend,mocksData) {
    
    var data = [{
        id: '111',
        feeType: '物业费',
        address: '亦庄金茂悦南区2号楼1108',
        feeDetail: '2016年4-6月份 物业管理费',
        amount: '208.11'
    },{
        id: '222',
        feeType: '供暖费',
        address: '亦庄金茂悦南区2号楼1108',
        feeDetail: '2016年4-6月份 供暖费费',
        amount: '998.11'
    }]
    
    var result = mocksData.resetData(data);
    $httpBackend.whenGET('/getPorpertyCharge').respond(result);



}])
