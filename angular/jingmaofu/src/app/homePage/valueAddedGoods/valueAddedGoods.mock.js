angular.module('jinmaofu.valueAddedGoods.mock', [
        'ngMockE2E',
        'jinmaofu.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {

        
        // var result1 = mocksData.resetData(data1);
        // $httpBackend.whenGET('/homePage/communityMsg/1').respond(result1);
        // var result2 = mocksData.resetData(data2);
        // $httpBackend.whenGET('/homePage/communityMsg/2').respond(result2);
    }])
