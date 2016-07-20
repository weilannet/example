angular.module('jinmaofu.votePage.mock',[
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend','mocksData',function($httpBackend,mocksData) {
    
    var data = {
        id: '111',
        voteContent: '2016年5月14日，金茂第十届金舍奖诚挚邀请您来一起评选您心目中的好住宅',
        attendNumber: '233',
        endDate: '2016-08-08',
        voteItems: [{
            id: '1111',
            pic: 'http://wxdemo2.maxrocky.com/images/votePagePic.png',
            content: '本户型为三室一厅，使用面积152平方米，面北朝南，本户型为三室一厅，使用面积152平方米，面北朝南'
        },{
            id: '2222',
            pic: 'http://wxdemo2.maxrocky.com/images/votePagePic.png',
            content: '本户型为三室一厅，使用面积152平方米，面北朝南，本户型为三室一厅，使用面积152平方米，面北朝南'
        }]
    };

    var result = mocksData.resetData(data);
    $httpBackend.whenGET('/getVoteItems').respond(result);


    $httpBackend.whenPOST('/user/getpropertyannouncementbyid').passThrough();
    $httpBackend.whenGET(/\/vote\/getVoteDetail\/(\s\S)?/).passThrough();
    $httpBackend.whenPOST(/\/vote\/voteAction\/(\s\S)?/).passThrough();

}])
