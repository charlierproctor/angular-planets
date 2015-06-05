angular.module('charlierproctor.angular-planets', []).
  directive('ngPlanets', function () {
  	function link(scope, element, attrs){
  		console.log("hi there")
  	}
    return {
    	restrict: 'E',
    	link: link
    };
  });