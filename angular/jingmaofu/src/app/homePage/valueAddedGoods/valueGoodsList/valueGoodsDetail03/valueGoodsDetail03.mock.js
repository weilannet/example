angular.module('jinmaofu.valueGoodsDetail03.mock', [
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {

    var data = {
        name: '吴裕泰',
        topPic: 'http://wxdemo2.maxrocky.com/images/head04.jpg',
        block: '朝阳区',
        type: '',
        telephone: '010-67723282',
        address: '6号楼6-8',
        contentText: '京吴裕泰茶业股份有限公司是销售茶叶、茶具以及茶衍生品的专业公司，至今已有120余年的历史。“吴裕泰”品牌被国家商务部首批认定为“中华老字号”。'
    };

    var result = mocksData.resetData(data);
    $httpBackend.whenGET('/getValueGoodsDetail03').respond(result);



}])