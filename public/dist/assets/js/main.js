angular.module('sampleApp', [
    'ngRoute',
    'appRoutes'
]);

angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        //homepage
        .when('/', {
            templateUrl: 'views/home.html'
        })
        .when('/bears/:bear_id', {
            templateUrl: 'views/bear.html'
        })
        //project page that will use the Project Controller
        .when('/projects/:project_id', {
            templateUrl: 'views/project.html'
        })
        //nerds page that will use the NerdController
        .when('/nerds', {
            templateUrl: 'views/nerd.html',
            controller: 'NerdController'
        });

    $locationProvider.html5Mode(true);
}]);

angular.module('sampleApp').controller('BearController', ['$scope', '$routeParams', 'Bear', function($scope, $routeParams, Bear) {
    console.log($routeParams.bear_id);
    var bear = $routeParams.bear_id;
    Bear.getBearById(bear).then(function(res) {
        $scope.bears = res.data;
        $scope.beadID = $routeParams.bear_id;
    });
}]);

//MainCtrl
angular.module('sampleApp').controller('MainController', ['$scope', 'Bear', 'Project', function($scope, Bear, Project) {
    Bear.getAllBears().then(function(res) {
        $scope.allBears = res.data;
    });

    Project.getAllProjects().then(function(res) {
        $scope.allProjects = res.data;
    });
}]);

//NerdCtrl.js
angular.module('sampleApp', []).controller('NerdController', function($scope) {
    $scope.tagline = 'Nothing beats a pocket protector!';
});

angular.module('sampleApp').controller('ProjectController', ['$scope', '$routeParams', 'Project', function($scope, $routeParams, Project) {
    console.log($routeParams.project_id);
    var project = $routeParams.project_id;
    Project.getProjectById(project).then(function(res) {
        $scope.projects = res.data;
        $scope.projectID = $routeParams.project_id;
    });
}]);

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

//NerdService.js
angular.module('sampleApp', []).factory('Nerd', ['$http', function($http) {
    return {
        //call to get all nerds
        get : function() {
            return $http.get('/api/nerds');
        },
        //call to POST and create a new nerd
        create : function(nerdData) {
            return $http.post('/api/nerds', nerdData);
        },
        //call to DELEE a nerd
        delete : function(id) {
            return $http.delete('/api/nerds' + id);
        }
    }
}]);

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
