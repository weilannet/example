angular.module('jinmaofu.valueGoodsDetail05.mock', [
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {

    var data = {
        name: '桃睦佳',
        topPic: 'http://wxdemo2.maxrocky.com/images/head06.jpg',
        block: '朝阳区',
        type: '',
        telephone: '',
        address: '2号楼2-5/2-6',
        contentText: '通过将美国、德国、日本最近的高科技成果与传统中医健康管理手段相结合，强调优化健康，采用物理疗法和营养疗法，是最健康的健康管理手段。'
    };

    var result = mocksData.resetData(data);
    $httpBackend.whenGET('/getValueGoodsDetail05').respond(result);



}])