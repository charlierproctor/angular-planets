angular.module('charlierproctor.angular-planets', []).
  directive('ngPlanets', function () {

  	// given orbitalRadius in AU, returns orbitalPeriod in years
  	function orbitalPeriod(orbitalRadius){
  		return Math.sqrt(Math.pow(orbitalRadius,3))
  	}

  	function link(scope, element, attrs){

  		// create the scene, camera, renderer
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
		scope.scene.add( light );

		// create and add the sun to the scene
		var sun = new THREE.Mesh(
			new THREE.SphereGeometry( scope.sun.radius, 32, 32 ), 	
			new THREE.MeshLambertMaterial({ color: scope.sun.color }))
		scope.scene.add(sun)

		var years = 0;
		function render() {
			requestAnimationFrame( render );
	
			scope.planets.map(function(planet){

				// calculate the angle
				var theta = 2 * Math.PI * years / planet.orbitalPeriod

				// update the planets position
				planet.planet.position.set(
					attrs.scale * planet.orbitalRadius * Math.cos(theta),
					attrs.scale * planet.orbitalRadius * Math.sin(theta),
					0)
			})

			renderer.render( scope.scene, camera );

			// attrs.speed years passes every second, assuming 60 fps
			years += attrs.speed/60;
		}
		render();
  	}

  	function controller($scope, $element){
  		
  		$scope.planets = []
  		$scope.scene = new THREE.Scene();

  		this.addPlanet = function(attrs){
			
			// parse the data out of attrs
			var orbitalRadius = parseFloat(attrs.orbitalRadius)
			var planetRadius = parseFloat(attrs.planetRadius)
  			var color = parseInt(attrs.color)

  			// create the planet and add it to the scene
			var planet = new THREE.Mesh( 
				new THREE.SphereGeometry( planetRadius, 32, 32 ), 
				new THREE.MeshLambertMaterial({ color: color })
			)
			
			// add this planet to the scene
			$scope.scene.add(planet)

			// update the $scope.planets variable
			$scope.planets.push({
				orbitalRadius: orbitalRadius,
				orbitalPeriod: orbitalPeriod(orbitalRadius),
				planet: planet
			})
			console.log($scope.planets)
  		}
  	}

    return {
    	restrict: 'E',
    	link: link,
    	controller: controller
    };
  }).
directive('ngPlanet',function(){
	return {
		restrict: 'E',
		require: '^ngPlanets',
		transclude: true,
		link: function($scope, $element, attrs, controller){
			controller.addPlanet(attrs)
		}
	}
})