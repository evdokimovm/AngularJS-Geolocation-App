app.controller('MainController', ['$scope', '$http', 'coordinates', 'myCoordinates', function($scope, $http, coordinates, myCoordinates) {
	
	$scope.mapCenter = {
		lat: coordinates.lat,
		lng: coordinates.lng,
		zoom: 14
	}

	var getSightsPoints = $http.jsonp('https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gsradius=10000&gscoord=' + coordinates.lat + '%7C' + coordinates.lng + '&gslimit=30&format=json&callback=JSON_CALLBACK')
		.success(function(data) {
			return data;
		})

	getSightsPoints.success(function(data){
		$scope.geodata = data;
		var currentPositionPoint = {
			lat: coordinates.lat,
			lng: coordinates.lng,
			city: coordinates.city,
			focus: true,
			message:'Your approximate location in ' + coordinates.city + ' is lat: ' + coordinates.lat + ' and lon: ' + coordinates.lng + '. You can also see some of the sights within a radius of 10 kilometers.',
			icon: {
				type: 'awesomeMarker',
				icon: 'user',
				markerColor: 'blue',
				iconColor: 'white'
			}
		}
		$scope.mapMarkers = geodataToMarkers($scope.geodata);
		$scope.mapMarkers.push(currentPositionPoint);
	})

}])
