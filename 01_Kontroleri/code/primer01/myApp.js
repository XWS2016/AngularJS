(function(angular) {

	var myController = function ($scope) {
		$scope.message = "Hello from the controller!";
	};

    var application = angular.module("app", []);
    application.controller("myCtrl", myController);

})(angular);
