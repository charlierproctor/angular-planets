angular.module('charlierproctor.angular-planets', []).
  directive('ngPlanets', function () {
  	function link(scope, element, attrs){
  		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		var renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		element.append(renderer.domElement)
  	}
    return {
    	restrict: 'E',
    	link: link
    };
  });