angular.module('jinmaofu.homePage.mock', [
        'ngMockE2E',
        'jinmaofu.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {

        // 小区信息
        var data = [{
            id: '1',
            communityName: '北京广渠金茂府',
        }, {
            id: '2',
            communityName: '北京望京金茂府'
        }];
        var result = mocksData.resetData(data);
        $httpBackend.whenGET('/homePage/getHouseList').respond(result);

        // 小区详细信息
        var data1 = {
            id: '1',
            // 轮播图图片
            // sliderPic: [
            //     'http://wxdemo2.maxrocky.com/images/slider1.png',
            //     'http://wxdemo2.maxrocky.com/images/slider2.png',
            //     'http://wxdemo2.maxrocky.com/images/slider1.png',
            //     'http://wxdemo2.maxrocky.com/images/slider2.png',
            //     'http://wxdemo2.maxrocky.com/images/slider1.png',
            //     'http://wxdemo2.maxrocky.com/images/slider2.png',
            // ],
            // 新闻图片
            newsPic: 'http://wxdemo2.maxrocky.com/images/homePageNewsPic.png',
            // 小区相关信息
            misMsg1: {
                title: '物业报修进度更新',
                content: '北京广渠金茂府报修完成',
            },
            misMsg2: {
                title: '物业缴费提醒',
                content: '请于2015-12-10日前缴纳2016年物业费',
            },
            misMsg3: {
                title: '交付预约提醒',
                content: '北京广渠金茂府交付预约提醒',
            },
            propertyMsg: {
                title: '关于缴纳第一季度物业费的通知',
                content: '北京广渠金茂府物业缴费通知',
                readPic: ['http://wxdemo2.maxrocky.com/images/ppReadPic.png', 'http://wxdemo2.maxrocky.com/images/ppReadPic.png', 'http://wxdemo2.maxrocky.com/images/ppReadPic.png', 'http://wxdemo2.maxrocky.com/images/ppReadPic.png', 'http://wxdemo2.maxrocky.com/images/ppReadPic.png', ],
                readNum: '233',
                shareNum: '666',
                msgNum: '999',
            },
            lifeStyleMsg: [{
                id: '111',
                src: 'http://wxdemo2.maxrocky.com/images/goodsPic7.jpg',
            }, {
                id: '222',
                src: 'http://wxdemo2.maxrocky.com/images/goodsPic8.jpg',
            }, {
                id: '222',
                src: 'http://wxdemo2.maxrocky.com/images/goodsPic9.jpg',
            }]
        }
        var data2 = {
            id: '2',
            // 轮播图图片
            sliderPic: [
                'http://wxdemo2.maxrocky.com/images/slider1.png',
                'http://wxdemo2.maxrocky.com/images/slider2.png',
                'http://wxdemo2.maxrocky.com/images/slider1.png',
                'http://wxdemo2.maxrocky.com/images/slider2.png',
                'http://wxdemo2.maxrocky.com/images/slider1.png',
                'http://wxdemo2.maxrocky.com/images/slider2.png',
            ],
            // 新闻图片
            newsPic: 'http://wxdemo2.maxrocky.com/images/homePageNewsPic.png',
            // 小区相关信息
            misMsg: [{
                title: '物业报修进度更新222',
                content: '北京广渠金茂府报修完成',
            }, {
                title: '物业报修进度更新',
                content: '北京广渠金茂府报修完成',
            }, {
                title: '交付预约提醒',
                content: '北京广渠金茂府交付预约提醒',
            }],
            propertyMsg: {
                title: '关于缴纳第一季度物业费的通知2222222',
                content: '北京广渠金茂府物业缴费通知',
                readPic: ['http://wxdemo2.maxrocky.com/images/ppReadPic.png', 'http://wxdemo2.maxrocky.com/images/ppReadPic.png', 'http://wxdemo2.maxrocky.com/images/ppReadPic.png', 'http://wxdemo2.maxrocky.com/images/ppReadPic.png', 'http://wxdemo2.maxrocky.com/images/ppReadPic.png', ],
                readNum: '233',
                shareNum: '666',
                msgNum: '999',
            },
            lifeStyleMsg: [{
                id: '111',
                title: '美国进口星冰乐222',
                src: 'http://wxdemo2.maxrocky.com/images/goodsPic.png',
                shipping: '包邮',
                goods: '现货',
                price: '298'
            }, {
                id: '222',
                title: '日本进口巧克力',
                src: 'http://wxdemo2.maxrocky.com/images/goodsPic.png',
                shipping: '包邮',
                goods: '现货',
                price: '198'
            }]
        };
        var result1 = mocksData.resetData(data1);
        $httpBackend.whenGET('/homePage/communityMsg/1').respond(result1);
        var result2 = mocksData.resetData(data2);
        $httpBackend.whenGET('/homePage/communityMsg/2').respond(result2);

        // 报修信息假数据
        // var data3 = {
        //     "code": 0,
        //     "msg": "OK",
        //     "data": [
        //         ["2016051611484658594", "2016-05-16 11:48:46", "您的报修信息已成功提交。", "0"],
        //         ["2016051611562359732", "2016-05-16 11:56:23", "您的报修信息已成功提交。", "1"],
        //         ["2016051611484658594", "2016-04-01 11:48:46", "您的报修信息已成功提交。", "0"],
        //         ["2016051611562359732", "2016-05-16 11:56:23", "您的报修信息已成功提交。", "1"]
        //     ]
        // };
        // var result3 = mocksData.resetData(data3);
        // $httpBackend.whenPOST('/user/getpersonalmessage').respond(result3);

        // 社区信息假数据
        // var data4 = {
        //     'code': '0',
        //     'msg': 'OK',
        //     'data': [
        //         {
        //             detailidId: 'bedfc000490342e197b3ab650a7908f3',
        //             title: '关于缴纳第一季度物业费的通知',
        //             content: '<p>尊敬的各位业主，请您于2016-04-01前缴纳第一季度物业费，共计¥2360元。谢谢您的配合</p>',
        //             releaseDate: '2016-06-03 16:32:08',
        //             isVote: '1',
        //             likeNum: '345',
        //             replyNum: '232',
        //             createPerson: '金茂物业',
        //             collectionId: '9df1eca2e1574dfdadfcae3c0a39cc6d'
        //         },
        //         {
        //             detailidId: '015178d33cfc4827a5c965ab87dc5579',
        //             title: '关于缴纳第一季度供暖费的通知',
        //             content: '<p>尊敬的各位业主，请您于2016-04-01前缴纳第一季度供暖费，共计¥2360元。谢谢您的配合</p>',
        //             releaseDate: '2016-04-03 16:32:08',
        //             isVote: '0',
        //             likeNum: '234',
        //             replyNum: '123',
        //             createPerson: '金茂管家',
        //             collectionId: null
        //         }
        //     ]
        // };
        // var result4 = mocksData.resetData(data4);
        // $httpBackend.whenPOST('/user/getpropertyannouncement').respond(result4);


        $httpBackend.whenGET(/\/home\/getCarousel\/.*/).passThrough();
        $httpBackend.whenGET('/communitynews/shownewstitlelist').passThrough();
        $httpBackend.whenPOST('/user/changepersonalcollectionstatus').passThrough();
        $httpBackend.whenPOST('/user/appexit').passThrough();
        $httpBackend.whenGET(/\/user\/getDefaultCity/).passThrough();

        // $httpBackend.whenPOST('/user/getpropertyannouncement').passThrough();
        $httpBackend.whenPOST('/user/getPersonalMessageIndex').passThrough();
    }])