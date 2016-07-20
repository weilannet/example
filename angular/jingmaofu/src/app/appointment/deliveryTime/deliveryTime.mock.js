angular.module('jinmaofu.deliveryTime.mock', [
    'ngMockE2E', 'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    var data = {
        name:"方名",
        house:"北京亦庄金茂南区-2-209",
        IDcard:"132283819902030239",
        telephone:"15902394084"
    };
    var result = mocksData.resetData(data);

    $httpBackend.whenGET(/\/sharingActivity5\/info\/(\s\S)?/).respond(result);

}])
