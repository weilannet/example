angular.module('jinmaofu.editingUserInfo.mock',[
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend','mocksData',function($httpBackend,mocksData) {
    
    

    // var result=mocksData.resetData(data);
    // $httpBackend.whenGET(/\/editingUserInfo/).respond(result);

    $httpBackend.whenPOST('/user/changeuserinfo').passThrough();


}])
