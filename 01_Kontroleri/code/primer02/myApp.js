(function(angular) {

	var helloController = function ($scope) {
		$scope.message = "Hello from the controller!";
	};

	var weatherController = function ($scope) {
		$scope.weather = "The weather is cloudy";
	};


    var app = angular.module("app", []);
    app.controller("helloCtrl", helloController);
    app.controller("weatherCtrl", weatherController);

})(angular);
