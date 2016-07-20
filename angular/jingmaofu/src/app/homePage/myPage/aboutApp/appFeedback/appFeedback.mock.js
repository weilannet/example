angular.module('jinmaofu.appFeedback.mock', [
    'ngMockE2E',
    'jinmaofu.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    $httpBackend.whenPOST('/user/saveFeedback').passThrough();
}])