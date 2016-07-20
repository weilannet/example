angular.module('jinmaofu.butlerPage.mock', [
        'ngMockE2E',
        'jinmaofu.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        
        // var result1 = mocksData.resetData(data1);
        // $httpBackend.whenGET('/butlerPage/communityMsg/1').respond(result1);
        // var result2 = mocksData.resetData(data2);
        // $httpBackend.whenGET('/butlerPage/communityMsg/2').respond(result2);
    }])
