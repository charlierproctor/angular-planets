'use strict';

angular.module('ngPlanetsDemo', [
	'charlierproctor.angular-planets'
])

.controller('AppCtrl', ['$scope','$window', function ($scope, $window) {
	$scope.height = $window.innerHeight
	$scope.width = $window.innerWidth
}]);