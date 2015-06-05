'use strict';

angular.module('ngPlanetsDemo', [
	'charlierproctor.angular-planets'
])

.controller('AppCtrl', ['$scope', function ($scope) {

	$scope.sun = {
		color: 0x0000ff,
		radius: 20
	}

	// years per second
	$scope.speed = 1

	// pixels per AU
	$scope.scale = 25

	$scope.planets = [
		{
			color: 0xff0000,
			planetRadius: 10,
			orbitalRadius: 1
		},
		{
			color: 0x00ff00,
			planetRadius: 10,
			orbitalRadius: 2
		},
		{
			color: 0x0000ff,
			planetRadius: 10,
			orbitalRadius: 3
		}
	]

}]);