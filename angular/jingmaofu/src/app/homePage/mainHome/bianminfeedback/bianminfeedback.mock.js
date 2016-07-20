/**
 * Created by LiZhenlin on 2016/4/1.
 */
angular.module('jinmaofu.bianminfeedback.mock',[
        'ngMockE2E',
        'jinmaofu.common.mocksData'
    ])

    .run(['$httpBackend','mocksData',function($httpBackend,mocksData) {
        
        $httpBackend.whenPOST('/user/feedback').passThrough();
    }])