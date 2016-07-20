angular.module('jinmaofu.aboutApp.mock',[
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend','mocksData',function($httpBackend,mocksData) {
    

    // var result=mocksData.resetData(data);
    // $httpBackend.whenGET(/\/aboutApp\/(\s\S)?/).respond(result);




}])
