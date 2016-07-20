angular.module('jinmaofu.userConfig.mock',[
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend','mocksData',function($httpBackend,mocksData) {
    
    var data = {
        id: '111',
        userType: '业主',
        userPic: '../../../../images/userConfiguserPic.png',
        realName: '郭佳',
        nickName: 'GL',
        phone: '18888888888',
        gender: '男',
        birthDate: '1990-10-01'
    }

    var result=mocksData.resetData(data);
    $httpBackend.whenGET(/\/getUserConfig/).respond(result);




}])
