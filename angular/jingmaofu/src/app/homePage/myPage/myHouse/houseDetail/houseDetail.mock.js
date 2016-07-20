angular.module('jinmaofu.myHouse.houseDetail.mock',[
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend','mocksData',function($httpBackend,mocksData) {
  // var data={
  //       address:"北京亦庄金茂悦南区10-104",
  //       houseType :"3室2厅2卫",
  //       buildingArea:"158.7m²",
  //       usableArea:"145.28m²",
  //       mateList:[{
  //         id:"0",
  //         show:"1",
  //         name:"董方",
  //         phone:"13545345688"
  //       },{
  //         id:"1",
  //         show:"1",
  //         name:"董莹",
  //         phone:"13578678956"
  //       }]
  // };

  // var result=mocksData.resetData(data);

  // $httpBackend.whenGET(/\/jinmaoHappiness\/myHouse\/houseDetail\/(\s\S)?/).respond(result);
  // $httpBackend.whenGET(/\/house\/houseInfo(\s\S)?/).respond(result);
  $httpBackend.whenGET(/\/house\/houseInfo(\s\S)?/).passThrough();
  $httpBackend.whenGET(/\/house\/housemate(\s\S)?/).passThrough();
  $httpBackend.whenPOST(/\/house\/delHousemate(\s\S)?/).passThrough();
  $httpBackend.whenPOST(/\/house\/defaultHouse(\s\S)?/).passThrough();
  $httpBackend.whenPOST(/\/house\/housemates(\s\S)?/).passThrough();

}])
