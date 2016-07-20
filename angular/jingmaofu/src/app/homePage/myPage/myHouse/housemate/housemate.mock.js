angular.module('jinmaofu.myHouse.housemate.mock',[
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend','mocksData',function($httpBackend,mocksData) {
  var data={
        addName:"方亮",
        house:'“北京亦庄金茂悦南区2楼209”',
        hrefOne:"/#/addHousemate/1662",
        hrefTwo:"/#/test",
        mateList:[{
            id:"0",
            show:"1",
            name:"董方",
            phone:"13545345688"
          },{
            id:"1",
            show:"1",
            name:"肖莹",
            phone:"13578678956"
          },{
            id:"2",
            show:"1",
            name:"方亮",
            phone:"13578676666"
        }]
  };

  var result=mocksData.resetData(data);

  $httpBackend.whenGET(/\/jinmaoHappiness\/myHouse\/housemate\/(\s\S)?/).respond(result);

}])
