angular.module('jinmao.common.saveData', [])

.service('addIdService', [function() {
    this.create = function(workOrderArray) {
        this.workOrderArray = workOrderArray;
    };
    this.destroy = function() {
        this.workOrderArray = [];
    };
    return this;
}])

.factory('SaveWordOrderIdService', ['addIdService', function(addIdService) {
    var saveWordOrderId = {};
    saveWordOrderId.containsBool = function(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return false;
            }
        }
        return true;
    }

    saveWordOrderId.containsIndex = function(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return i;
            }
        }
    }
    saveWordOrderId.isEmpty = function(arr) {
        if (arr.length > 0) {
            return false;
        } else {
            return true;
        }
    }

    saveWordOrderId.arrSize = function(arr) {
        return arr.length;
    }

    saveWordOrderId.getId = function(arr, i) {
        return arr[i];
    }

    saveWordOrderId.addArray = function(workOrderArray) {
        addIdService.create(workOrderArray);
    }

    saveWordOrderId.deleteArray = function() {
        addIdService.destroy();
    }

    saveWordOrderId.getWorkOrderArray = function() {
        return addIdService;
    };
    return saveWordOrderId;
}])