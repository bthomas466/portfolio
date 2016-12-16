//ProjectService
angular.module('sampleApp').factory('Project', ['$http', function($http) {
    return {
        getProjectById: function(id) {
            return $http.get('/api/projects/' + id);
        },
        getAllProjects: function() {
            return $http.get('/api/projects');
        }
    }
}]);
