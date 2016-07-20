angular.module('jinmaofu.voteDetail.mock', [
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {

    var data = {
        id: '111',
        voteContent: '2016年5月14日，金茂第十届金舍奖诚挚邀请您来一起评选您心目中的好住宅',
        attendNumber: '233',
        voteItems: [{
            id: '111',
            content: '本户型为三室一厅，使用面积152平方米，面北朝南，本户型为三室一厅，使用面积152平方米，面北朝南',
            attendNumber: '100'
        }, {
            id: '222',
            content: '本户型为三室一厅，使用面积152平方米，面北朝南，本户型为三室一厅，使用面积152平方米，面北朝南',
            attendNumber: '133'
        }]
    };

    var result = mocksData.resetData(data);
    $httpBackend.whenGET('/getVoteDetail').respond(result);

    $httpBackend.whenGET(/\/vote\/getVoteResult\//).passThrough();
}])