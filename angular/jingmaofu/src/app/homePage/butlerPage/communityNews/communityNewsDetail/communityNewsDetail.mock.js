angular.module('jinmaofu.communityNewsDetail.mock', [
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {

    var data = {
        id: '111',
        newsTime: '05-11',
        detailTime: '11:33',
        content: '我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容',
        like: '280',
        comments: '500'
    };

    var result = mocksData.resetData(data);
    $httpBackend.whenGET('/getcommunityNewsDetail').respond(result);


    var data1 = {
        userImg: 'http://wxdemo2.maxrocky.com/images/newDetailUserPic.png',
        userName: '业主1',
        newsTime: '05-11',
        detailTime: '11:33',
        comment: '这是我的意见反馈'
    };

    var result1 = mocksData.resetData(data1);
    $httpBackend.whenGET('/getUserComments').respond(result1);

    var data2 = {
        butlerImg: 'http://wxdemo2.maxrocky.com/images/newDetailUserPic.png',
        butlerName: '管家1',
        butlerTime: '05-11',
        detailTime: '11:33',
        comment: '这是管家意见反馈'
    };

    var result2 = mocksData.resetData(data2);
    $httpBackend.whenGET('/getButlerComments').respond(result2);

    // var data3 = [{
    //         content: "<p>尊敬的各位业主，请您于2016-04-01前缴纳第一季度物业费，共计¥2360元。谢谢您的配合尊敬的各位业主，请您于2016-04-01前缴纳第一季度物业费，共计¥2360元。谢谢您的配合尊敬的各位业主，请您于2016-04-01前缴纳第一季度物业费，共计¥2360元。谢谢您的配合</p>",
    //         createDate: 1464384486000,
    //         createPerson: "金茂物业",
    //         id: "bedfc000490342e197b3ab650a7908f3",
    //         isVote: 1,
    //         likeNum: '345',
    //         operatDate: 1464384486000,
    //         operatPerson: "IN",
    //         releaseDate: 1464384486000,
    //         releasePerson: "金茂物业",
    //         releaseStatus: 1,
    //         replyNum: '232',
    //         status: 1,
    //         title: "德玛西亚",
    //         voteNum: '150',
    //     },
    //     [{
    //         "TYPE_USER": "1",
    //         "TYPE_ADMIN": "2",
    //         "id": "597106d1ce494214b3feec3aee080875",
    //         "topicId": "015178d33cfc4827a5c965ab87dc5579",
    //         "userId": "test",
    //         "userNickName": "IN",
    //         "replyId": "6454be3535a94297b896b8aa4ad23ac3",
    //         "replyUserId": "test",
    //         "replyUserNickName": '金茂物业',
    //         "content": "回复 业主1 : 小板凳",
    //         "type": "2",
    //         "status": "1",
    //         "createBy": "test",
    //         "createOn": 1464690772000,
    //         "modifyBy": "test",
    //         "modifyOn": 1464766035000,
    //         "floor": 3
    //     }, {
    //         "TYPE_USER": "1",
    //         "TYPE_ADMIN": "2",
    //         "id": "400198db534540f7ab72f4cebf46ecbd",
    //         "topicId": "015178d33cfc4827a5c965ab87dc5579",
    //         "userId": "test",
    //         "userNickName": "IN",
    //         "replyId": "",
    //         "replyUserId": "",
    //         "replyUserNickName": '业主1',
    //         "content": "12313",
    //         "type": "2",
    //         "status": "1",
    //         "createBy": "test",
    //         "createOn": 1464653732000,
    //         "modifyBy": "test",
    //         "modifyOn": 1464754409000,
    //         "floor": 6
    //     }]
    // ];
    // var result3 = mocksData.resetData(data3);
    // $httpBackend.whenPOST('/user/getpropertyannouncementbyid').respond(result3);

    $httpBackend.whenPOST('/user/getpropertyannouncementbyid').passThrough();
    $httpBackend.whenPOST('/announcement/submitReply').passThrough();
    $httpBackend.whenGET(/\/announcement\/clickPraise\/(\s\S)?/).passThrough();
    $httpBackend.whenPOST('/user/addcollection').passThrough();
    $httpBackend.whenPOST('/user/deletecollection').passThrough();

}])