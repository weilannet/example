angular.module('jinmaofu.activityDetail.mock',[
  	'ngMockE2E',
  	'jinmaofu.common.mocksData'
])

.run(['$httpBackend','mocksData',function($httpBackend,mocksData) {
	// var data={
 //            imgurl:"http://123.57.160.155:8081/images/you2.png",
 //            title:"活动介绍",
 //            content:"“和谐的亲子关系，是奠定孩子财商高的基础。”和谐的亲子关系，是奠定孩子财商高的基础。”除了财商、德商、灵商、胆商等方面也是都应该在孩子小的时候给予及时的注意和训练，让孩子得以全面发展。除了财商、德商、灵商、胆商等方面也是都应该在孩子小的时候给予及时的注意和训练，让孩子得以全面发展。除了财商、德商、灵商、胆商等方面也是都应该在孩子小的时候给予及时的注意和训练。<br>让孩子得以全面发展。除了财商、德商、灵商、胆商等方面也是都应该在孩子小的时候给予及时的注意和训练，让孩子得以全面发展。除了财商、德商、灵商、胆商等方面也是都应该在孩子小的时候给予及时的注意和训练，让孩子得以全面发展。",
 //      	    time:"活动时间：",
 //            activityTime:"2016年4月25日",
 //            location:"活动地点：",
 //            activityLoc:"亦庄金茂悦接待中心",
 //            apply:"活动范围：",
 //            applyRange:"亦庄金茂悦业主",
 //            consult:"活动咨询：",
 //            tel:"010-56528888",
 //            href:""
	// };

	// var result=mocksData.resetData(data);

 //  $httpBackend.whenGET(/\/jinmaoHappiness\/activityDetail\/(\s\S)?/).respond(result);
  $httpBackend.whenGET(/\/community\/activityInfo\/(\s\S)?/).passThrough();
  $httpBackend.whenPOST(/\/community\/apply(\s\S)?/).passThrough();
  // $httpBackend.whenGET(/\/community\/myActivities(\s\S)?/).passThrough();
}])
