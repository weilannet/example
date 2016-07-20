angular.module('jinmaofu.convenientInformation.mock', [
    'ngMockE2E', 'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
            
                $httpBackend.whenGET(/\/propertyHelpline\/allProject(\s\S)?/).passThrough();
                $httpBackend.whenGET(/\/propertyHelpline\/serviceInfo(\s\S)?/).passThrough();
                $httpBackend.whenGET(/\/propertyHelpline\/servicePhone(\s\S)?/).passThrough();
            }])
