angular.module('charlierproctor.angular-planets', []).
  directive('ngPlanets', function () {
  	function link(scope, element, attrs){
  		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		var renderer = new THREE.WebGLRenderer();
		
		camera.position.y = -100;
		camera.position.z = 100;
		camera.lookAt(new THREE.Vector3(0,0,0))

		var light = new THREE.AmbientLight( 0xffffff ); // soft white light
		scene.add( light );

		var format = [
			{
				geometry: new THREE.SphereGeometry( 10, 32, 32 ),
				material: new THREE.MeshLambertMaterial({ color:0x0000ff })
			},
			{
				geometry: new THREE.SphereGeometry( 10, 32, 32 ),
				material: new THREE.MeshLambertMaterial({ color:0x00ff00 })
			}
		]
		var spheres = []
		for (var i = 0; i < format.length; i++) {
			var obj = format[i];
			var sphere = new THREE.Mesh( obj.geometry, obj.material );
			spheres.push(sphere)
			scene.add( sphere )
		};

		renderer.setSize( window.innerWidth, window.innerHeight );
		element.append(renderer.domElement)

		var t = 0;
		function render() {
			requestAnimationFrame( render );

			spheres[1].position.set(50*Math.cos(t/100), 50*Math.sin(t/100), 0)

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