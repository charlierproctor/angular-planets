angular.module('charlierproctor.angular-planets', []).
  directive('ngPlanets', function () {

  	// given orbitalRadius in AU, returns orbitalPeriod in years
  	function orbitalPeriod(orbitalRadius){
  		return Math.sqrt(Math.pow(orbitalRadius,3))
  	}

  	function link(scope, element, attrs){

  		// create the scene, camera, renderer
  		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		var renderer = new THREE.WebGLRenderer();
		
		renderer.setSize( window.innerWidth, window.innerHeight );
		element.append(renderer.domElement)

		// set the camera position / angle
		camera.position.y = -100;
		camera.position.z = 100;
		camera.lookAt(new THREE.Vector3(0,0,0))

		// some ambient light
		var light = new THREE.AmbientLight( 0xffffff ); // soft white light
		scene.add( light );

		// create and add the sun to the scene
		var sun = new THREE.Mesh(
			new THREE.SphereGeometry( scope.sun.radius, 32, 32 ), 	
			new THREE.MeshLambertMaterial({ color: scope.sun.color }))
		scene.add(sun)

		// map over all the planets
		for (var i = 0; i < scope.planets.length; i++) {
			var data = scope.planets[i]

			// create the planet and add it to the scene
			var planet = new THREE.Mesh( 
				new THREE.SphereGeometry( data.planetRadius, 32, 32 ), 
				new THREE.MeshLambertMaterial({ color: data.color })
			)
			scene.add(planet)

			// update the scope.planets variable
			scope.planets[i] = {
				orbitalRadius: data.orbitalRadius,
				orbitalPeriod: orbitalPeriod(data.orbitalRadius),
				planet: planet
			}
		};

		var years = 0;
		function render() {
			requestAnimationFrame( render );
	
			scope.planets.map(function(planet){

				// calculate the angle
				var theta = 2 * Math.PI * years / planet.orbitalPeriod

				// update the planets position
				planet.planet.position.set(
					scope.scale * planet.orbitalRadius * Math.cos(theta),
					scope.scale * planet.orbitalRadius * Math.sin(theta),
					0)
			})

			renderer.render( scene, camera );

			// scope.speed years passes every second, assuming 60 fps
			years += scope.speed/60;
		}
		render();
  	}

    return {
    	restrict: 'E',
    	link: link
    };
  }).
directive('ngPlanet',function(){
	return {
		restrict: 'E',
		transclude: true,
		link: function(scope, element, attrs){
			scope.sun = "charlie"
		}
	}
})