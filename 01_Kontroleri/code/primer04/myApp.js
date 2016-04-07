(function(angular) {

	var myController = function ($scope) {
		$scope.attType = "password";
	};

    var app = angular.module("app", []);
    app.controller("myCtrl", myController);

})(angular);
