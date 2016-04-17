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

	$http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + coordinates.lat + '%2C' + coordinates.lng + '&language=en')
		.success(function(data){
			$scope.city = data.results[0].address_components[2].long_name;
			$scope.address = data.results[0].formatted_address;
		})

	getSightsPoints.success(function(data){
		$scope.geodata = data;
		var currentPositionPoint = {
			lat: coordinates.lat,
			lng: coordinates.lng,
			focus: true,
			message: 'Your approximate location in ' + $scope.city + ' is lat: ' + coordinates.lat + ' and lon: ' + coordinates.lng + ' (' + $scope.address + ')' + '. You can also see some of the sights within a radius of 10 kilometers.',
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
