angular.module('charlierproctor.angular-planets', []).
  directive('ngPlanets', function () {

  	// given orbitalRadius in AU, returns orbitalPeriod in years
  	function orbitalPeriod(orbitalRadius){
  		return Math.sqrt(Math.pow(orbitalRadius,3))
  	}

  	function link(scope, element){

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
		var ambientLight = new THREE.AmbientLight( 0xffffff ); 
		scope.scene.add( ambientLight );

		var pointLight = new THREE.PointLight( 0xffffff, 1, 0 );
		pointLight.position.set( 100, 100, 100 );
		scope.scene.add( pointLight );

		var years = 0;
		function render() {
			requestAnimationFrame( render );
	
			scope.planets.map(function(planet){

				// calculate the angle (set to 0 if it's the sun)
				var theta = planet.orbitalPeriod ? 2 * Math.PI * years / planet.orbitalPeriod : 0

				// update the planets position
				planet.planet.position.set(
					element.attr("scale") * planet.orbitalRadius * Math.cos(theta),
					element.attr("scale") * planet.orbitalRadius * Math.sin(theta),
					0)
			})

			renderer.render( scope.scene, camera );

			// attrs.speed years passes every second, assuming 60 fps
			years += element.attr("speed")/60;
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

			// create the object
			var obj = {
				orbitalRadius: orbitalRadius,
				orbitalPeriod: orbitalPeriod(orbitalRadius),
				planet: planet
			}

			// update the $scope.planets variable
			$scope.planets.push(obj)

			return obj
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
		link: function(scope, element, attrs, controller){
			var planet = controller.addPlanet(attrs)
			planet.element = element
			
			scope.$watch(function(){
				return element.attr("color")
			}, function(value){
				planet.planet.material.color.set(parseInt(value))
			})

			scope.$watch(function(){
				return element.attr("planet-radius")
			}, function(value){
				var scale = value / planet.planet.geometry.parameters.radius
				planet.planet.scale.x *= scale
				planet.planet.scale.y *= scale
				planet.planet.scale.z *= scale
			})

			scope.$watch(function(){
				return element.attr("orbital-radius")
			}, function(value){
				planet.orbitalRadius = parseFloat(value)
			})

			// scope.scene.remove(planet.planet)
			// planet.element.attr("planet-radius","20")
		}
	}
})