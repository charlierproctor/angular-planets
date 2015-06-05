'use strict';

angular.module('ngPlanetsDemo', [
	'charlierproctor.angular-planets'
])

.controller('AppCtrl', ['$scope', function ($scope) {

	$scope.sun = {
		color: 0x0000ff,
		radius: 20
	}

	$scope.speed = 1

	$scope.planets = [
		{
			color: 0xff0000,
			planetRadius: 10,
			orbitalRadius: 25
		},
		{
			color: 0x00ff00,
			planetRadius: 10,
			orbitalRadius: 50
		},
		{
			color: 0x0000ff,
			planetRadius: 10,
			orbitalRadius: 75
		}
	]

}]);