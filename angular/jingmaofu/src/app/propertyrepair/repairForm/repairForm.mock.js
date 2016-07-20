angular.module('jinmaofu.repairForm.mock', [
    'ngMockE2E', 'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {

    // var data = {
    //     addressList: [{
    //         address: '万达广场8号楼1709'
    //     }, {
    //         address: '万达广场10号楼2005'
    //     }, {
    //         address: '万达广场9号楼天台'
    //     }],
    //     userName: '刘德华',
    //     userPhone: '18766591375'
    // };
    // var information = mocksData.resetData(data);
    // $httpBackend.whenGET('http://ssyhwx.maxrocky.com:55298/propertyRepair/ownerInfo').respond(information);    

    // var result = {
    //     content: '我要报修',
    //     type: '1', //0：代表户内报修；1：代表公区
    //     imageList: [{
    //         url: ''
    //     }, {
    //         url: ''
    //     }]
    // };

    // $httpBackend.whenPOST('http://ssyhwx.maxrocky.com:55298/propertyRepair/ownerInfo').respond(function(method, url, data) {
    //        var data=eval("("+data+")");
    //        return [200, mocksData.resetData(result), {}];        
    // });


    $httpBackend.whenGET('/propertyRepair/weChatOwnerInfo').passThrough();
    $httpBackend.whenPOST('/propertyRepair/weChatRepair').passThrough();
    $httpBackend.whenGET('/user/loginUserInfo').passThrough();
    $httpBackend.whenPOST('/propertyRepair/repairs').passThrough();
    $httpBackend.whenPOST('/upload/uploadImage').passThrough();
    // $httpBackend.whenPOST('/upload/uploadImage').passThrough();
    // $httpBackend.whenGET(/\/click\/clickTimes\/(\s\S)?/).passThrough();
}])
