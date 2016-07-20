angular.module('jinmaofu.deliveryAppointment.mock', [
    'ngMockE2E', 'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {

    // $httpBackend.whenGET(/\/communityArea\/payDetail(\s\S)?/).passThrough();
    // $httpBackend.whenGET(/\/communityArea\/appointDetail(\s\S)?/).passThrough();
    // $httpBackend.whenPUT(/\/communityArea\/payDetail(\s\S)?/).passThrough();
    // $httpBackend.whenPUT(/\/communityArea\/appointDetail(\s\S)?/).passThrough();
    // var data = {
    //     "code": 0,
    //     "msg": "OK",
    //     "data": [
    //     {
    //         id: '1',
    //         status: '0',
    //         appointImg: 'http://123.57.160.155:8081/images/huodongbaoming-yinghuaji.jpg',
    //         appointTitle: '亚奥金茂悦第一批交付',
    //         appointDateStart: '2016-07-01',
    //         appointDateEnd: '2016-07-31'
    //     },{
    //         id: '2',
    //         status: '1',
    //         appointImg: 'http://123.57.160.155:8081/images/huodongbaoming-yinghuaji.jpg',
    //         appointTitle: '亚奥金茂悦第一批交付',
    //         appointDateStart: '2016-07-01',
    //         appointDateEnd: '2016-07-31'
    //     },{
    //         id: '3',
    //         status: '0',
    //         appointImg: 'http://123.57.160.155:8081/images/huodongbaoming-yinghuaji.jpg',
    //         appointTitle: '亚奥金茂悦第一批交付',
    //         appointDateStart: '2016-07-01',
    //         appointDateEnd: '2016-07-31'
    //     }]
    // };
    // $httpBackend.whenGET(/\/communityArea\/payDetail(\s\S)?/).respond(data);

    // var data2 = { "code": 0, "msg": "OK", "data": { "id": "79b6bd1b531f42f181b7dfea116bb1e0", "url": null, "communityName": null, "houseName": "<p>这是第一批次交付的信息<br>而我只是个简单的富文</p>", "content": null, "payStaDate": "2016-04-01", "payEndDate": "2016-04-29", "appointStaDate": "2016-01-01", "appointEndDate": "2016-02-02", "status": 1, "amOrPm": 1, "userName": "1", "idCard": "5365", "mobile": "2016-01-27 ", "deliveryBatch": "第一批次", "maxUser": "30", "communityHousePays": [] } };
    // $httpBackend.whenGET(/\/communityArea\/appointDetail(\s\S)?/).respond(data2);


    $httpBackend.whenGET('/user/loginUserInfo').passThrough();
    $httpBackend.whenGET(/\/deliveryPlan\/allBatch/).passThrough();
}])