angular.module('charlierproctor.angular-planets', []).
  directive('ngPlanets', function () {
  	function link(scope, element, attrs){
  		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		var renderer = new THREE.WebGLRenderer();
		
		camera.position.y = -100;
		camera.position.z = 100;
		camera.lookAt(new THREE.Vector3(0,0,0))

		var geometry = new THREE.SphereGeometry( 10, 32, 32 );
		var material = new THREE.MeshDepthMaterial();
		var center = new THREE.Mesh( geometry, material );
		center.position.set(0, 0, 0)
		scene.add( center );

		var geometry = new THREE.SphereGeometry( 10, 32, 32 );
		var material = new THREE.MeshDepthMaterial();
		var sphere = new THREE.Mesh( geometry, material );
		scene.add( sphere );

		renderer.setSize( window.innerWidth, window.innerHeight );
		element.append(renderer.domElement)

		var t = 0;
		function render() {
			requestAnimationFrame( render );

			sphere.position.set(50*Math.cos(t/100), 50*Math.sin(t/100), 0)

			renderer.render( scene, camera );
			t++;
		}
		render();
  	}
    return {
    	restrict: 'E',
    	link: link
    };
  });