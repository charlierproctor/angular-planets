angular.module('charlierproctor.angular-planets', []).
  directive('ngPlanets', function () {

  	// given orbitalRadius in AU, returns orbitalPeriod in years
  	function orbitalPeriod(orbitalRadius){
  		return Math.sqrt(Math.pow(orbitalRadius,3))
  	}

  	function link(scope, element, attrs){
  		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		var renderer = new THREE.WebGLRenderer();
		
		camera.position.y = -100;
		camera.position.z = 100;
		camera.lookAt(new THREE.Vector3(0,0,0))

		var light = new THREE.AmbientLight( 0xffffff ); // soft white light
		scene.add( light );

		var sun = new THREE.Mesh(
			new THREE.SphereGeometry( scope.sun.radius, 32, 32 ), 	
			new THREE.MeshLambertMaterial({ color: scope.sun.color }))
		scene.add(sun)

		for (var i = 0; i < scope.planets.length; i++) {
			var data = scope.planets[i]
			var planet = new THREE.Mesh( 
				new THREE.SphereGeometry( data.planetRadius, 32, 32 ), 
				new THREE.MeshLambertMaterial({ color: data.color })
			)
			scene.add(planet)
			scope.planets[i] = {
				orbitalRadius: data.orbitalRadius,
				orbitalPeriod: orbitalPeriod(data.orbitalRadius),
				planet: planet
			}
		};

		renderer.setSize( window.innerWidth, window.innerHeight );
		element.append(renderer.domElement)

		var years = 0;
		function render() {
			requestAnimationFrame( render );
	
			scope.planets.map(function(planet){
				var theta = 2 * Math.PI * years / planet.orbitalPeriod

				planet.planet.position.set(
					scope.scale * planet.orbitalRadius * Math.cos(theta),
					scope.scale * planet.orbitalRadius * Math.sin(theta),
					0)
			})

			renderer.render( scene, camera );

			// one year passes every second
			years += scope.speed/60;
		}
		render();
  	}
    return {
    	restrict: 'E',
    	link: link
    };
  });