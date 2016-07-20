angular.module('jinmaofu.jinmaoFloor.mock', [
    'ngMockE2E', 'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    var data = [{
        id: 'a',
        name: "亦庄•金茂悦",
        panoramaImg: "http://123.57.160.155:8081/images/loupan1.png",
        priceAverage: "42000元m²",
        phone: "010-56528888",
        typeList: [{ type: "科技住宅" }, { type: "公园地产" }],
        favorable: "15万抵20万"
    }, {
        id: 'b',
        name: "中欧国际城",
        panoramaImg: "http://123.57.160.155:8081/images/lb-zhongouguojicheng.jpg",
        priceAverage: "6800元/㎡",
        phone: "0532-55666677",
        typeList: [{ type: "国际绿金品质" }, { type: "文化城市运营" }, { type: "89-101㎡" }],
        favorable: null
    }, {
        id: 'c',
        name: "青岛金茂湾",
        panoramaImg: "http://123.57.160.155:8081/images/lb-qidaojinmaowan.jpg",
        priceAverage: "18000元m²",
        phone: "0532-66996666",
        typeList: [{ type: "绿色人居" }, { type: "高端生活中心" }, { type: "86-140㎡" }],
        favorable: "暖春购房季10万优惠，全款再减5000元"
    }, {
        id: 'c',
        name: "亚奥•金茂悦",
        panoramaImg: "http://123.57.160.155:8081/images/lb-yaaojinmaoyue.jpg",
        priceAverage: null,
        phone: null,
        typeList: [{ type: "景山学区" }, { type: "改善典范" }],
        favorable: null
    }, {
        id: 'c',
        name: "广渠•金茂府",
        panoramaImg: "http://123.57.160.155:8081/images/lb-wangjingjinmaofu.jpg",
        priceAverage: "120000元m²",
        phone: "010-56528888",
        typeList: [{ type: "邻近地铁" }, { type: "周边配套成熟" }],
        favorable: null
    }, {
        id: 'c',
        name: "望京•金茂府",
        panoramaImg: "http://123.57.160.155:8081/images/lb-wangjingjinmaofu.jpg",
        priceAverage: "48000元m²",
        phone: "010-84998888",
        typeList: [{ type: "临近14号线" }, { type: "高端住宅" }],
        favorable: null
    }]
    var result = mocksData.resetData(data);

    $httpBackend.whenGET(/\/sharingActivity2\/info\/(\s\S)?/).respond(result);
    $httpBackend.whenGET(/\/communityArea\/communitys/).passThrough();
}])