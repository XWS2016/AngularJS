(function(angular) {

	var blogEntriesController = function ($scope, $http) {
		var promise = $http.get("/api/blogEntries/");
		promise.then(function (response) {
			$scope.blogEntries = response.data;
		});
	};

    var app = angular.module("app", []);
    app.controller("blogEntriesCtrl", blogEntriesController);

})(angular);
