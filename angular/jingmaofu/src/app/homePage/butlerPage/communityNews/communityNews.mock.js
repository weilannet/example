angular.module('jinmaofu.communityNews.mock', [
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {

    var data = [{
        id: '111',
        newsTime: '05-11',
        detailTime: '11:33',
        content: '我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容',
        like: '280',
        comments: '500'
    }, {
        id: '222',
        newsTime: '05-12',
        detailTime: '12:33',
        content: '我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容我是社区公告详情内容',
        like: '280',
        comments: '500'
    }]

    var result = mocksData.resetData(data);
    $httpBackend.whenGET('/getCommunityNews').respond(result);

    // 社区信息假数据
    // var data1 = {
    //     'code': '0',
    //     'msg': 'OK',
    //     'data': [{
    //         detailidId: 'bedfc000490342e197b3ab650a7908f3',
    //         title: '关于缴纳第一季度物业费的通知',
    //         content: '<p>尊敬的各位业主，请您于2016-04-01前缴纳第一季度物业费，共计¥2360元。谢谢您的配合</p>',
    //         releaseDate: '2016-06-03 16:32:08',
    //         isVote: '1',
    //         likeNum: '345',
    //         replyNum: '232',
    //         createPerson: '金茂物业',
    //         collectionId: '9df1eca2e1574dfdadfcae3c0a39cc6d'
    //     }, {
    //         detailidId: '015178d33cfc4827a5c965ab87dc5579',
    //         title: '关于缴纳第一季度供暖费的通知',
    //         content: '<p>尊敬的各位业主，请您于2016-04-01前缴纳第一季度供暖费，共计¥2360元。谢谢您的配合</p>',
    //         releaseDate: '2016-04-03 16:32:08',
    //         isVote: '0',
    //         likeNum: '234',
    //         replyNum: '123',
    //         createPerson: '金茂管家',
    //         collectionId: 'null'
    //     }]
    // };
    // var result1 = mocksData.resetData(data1);
    // $httpBackend.whenPOST('/user/getpropertyannouncement').respond(result1);

    $httpBackend.whenPOST('/user/getpropertyannouncement').passThrough();
    $httpBackend.whenPOST('/user/addcollection').passThrough();
    $httpBackend.whenPOST('/user/deletecollection').passThrough();
}])
