angular.module('jinmaofu.floorDetail.mock', [
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {

    var data = {
        sliderPic: [
            'http://wxdemo2.maxrocky.com/images/slider1.png',
            'http://wxdemo2.maxrocky.com/images/slider2.png',
            'http://wxdemo2.maxrocky.com/images/slider1.png',
            'http://wxdemo2.maxrocky.com/images/slider2.png',
            'http://wxdemo2.maxrocky.com/images/slider1.png',
            'http://wxdemo2.maxrocky.com/images/slider2.png',
        ],
        mainHousePic: [
            '../../../../images/huxingtu.png',
            '../../../../images/huxingtu.png',
            '../../../../images/huxingtu.png',
        ],
        projectIntro: '中欧国际城，踞拥青岛高新区，盛会红岛政务中心，直面5000亩亚洲最大的生态湿地公园。项目占地约2500亩，建面400万㎡，系世界500强中国金茂携行青岛又一造城力作.',
        otherSupply: '中欧国际城项目享有亚洲首个伊甸园项目，北京实验二小教育配套。',
        traffic: '城阳高新区火炬路57号'
    }

    var result = mocksData.resetData(data);
    $httpBackend.whenGET('/getFloorDetail').respond(result);



}])
