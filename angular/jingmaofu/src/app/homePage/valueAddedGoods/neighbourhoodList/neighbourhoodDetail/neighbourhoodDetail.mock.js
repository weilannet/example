angular.module('jinmaofu.neighbourhoodDetail.mock', [
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    var data = {
        name: '昆泰酒店',
        topPic: 'http://wxdemo2.maxrocky.com/images/head07.jpg',
        block: '朝阳区',
        type: '',
        telephone: '4007558888',
        address: '北京朝阳区望京启阳路2号',
        contentText: '起源于法国，创立于1935年，2002年引进中国。定位于高端养生、美丽抗衰，是一家综合性健康管理、美丽定制的高端会所。'
    };


    var result = mocksData.resetData(data);
    $httpBackend.whenGET('/getNeighbourhoodDetail').respond(result);



}])