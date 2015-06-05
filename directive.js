angular.module('charlierproctor.angular-planets', []).
  directive('ngPlanets', function () {
  	function link(scope, element, attrs){
  		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		var renderer = new THREE.WebGLRenderer();

		var geometry = new THREE.SphereGeometry( 10, 32, 32 );
		var material = new THREE.MeshBasicMaterial();
		var sphere = new THREE.Mesh( geometry, material );
		sphere.position.set(0, 0, 0)
		scene.add( sphere );

		camera.position.z = 100;

		renderer.setSize( window.innerWidth, window.innerHeight );
		element.append(renderer.domElement)

		function render() {
			requestAnimationFrame( render );
			renderer.render( scene, camera );
		}
		render();
  	}
    return {
    	restrict: 'E',
    	link: link
    };
  });