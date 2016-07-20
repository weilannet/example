angular.module('jinmaofu.repairDetail.mock', [
    'ngMockE2E', 'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    // var statusData = {
    //     reqId : '20160421123456789',
    //     reqContent : '卫生间漏水卫生间漏水卫生间漏水卫生间漏水卫生间漏水卫生间漏水卫生间漏水卫生间漏水卫生间漏水卫生间漏水卫生间漏水卫生间漏水卫生间漏水卫生间漏水卫生间漏水卫生间漏水',
    //     imgList : ['../../../images/reqpic.png','../../../images/reqpic.png','../../../images/reqpic.png']
    // };
    // var statusResult = mocksData.resetData(statusData);
    // $httpBackend.whenGET('http://ssyhwx.maxrocky.com:55298/propertyRepair/repairStatus').respond(statusResult);

    // var progressData = {
    //   /*整个的状态*/
    //   taskStatus:'1',
    //   imageUrl:'../../../images/reqpic.png',
    //   imagedList : [],
    //   imageList: [],
    //    progressList:[
    //     { 
    //     taskDate: "2016-1-11", //任务时间
    //     taskTime:"10:51",
    //     taskName: '提交报修', //任务名称
    //     taskContentList:[{ taskContent:'我要报修1'}]//任务内容
    //     },
    //     { 
    //     taskDate: "2016-1-11", //任务时间
    //     taskTime:"10:51",
    //     taskName: '派工信息', //任务名称
    //     taskContentList:[{ taskContent:'我要报修2'},] //任务内容
    //     },
    //     { 
    //     taskDate: "2016-1-11", //任务时间
    //     taskTime:"10:51",
    //     taskName: '维修进展', //任务名称
    //     taskContentList:[{ taskContent:'我要报修3我要报修3我要报修3我要报修3我要报修3我要报修3我要报修3'},{ taskContent:'我要报修3我要报修3我要报修3我要报修3'},{ taskContent:'我要报修3我要报修3我要报修3我要报修3'},{ taskContent:'我要报修3'}]//任务内容
    //     },
    //     { 
    //     taskDate: "2016-1-11", //任务时间
    //     taskTime:"10:51",
    //     taskName: '业主回访', //任务名称
    //     taskContentList:[{ taskContent:'我要报修4'},]//任务内容
    //     },
    //     {  
    //     taskDate: "2016-1-11", //任务时间
    //     taskTime:"10:51",
    //     taskName: '维修完成', //任务名称
    //     taskContentList:[{ taskContent:'我要报修'},]//任务内容
    //     }
    //    ] 
    // };

    // var progressResult = mocksData.resetData(progressData);
    // $httpBackend.whenGET('http://ssyhwx.maxrocky.com:55298/propertyRepair/repairInfo').respond(progressResult);


    // var evaluateResult = {
    //     quality: '3', //质量：3星
    //     attitude: '3', //态度：3星
    //     content: '很好' //评价内容
    // };

    // $httpBackend.whenPOST('http://ssyhwx.maxrocky.com:55298/propertyRepair/repairEvaluate').respond(function(method, url, data) {
    //     var data = eval("(" + data + ")");

    //     return [200, mocksData.resetData(evaluateResult), {}];
    // });


    // var list = {"code":0,"msg":"OK","data":{"status":"","taskStatus":"","imageUrl":"","userId":"","progressList":[]}};
    //  $httpBackend.whenGET(/http:\/\/ssyhwx.maxrocky.com:55298\/propertyRepair\/repairProgress\/(\s\S)?/).respond(list); 

     
     // $httpBackend.whenGET(/\/propertyRepair\/weChatRepairProgress\/\d{19}/).passThrough();
     // $httpBackend.whenGET(/\/propertyRepair\/weChatRepairInfo\/\d{19}/).passThrough();
     $httpBackend.whenPOST('/propertyRepair/weChatRepairEvaluate').passThrough();
     $httpBackend.whenGET(/\/propertyRepair\/weChatRepairProgress\/(\s\S)?/).passThrough();
     // $httpBackend.whenGET(/(\s\S)?/).passThrough();
     $httpBackend.whenGET(/\/propertyRepair\/weChatRepairInfo\/(\s\S)?/).passThrough();
     // $httpBackend.whenGET(/http:\/\/ssyhwx.maxrocky.com:55298\/(\s\S)?/).respond(progressData);
    // $httpBackend.whenGET(/\/propertyRepair\/repairInfo\/\d{19}/).passThrough();
    // $httpBackend.whenPOST('/propertyRepair/repairContinue').passThrough();
    // $httpBackend.whenPOST('/propertyRepair/repairStop').passThrough();
    //  $httpBackend.whenPOST('/propertyRepair/repairEvaluate').passThrough();
}])
