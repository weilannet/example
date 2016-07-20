angular.module('jinmaofu.login.mock', [
    'ngMockE2E', 'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
 $httpBackend.whenGET('/user/userInfo').passThrough();

var datas={"token":"1957f8a5-6058-428a-a3e7-955120b86ec5","userName":"fengfan","mobile":"13501219381",
"nickName":"丰帆一","realName":"丰帆","sex":1,"idCard":"110105630211218","idType":"5365",
"logo":"http://ssyhwx.maxrocky.com:55298/appuser/images/interface/user/head.png","userState":1,
"userType":"3","projectId":"2","projectName":"北京CBD万达广场"};
   

    $httpBackend.whenPOST('/user/login').respond(function(method,url,data){
    	
    	return [200, mocksData.resetData(datas), {}];
    });

    $httpBackend.whenPOST('/user/login').respond(function(method,url,data){
    	
    	return [200, mocksData.resetData(datas), {}];
    });
    $httpBackend.whenPOST('/user/loginforup').passThrough();
    $httpBackend.whenPOST('/user/getuserinfobyid').passThrough();
     // $httpBackend.whenPOST('/user/login').passThrough();

    // $httpBackend.whenPOST('/user/login').passThrough();;
    // $httpBackend.whenPOST('/sms/authCode').passThrough();
    // $httpBackend.whenPOST('/user/loginForVisitors').passThrough();
    // $httpBackend.whenPOST('http://hxsq.hxsq2016.com:8080/user/login').passThrough();
    // $httpBackend.whenPOST('/message/saveToken').passThrough();
}])