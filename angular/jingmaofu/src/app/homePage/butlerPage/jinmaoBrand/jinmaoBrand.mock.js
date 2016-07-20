angular.module('jinmaofu.jinmaoBrand.mock', [
    'ngMockE2E', 'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    // var data = {
    //     bannerimg: {
    //         id: 1,
    //         url: "http://123.57.160.155:8081/images/jinmaopinpai2.png",
    //     },
    //     imglist: [{
    //         id: 2,
    //         imgurl: "http://123.57.160.155:8081/images/pinpai2.png",
    //         title: "三盘三冠王",
    //     }, {
    //         id:3,
    //         imgurl: "http://123.57.160.155:8081/images/pinpai3.png",
    //         title: "穆如清风系列活动",
    //     }],
    //     newList: [{
    //         id:4,
    //         imgurl: "http://123.57.160.155:8081/images/pinpai4.png",
    //         title: "方兴地产正式更名中国金茂 对外宣布进行战略升级",
    //         href: "/#/newsDetail/123",
    //         time: "2015-10-14",
    //         content: "10月14日，方兴地产（中国）有限公司（以下简称“方兴地产”）在北京金茂万丽酒店召开发布会，宣布公司正式更名为“中国金茂控股集团有限公司”"
    //     }, {
    //         id: 4,
    //         imgurl: null,
    //         title: "金茂北京亚奥金茂悦项目开展“春之礼——健康游”业主春游活动",
    //         href: "/#/newsDetail/123",
    //         time: "2016-03-24",
    //         content: "3月24日清晨，阳光和煦，空气沁人，亚奥金茂悦业主们参加公司携手金茂物业联合举办的“春之礼健康游”活动。"
    //     }, {
    //         id: 4,
    //         imgurl: "http://123.57.160.155:8081/images/pinpai4.png",
    //         //title:"方兴地产正式更名中国金茂 对外宣布进行战略升级",
    //         title: "公司与中国民生银行举行战略合作协议签署仪式",
    //         href: "/#/newsDetail/123",
    //         time: "2015-10-14",
    //         content: "中国金茂与中国民生银行在北京金茂万丽酒店战略合作签约仪式"
    //     }, {
    //         id: 4,
    //         imgurl: null,
    //         title: "金茂北京亚奥金茂悦项目开展“春之礼——健康游”业主春游活动",
    //         href: "/#/newsDetail/123",
    //         time: "2016-03-24",
    //         content: "3月24日清晨，阳光和煦，空气沁人，亚奥金茂悦业主们参加公司携手金茂物业联合举办的“春之礼健康游”活动。"
    //     }]
    // };

    // 周一假演示假数据
    // var data = {
    //     bannerimg: {
    //         id: 1,
    //         url: "http://123.57.160.155:8081/images/pinpai1.png"
    //     },
    //     imglist: [{
    //         id: 2,
    //         imgurl: "http://123.57.160.155:8081/images/pinpai2.png",
    //         title: "三盘三冠王"
    //     }, {
    //         id: 3,
    //         imgurl: "http://123.57.160.155:8081/images/pinpai3.png",
    //         title: "穆如清风系列活动"
    //     }],
    //     newList: [{
    //         id: 4,
    //         imgurl: null,
    //         title: "金茂北京亚奥金茂悦项目开展“春之礼——健康游”业主春游活动",
    //         time: "2016-03-24",
    //         content: "3月24日清晨，阳光和煦，空气沁人，亚奥金茂悦业主们参加公司携手金茂物业联合举办的“春之礼健康游”活动。"
    //     }, {
    //         id: 4,
    //         imgurl: null,
    //         title: "极致奢宠 女王专属——亦庄·金茂悦浓情女人节浪漫落幕",
    //         time: "2016-03-08",
    //         content: "亦庄·金茂悦为纪念3.8妇女节,特别举办了三月女王节活动。"
    //     }, {
    //         id: 4,
    //         imgurl: null,
    //         title: "亦庄·金茂悦：元宵喜乐会精彩落幕",
    //         time: "2015-02-24",
    //         content: "2016亦庄·金茂悦元宵喜乐会的圆满落幕，如火如荼的雀圣争霸赛第三季也画上了圆满的符号。"
    //     }, {
    //         id: 4,
    //         imgurl: "http://123.57.160.155:8081/images/yizhuangjinmaoyuejiayan.jpg",
    //         title: "【“悦”到福到】金茂新春业主家宴感恩回馈季",
    //         time: "2015-02-18",
    //         content: "用新春洋溢的喜悦\n洒遍金茂的每一个角落\n用新春家宴的祝福妆点生活中的点点滴滴"
    //     }]
    // };
    //var data={"id":null,"title":null,"newsImg":null,"type":null,"operator":null,"operatorTimeString":null,"imgTitle":null,"overview":null,"comment":null,"imgList":[],"newsList":[]};


    //调接口
    //  var data = {
    //     newsImg: {
    //         id: null,
    //         url: "http://123.57.160.155:8081/images/pinpai1.png"
    //     },
    //     imglist: [{
    //         id: 'cd2',
    //         newsImg: "http://123.57.160.155:8081/images/pinpai2.png",
    //         imTtitle: "三盘三冠王"
    //     }, {
    //         id: 'cd3',
    //         newsImg: "http://123.57.160.155:8081/images/pinpai3.png",
    //         imTtitle: "穆如清风系列活动"
    //     }],
    //     newsList: [{
    //         id: 'ab',
    //         newsImg: null,
    //         newsTitle: "金茂北京亚奥金茂悦项目开展“春之礼——健康游”业主春游活动",
    //         imgTitle:'',
    //         operatorTime: "2016-03-24",
    //         overview: "3月24日清晨，阳光和煦，空气沁人，亚奥金茂悦业主们参加公司携手金茂物业联合举办的“春之礼健康游”活动。"
    //     }, {
    //         id: 4,
    //         newsImg: null,
    //         newsTitle: "极致奢宠 女王专属——亦庄·金茂悦浓情女人节浪漫落幕",
    //         imgTitle:'',
    //         operatorTime: "2016-03-08",
    //         overview: "亦庄·金茂悦为纪念3.8妇女节,特别举办了三月女王节活动。"
    //     }, {
    //         id: 4,
    //         newsImg: null,
    //         newsTitle: "亦庄·金茂悦：元宵喜乐会精彩落幕",
    //         imgTitle:'',
    //         operatorTime: "2015-02-24",
    //         overview: "2016亦庄·金茂悦元宵喜乐会的圆满落幕，如火如荼的雀圣争霸赛第三季也画上了圆满的符号。"
    //     }, {
    //         id: 4,
    //         newsImg: "http://123.57.160.155:8081/images/yizhuangjinmaoyuejiayan.jpg",
    //         newsTitle: "【“悦”到福到】金茂新春业主家宴感恩回馈季",
    //         imgTitle:'',
    //         operatorTime: "2015-02-18",
    //         overview: "用新春洋溢的喜悦\n洒遍金茂的每一个角落"
    //     }]
    // };
    // var result = mocksData.resetData(data);

    // $httpBackend.whenGET(/\/sharingActivity1\/info\/(\s\S)?/).respond(result);
    $httpBackend.whenGET(/\/communityArea\/news/).passThrough();
    $httpBackend.whenGET('http://as.chinajinmao.cn/api/communityArea/news').passThrough();


}])