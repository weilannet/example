angular.module('jinmaofu.myPage.mock', [
        'ngMockE2E',
        'jinmaofu.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        $httpBackend.whenGET('/user/getDefaultHeadImg').passThrough();
    }])