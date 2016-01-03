app.factory('myCoordinates', ['$q', '$http', function myCoordinates($q, $http) {

	var deferred = $q.defer();

	$http.get('http://ip-api.com/json')
		.success(function(coordinates) {
			var myCoordinates = {};
			myCoordinates.lat = coordinates.lat;
			myCoordinates.lng = coordinates.lon;
			myCoordinates.zoom = 14;
			myCoordinates.city = coordinates.city;
			deferred.resolve(myCoordinates);
	})

	return deferred.promise;

}])
