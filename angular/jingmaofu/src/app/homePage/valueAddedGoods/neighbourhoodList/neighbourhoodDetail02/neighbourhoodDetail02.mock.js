angular.module('jinmaofu.neighbourhoodDetail02.mock',[
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend','mocksData',function($httpBackend,mocksData) {
    
   var data = {
        name: '明德医院',
        topPic: 'http://wxdemo2.maxrocky.com/images/head09.jpg',
        block: '朝阳区',
        type: '',
        telephone: '010-59850499',
        address: '北京市朝阳区酒仙桥北路9号',
        contentText: '北京明德医院是一家综合全科服务型国际医院旨在为来自海内外人士提供不同于以往的极致、专业可信赖的医疗服务。国际化的医疗团队致力于提供最安全，最高效的就医体验。北京明德医院涵盖内，外，妇，儿科等三十余个科室并提供住院与门诊服务。医院按照JCI国际医院评鉴标准，建设有先进的急诊室、重症监护病房、新生儿监护病房、手术室及舒适的私人病房。实现高质量医疗效果和一站式贴心的服务。'
    };

    
    var result = mocksData.resetData(data);
    $httpBackend.whenGET('/getNeighbourhoodDetail02').respond(result);



}])
