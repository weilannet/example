angular.module('jinmaofu.neighbourhoodDetail03.mock', [
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {

    var data = {
        name: '新世纪幼儿医院',
        topPic: 'http://wxdemo2.maxrocky.com/images/head10.jpg',
        block: '朝阳区',
        type: '',
        telephone: '010-51783366',
        address: '北京市朝阳区望京北路51号院',
        contentText: '北京新世纪妇儿医院是一家依照国际医疗标准建立并运营的妇儿医院，医院拥有顶级医疗专家和护理团队，为现代女性和儿童提供现代化、全方位、高品质的儿科、产科、妇科和内科等医疗保健服务。医院拥有儿科病房46间，妇产科病房33间，待产室5间，新生儿病床8张。地处公园内，环境优美宜人。'
    };


    var result = mocksData.resetData(data);
    $httpBackend.whenGET('/getNeighbourhoodDetail03').respond(result);



}])