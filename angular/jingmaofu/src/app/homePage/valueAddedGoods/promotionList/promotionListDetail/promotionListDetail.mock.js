angular.module('jinmaofu.promotionListDetail.mock',[
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend','mocksData',function($httpBackend,mocksData) {
    
    var data = {
        name: '刚记私房菜（金茂府店）',
        topPic: 'http://wxdemo2.maxrocky.com/images/valueGoodsDetailPic_03.png',
        block: '朝阳区',
        type: '家常菜',
        openTime: '6:30--22:00',
        area: '西单，金融街地区',
        address: '北京 西城区 金融街金城坊东街1号（西单，金融街地区）',
        recommond: '腊味煲仔饭 (22)  滋补养生火锅鸡 (22)  广式点心 (21) 海鲜桑拿 (17)  广式的烧味 (16)  刚记虾饺皇 (14) 干炒牛河 (13)花蛤 (9)  香芋菠萝包 (9)  扇贝 (8)  祥和刺身大拼牌 (6)  金针菇云耳蒸三黄 (6)',
        comment: [{
            pic: 'http://wxdemo2.maxrocky.com/images/valueGoodsDetailPic_07.png',
            text: '海底总动员，挺大的一盘子，下面垫了有花蛤，蛏子，皮皮虾，青虾，上面螃蟹，生蚝，扇贝'
        },{
            pic: 'http://wxdemo2.maxrocky.com/images/valueGoodsDetailPic_10.png',
            text: '海鲜桑拿'
        }]
    };
    
    var result = mocksData.resetData(data);
    $httpBackend.whenGET('/getValueGoodsDetail').respond(result);



}])
