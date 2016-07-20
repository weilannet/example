angular.module('jinmaofu.personalInfo.mock', [
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {

    var data = {
        id: '111',
        num: '3',
        latestTime: '2015-03-01'
    };

    var result = mocksData.resetData(data);
    $httpBackend.whenGET(/\/repairInfo/).respond(result);

    var data1 = {
        id: '222',
        num: '2',
        latestTime: '2015-04-01'
    };

    var result1 = mocksData.resetData(data1);
    $httpBackend.whenGET(/\/chargeInfo/).respond(result1);

    var data = {
        id: '333',
        latestTime: '2015-05-01'
    };

    var result = mocksData.resetData(data);
    $httpBackend.whenGET(/\/activityInfo/).respond(result);

    var data = {
        id: '444',
        latestTime: '2015-06-01'
    };

    var result = mocksData.resetData(data);
    $httpBackend.whenGET(/\/deliveryInfo/).respond(result);
    $httpBackend.whenPOST('/user/getpersonalmessage').passThrough();


}])