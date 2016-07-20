angular.module('jinmaofu.valueGoodsDetail01.mock', [
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {

    var data = {
        name: '乐旁松露',
        topPic: 'http://wxdemo2.maxrocky.com/images/head02.jpg',
        block: '朝阳区',
        type: '',
        telephone: '',
        address: '6号楼6-2',
        contentText: 'LEBON原名乐旁（中国大中华区注册名）、勒庞（法国、德法、美国、日本、拉美等地区命名）LEBON乐旁始源于法国南部的“骑士之城普罗旺斯，是全球规模最大的松露制品提供商。'
    };

    var result = mocksData.resetData(data);
    $httpBackend.whenGET('/getValueGoodsDetail01').respond(result);



}])