//MainCtrl
angular.module('sampleApp').controller('MainController', ['$scope', 'Bear', 'Project', function($scope, Bear, Project) {
    Bear.getAllBears().then(function(res) {
        $scope.allBears = res.data;
    });

    Project.getAllProjects().then(function(res) {
        $scope.allProjects = res.data;
    });
}]);
