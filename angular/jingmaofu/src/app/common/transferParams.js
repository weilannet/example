angular.module('jinmao.common.transferParams', [])

.service('transferParams', [function() {
    this.cityId = '';
    this.params = null;
    this.create = function(data) {
        this.params = data;
    };
    this.destroy = function() {
        this.params = null;
    };
    return this;
}])