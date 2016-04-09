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

  var entriesDirectiveCtrl = function() {
    this.title = 'search results:';
  };

  var entriesDirective = function() {
    return {
      bindToController: { //vezivanje za kontroler,
        entries: "=blogEntries", // blogEntries se mapira na blog-entries,
        order: "=sortOrder" // scopeOrder se mapira na scope-order,
      },
      restrict: "E",
      templateUrl: "primer10-entries.html",
      controller: entriesDirectiveCtrl,
      controllerAs: 'ctrl'
    };
  };

  var app = angular.module("app", []);
  app.controller("blogEntriesCtrl", blogEntriesController);
  app.directive("xwsEntries", entriesDirective);

})(angular);
