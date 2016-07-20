/**
 * Created by LiZhenlin on 2016/4/1.
 */
angular.module('jinmaofu.feedback.mock',[
        'ngMockE2E',
        'jinmaofu.common.mocksData'
    ])

    .run(['$httpBackend','mocksData',function($httpBackend,mocksData) {
        var data={
            houseList:[
                {
                    id: '1',
                    buildName: '北京广渠金茂府1号楼-2-301',
            },
                {
                    id: '2',
                    buildName: '北京广渠金茂府2号楼-2-301',
                }],
            tel: '010-84110101'
        };

        var result=mocksData.resetData(data);

        $httpBackend.whenGET('/fbhouseList/fbTel').respond(result);
        $httpBackend.whenPOST('/user/feedback').passThrough();
        $httpBackend.whenPOST('/user/getuserinfobyid').passThrough();
        $httpBackend.whenGET('/house/allHouse').passThrough();
    }])