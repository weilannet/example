angular.module('jinmaofu.common.pageInit', [])

.service('PageDataReady', [function() {
    this.dataReady = true;
    this.loadShow = false;
    return this;
}])

.factory('pageInitService', ['$q', '$http', '$ionicLoading', '$rootScope', 'PageDataReady',
    function($q, $http, $ionicLoading, $rootScope, PageDataReady) {
        var pageInit = {};
        $rootScope.$on('$ionicView.enter', function() {
            if (!PageDataReady.dataReady) {
                $ionicLoading.show();
                PageDataReady.dataReady = true;
                PageDataReady.loadShow = true;
            } else {
                PageDataReady.dataReady = true;
                PageDataReady.loadShow = false;
            }
        });

        

        pageInit.pageInit = function(apis) {
            var data = [];
            for (var i = 0; i < apis.length; i++) {
                data[i] = (function() {
                    return $http.get(apis[i]);
                })();
            };
            PageDataReady.dataReady = false;
            return $q.all(data).finally(function() {
               
                if (PageDataReady.loadShow) {
                    PageDataReady.dataReady = true;
                    PageDataReady.loadShow = false;
                    $ionicLoading.hide();
                } else {
                    PageDataReady.dataReady = true;
                }
            });
        };
        return pageInit;
    }
])