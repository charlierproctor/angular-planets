'use strict';

angular.module('ngPlanetsDemo', [
	'charlierproctor.angular-planets'
])

.controller('AppCtrl', ['$scope','$window', function ($scope, $window) {

	// set height,width of canvas
	$scope.height = $window.innerHeight
	$scope.width = $window.innerWidth

	// handle window resizing
	angular.element($window).on('resize',function(){
		$scope.height = $window.innerHeight
		$scope.width = $window.innerWidth
		$scope.$apply()
	})

	$scope.scale = 25
	$scope.speed = 1
}]);