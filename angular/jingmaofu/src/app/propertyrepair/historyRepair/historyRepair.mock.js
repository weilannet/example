angular.module('jinmaofu.historyRepair.mock', [
    'ngMockE2E', 'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    // var data = {
    //     num: '2',
    //     repairList: [{
    //         id: '222',
    //         content: '这就是传递的通知，万达广场8号楼现在需要维修，维修的时间是1个月。需要不断的维修，',
    //         status: '正在派工',
    //         imageUrl: '../../../images/reqpic.png',
    //     }, {
    //         id: '222',
    //         content: '这就是传递的通知，万达广场8号楼现在需要维修，维修的时间是1个月。需要不断的维修，',
    //         status: '正在派工',
    //         imageUrl: '../../../images/reqpic.png',
    //     }, {
    //         id: '222',
    //         content: '这就是传递的通知，万达广场8号楼现在需要维修，维修的时间是1个月。需要不断的维修，',
    //         status: '正在派工',
    //         imageUrl: '../../../images/reqpic.png',
    //     }]
    // };

    // var result = mocksData.resetData(data);
    // $httpBackend.whenGET('http://ssyhwx.maxrocky.com:55298/propertyRepair/historyRepair').respond(result);

    // var data1 = {
    //     finishData: [{
    //         id: '333',
    //         content: '这就是传递的通知，万达广场8号楼现在需要维修，维修的时间是1个月。需要不断的维修，',
    //         status: '维修完成',
    //         imageUrl: '../../../images/reqpic.png',
    //     },{
    //       id: '333',
    //         content: '这就是传递的通知，万达广场8号楼现在需要维修，维修的时间是1个月。需要不断的维修，',
    //         status: '维修完成',
    //         imageUrl: '../../../images/reqpic.png',
    //     }
    //     ]
    // };
    // var result1 = mocksData.resetData(data1);
    // $httpBackend.whenGET('http://ssyhwx.maxrocky.com:55298/propertyRepair/finishRepair').respond(result1);

    
    $httpBackend.whenGET('/propertyRepair/weChatRepairNumber').passThrough();
    $httpBackend.whenGET(/\/propertyRepair\/weChatRepairHistory(\?p=\d+(&c=\d+)?)?/).passThrough();

    // $httpBackend.whenGET(/(\s\S)?/).passThrough();
    // $httpBackend.whenGET('/propertyRepair/repairNumber').passThrough();

}])
