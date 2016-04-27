(function(angular) {
	var userCtrl = function ($scope, $http) {
		$scope.user = $http.get('https://api.github.com/users/angular');
	}

	var app = angular.module("app", []);
	app.controller("userCtrl", userCtrl);

})(angular);
