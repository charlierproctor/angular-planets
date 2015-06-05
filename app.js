'use strict';

angular.module('ngPlanetsDemo', [
	'charlierproctor.angular-planets'
])

.controller('AppCtrl', ['$scope', function ($scope) {

	$scope.sun = {
		color: 0x0000ff,
		radius: 20
	}

	$scope.planets = []

}]);