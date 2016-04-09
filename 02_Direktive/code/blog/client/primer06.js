(function(angular) {

  var blogEntriesController = function($scope, $http) {
    $scope.sortOrder = 'title';
    var search = function() {
			var promise = $http.get("/api/blogEntries", {
        params: $scope.searchEntry
      });
      promise.then(function(response) {
        $scope.blogEntries = response.data;
      });
    };

		$scope.search = search;
		search();
  };

  var app = angular.module("app", []);
  app.controller("blogEntriesCtrl", blogEntriesController);

})(angular);
