//BearService
angular.module('sampleApp').factory('Bear', ['$http', function($http) {
    return {
        getBearById: function(id) {
            return $http.get('/api/bears/' + id);
        },
        getAllBears: function() {
            return $http.get('/api/bears');
        }
    }
}]);
