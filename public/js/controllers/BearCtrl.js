angular.module('sampleApp').controller('BearController', ['$scope', '$routeParams', 'Bear', function($scope, $routeParams, Bear) {
    console.log($routeParams.bear_id);
    var bear = $routeParams.bear_id;
    Bear.getBearById(bear).then(function(res) {
        $scope.bears = res.data;
        $scope.beadID = $routeParams.bear_id;
    });
}]);
