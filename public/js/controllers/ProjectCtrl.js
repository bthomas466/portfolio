angular.module('sampleApp').controller('ProjectController', ['$scope', '$routeParams', 'Project', function($scope, $routeParams, Project) {
    console.log($routeParams.project_id);
    var project = $routeParams.project_id;
    Project.getProjectById(project).then(function(res) {
        $scope.projects = res.data;
        $scope.projectID = $routeParams.project_id;
    });
}]);
