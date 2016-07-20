angular.module('jinmaofu.valueGoodsDetail04.mock', [
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {

    var data = {
        name: '瑞泰口腔',
        topPic: 'http://wxdemo2.maxrocky.com/images/head05.jpg',
        block: '朝阳区',
        type: '',
        telephone: '010-87661838',
        address: '7号楼7-7',
        contentText: '致力于为中产阶层提供专业的口腔医疗服务，整合了北大口腔医院、北京口腔医院等优质专家资源，可开展常规口腔外科手术，并有笑气辅助下舒适洁牙，儿童全麻下口腔治疗等诊疗项目。'
    };

    var result = mocksData.resetData(data);
    $httpBackend.whenGET('/getValueGoodsDetail04').respond(result);



}])