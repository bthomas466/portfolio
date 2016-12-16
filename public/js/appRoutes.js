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
