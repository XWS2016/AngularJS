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

  var entriesDirective = function() {
    return {
      restrict: "E",
      templateUrl: "primer07-entries.html"
    };
  };

  var app = angular.module("app", []);
  app.controller("blogEntriesCtrl", blogEntriesController);
  app.directive("xwsEntries", entriesDirective);

})(angular);
