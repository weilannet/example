angular.module('jinmaofu.changeCommunity.mock', [
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    var data = [{
        id: '11',
        city: '北京'
    }, {
        id: '22',
        city: '上海'
    }, {
        id: '33',
        city: '广州'
    }, {
        id: '44',
        city: '深圳'
    }];
    var result = mocksData.resetData(data);
    $httpBackend.whenGET('/getCityName').respond(result);

    var data1 = [{
        id: '11',
        communityName: '北京广渠金茂府'
    }, {
        id: '22',
        communityName: '北京亦庄金茂府'
    }, {
        id: '33',
        communityName: '北京望京金茂府'
    }];


    var result1 = mocksData.resetData(data1);
    $httpBackend.whenGET('/getCommunityList/11').respond(result1);

    var data2 = [{
        id: '11',
        communityName: '上海广渠金茂府'
    }, {
        id: '22',
        communityName: '上海亦庄金茂府'
    }, {
        id: '33',
        communityName: '上海望京金茂府'
    }];


    var result2 = mocksData.resetData(data2);
    $httpBackend.whenGET('/getCommunityList/22').respond(result2);

    var data3 = [{
        id: '11',
        communityName: '广州广渠金茂府'
    }, {
        id: '22',
        communityName: '广州亦庄金茂府'
    }, {
        id: '33',
        communityName: '广州望京金茂府'
    }];


    var result3 = mocksData.resetData(data3);
    $httpBackend.whenGET('/getCommunityList/33').respond(result3);

    var data4 = [{
        id: '11',
        communityName: '深圳广渠金茂府'
    }, {
        id: '22',
        communityName: '深圳亦庄金茂府'
    }, {
        id: '33',
        communityName: '深圳望京金茂府'
    }];


    var result4 = mocksData.resetData(data4);
    $httpBackend.whenGET('/getCommunityList/44').respond(result4);
    $httpBackend.whenPOST('/user/getcitys').passThrough();
    $httpBackend.whenPOST('/home/replaceProject').passThrough();
}])