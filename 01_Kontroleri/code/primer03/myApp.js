(function(angular) {

	var helloController = function ($scope) {
		$scope.message = "Hello from the controller!";
	};

	var weatherController = function ($scope) {
		$scope.weather={};
		$scope.weather.description = "The weather is cloudy";
		$scope.weather.temperature = "15 degrees Celsius";
	};


    var app = angular.module("app", []);
    app.controller("helloCtrl", helloController);
    app.controller("weatherCtrl", weatherController);

})(angular);
