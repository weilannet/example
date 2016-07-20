angular.module('jinmaofu.myHouse.houseIndex.mock',[
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend','mocksData',function($httpBackend,mocksData) {
  // var data={
  //     houseList:[{
  //       approve:false,
  //       href:"/#/houseDetail/1661",
  //       listTitle:"北京亦庄金茂悦南区2楼209"
  //         },{
  //       approve:true,
  //       href:"/#/houseDetail/1661",
  //       listTitle:"北京广渠金茂府1号楼-2-301"
  //         }]
  // };

var data=[{"id":"1","userId":"","userType":"","address":"北京亦庄金茂悦南区10-104","state":"0","name":"","phone":""},
{"id":"2","userId":"","userType":"","address":"北京亦庄金茂悦南区10-104","state":"1","name":"","phone":""}]


  var result=mocksData.resetData(data);

  // $httpBackend.whenGET(/\/jinmaoHappiness\/myHouse\/houseIndex\/(\s\S)?/).respond(result);

  $httpBackend.whenGET(/\/house\/houses(\s\S)?/).passThrough();
  $httpBackend.whenGET(/\/house\/defaultHouse(\s\S)?/).passThrough();
  // $httpBackend.whenGET(/\/house\/houses(\s\S)?/).respond(result);

}])
