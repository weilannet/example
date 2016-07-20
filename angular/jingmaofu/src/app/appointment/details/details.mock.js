angular.module('jinmaofu.details.mock', [
    'ngMockE2E', 'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    // var data = {
    //     id: '0',
    //     status: '0',
    //     detailImg: 'http://123.57.160.155:8081/images/huodongbaoming-yinghuaji.jpg',
    //     detailTitle: '亦庄金茂悦第三期',
    //     detailStartTime: '2016-04-01',
    //     detailEndTime: '2016-05-30',
    //     detailAddress: '亦庄金茂悦南区接待处',
    //     detailPlan: '亦庄金茂悦6号楼、7号楼、8号楼、11号楼集中交付',
    //     detailRoomAddress: ['亦庄金茂悦南区3单元6号楼209', '亦庄金茂悦南区4单元6号楼209', '亦庄金茂悦南区5单元6号楼209'],
    //     detailAdd: '亦庄金茂悦6号楼'
    // };
    // var result = mocksData.resetData(data);
    // $httpBackend.whenGET(/\/sharingActivity6\/info\/(\s\S)?/).respond(result);

    // var data1 = {
    //     id: '0',
    //     status: '0',
    //     detailImg: 'http://123.57.160.155:8081/images/huodongbaoming-yinghuaji.jpg',
    //     name: "方名",
    //     idCard: '110110111011111100',
    //     mobile: '15810949258',
    //     house: "北京亦庄金茂南区-2-209",
    //     time: "2016-06-06 AM",
    //     deliveryAddress: "亦庄金茂南区接待处"
    // };
    // var result1 = mocksData.resetData(data1);
    // $httpBackend.whenGET(/\/sharingActivity6\/info1\/(\s\S)?/).respond(result1);

    // var data2 = {
    //     appointStaDate: '2016-04-01',
    //     appointEndDate: '2016-05-30'
    // };
    // var result2 = mocksData.resetData(data2);
    // $httpBackend.whenGET(/\/communityArea\/appointDetail\/(\s\S)?/).respond(result2);

    $httpBackend.whenGET(/\/deliveryPlan\/batchDetail(\s\S)?/).passThrough();
    $httpBackend.whenGET(/\/deliveryPlan\/batchHouseDetail(\s\S)?/).passThrough();
    $httpBackend.whenGET('/deliveryPlan/userInfo').passThrough();
    $httpBackend.whenGET(/\/deliveryPlan\/queryStatus(\s\S)?/).passThrough();
    $httpBackend.whenGET(/\/deliveryPlan\/selfHouseList(\s\S)?/).passThrough();
    $httpBackend.whenGET(/\/deliveryPlan\/queryReservationDate(\s\S)?/).passThrough();
    $httpBackend.whenPOST(/\/deliveryPlan\/addReservationList(\s\S)?/).passThrough();
    $httpBackend.whenPOST(/\/deliveryPlan\/updateReservationList(\s\S)?/).passThrough();
    $httpBackend.whenPOST(/\/deliveryPlan\/cancleReservationList(\s\S)?/).passThrough();
}])
