angular.module('jinmao.common.transferAnnouncement', [])

.service('transferAnnouncement', [function() {
    this.params = null;
    this.create = function(data) {
        this.params = data;
    };
    this.destroy = function() {
        this.params = null;
    };
    return this;
}])