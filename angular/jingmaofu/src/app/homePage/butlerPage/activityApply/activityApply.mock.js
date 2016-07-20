angular.module('jinmaofu.activityApply.mock',[
  	'ngMockE2E',
  	'jinmaofu.common.mocksData'
])

.run(['$httpBackend','mocksData',function($httpBackend,mocksData) {
	// var data={
 //      	tabOne:"活动列表",
 //      	tabTwo:"我报名的活动",
 //            times:"两次",
 //      	activityList:[{
 //      		imgurl:"http://123.57.160.155:8081/images/you1.png",
 //      		href:"/#/activityDetail/12366",
 //      		surplus:"40",
 //                  btn:"报名",
 //      		applyRange:"亦庄金茂悦南区业主",
 //      		activityTime:"2016年4月25日"
 //      	},{
 //      		imgurl:"http://123.57.160.155:8081/images/you2.png",
 //      		href:"#",
 //      		status:"名额已报满",
 //                  surplus:"",
 //                  btn:"查看详情",
 //      		applyRange:"广渠金茂业主",
 //      		activityTime:"2016年4月25日"
 //      	},{
 //      		imgurl:"http://123.57.160.155:8081/images/you3.png",
 //      		href:"#",
 //      		status:"活动已结束",
 //                  surplus:"",
 //                  btn:"精彩图集",
 //      		applyRange:"亦庄金茂悦南区业主",
 //      		activityTime:"2016年4月25日"
 //      	}],
 //      	myActivity:[{
 //                  show:"1",
 //                  id:"0",
 //      		imgurl:"http://123.57.160.155:8081/images/you2.png",
 //      		href:"/#/activityDetail/12366",
 //      		activityTime:"2016年4月25日",
 //      		applyRange:"亦庄金茂悦南区业主"
      		
 //      	}]
	// };

	// var result=mocksData.resetData(data);

  // $httpBackend.whenGET(/\/jinmaoHappiness\/activityApply\/(\s\S)?/).respond(result);

  $httpBackend.whenGET(/\/community\/activities(\s\S)?/).passThrough();
  $httpBackend.whenGET(/\/community\/myActivities(\s\S)?/).passThrough();
  $httpBackend.whenPOST(/\/community\/cancel(\s\S)?/).passThrough();

}])
