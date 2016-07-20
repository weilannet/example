angular.module('jinmaofu.consumptionRecord.mock',[
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend','mocksData',function($httpBackend,mocksData) {
    
    var data = [{
        id: '111',
        dealTime: '2016-05-09  17:00:29',
        placeName: '北京金茂威斯汀酒店',
        price: '988'
    },{
        id: '222',
        dealTime: '2016-05-09  17:00:29',
        placeName: '北京金茂威斯汀酒店',
        price: '988'
    },
    {
        id: '333',
        dealTime: '2016-05-09  17:00:29',
        placeName: '北京金茂威斯汀酒店',
        price: '988'
    }];

    var result = mocksData.resetData(data);
    $httpBackend.whenGET('/getconsumptionRecord').respond(result);



}])
