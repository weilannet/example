angular.module('jinmaofu.valueGoodsDetail02.mock', [
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {

    var data = {
        name: '尚茶坊',
        topPic: 'http://wxdemo2.maxrocky.com/images/head03.jpg',
        block: '朝阳区',
        type: '',
        telephone: '010-67770995',
        address: '3号楼3-1/3-2',
        contentText: '尚茶坊茶叶责任有限公司自2009年创建以来，一直以精工的品质和优秀的服务传承千年茶饮文化，打造中国健康茶饮高端品牌。'
    };

    var result = mocksData.resetData(data);
    $httpBackend.whenGET('/getValueGoodsDetail02').respond(result);



}])