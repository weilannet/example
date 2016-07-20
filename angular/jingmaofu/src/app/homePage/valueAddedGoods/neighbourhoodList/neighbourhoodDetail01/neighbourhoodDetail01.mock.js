angular.module('jinmaofu.neighbourhoodDetail01.mock', [
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {

    var data = {
        name: '华阳奥通',
        topPic: 'http://wxdemo2.maxrocky.com/images/head08.jpg',
        block: '朝阳区',
        type: '',
        telephone: '010-84930000',
        address: '朝阳区来广营乡顾家庄桥北300米路西',
        contentText: '北京奥迪世界项目是由吉林省华阳集团投资建设的中国最大的奥迪品牌体验园区。项目总占地面积48506平方米，总建筑面积100756平方米，其中地上建筑面积72760平方米，地下建筑面积27996平方米。项目总投资超过10亿元人民币。整个园区有奥迪城市展厅、 维修工厂、 一汽大众 - 奥迪培训中心、 五星级配套酒店及会议楼组成。 园区内设有首家中国奥迪品牌独立城市展厅。 包括新车展示、 销售接待、 二手车展示、 客户休息、 奥迪精英客户俱乐部及60个车位的二手车室外展区。'
    };


    var result = mocksData.resetData(data);
    $httpBackend.whenGET('/getNeighbourhoodDetail01').respond(result);

}])