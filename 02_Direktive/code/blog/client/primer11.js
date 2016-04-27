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

  var entriesComponentCtrl = function() {
    this.title = 'search results:';
  };

  var entriesComponent = {
    bindings: { //vezivanje za kontroler,
      entries: "<blogEntries", // blogEntries se mapira na blog-entries,
      order: "<sortOrder" // scopeOrder se mapira na scope-order,
    },
    templateUrl: "primer11-entries.html",
    controller: entriesComponentCtrl,
    controllerAs: 'ctrl'
  };


  var app = angular.module("app", []);
  app.controller("blogEntriesCtrl", blogEntriesController);
  app.component("xwsEntries", entriesComponent);

})(angular);
