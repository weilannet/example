angular.module('jinmaofu.repairPrice.mock',[
    'ngMockE2E','jinmaofu.common.mocksData'
])

.run(['$httpBackend','mocksData',function($httpBackend,mocksData) {
    

  $httpBackend.whenGET(/\/propertyRepair\/weChatRepairPrice\/(\s\S)?/).passThrough();
}])