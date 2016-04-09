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
  var link = function(scope, element, attrs) { //link funkcija
    var selectElement = element.find("button"); //jQuery selektujemo select
    selectElement.on("click", function() { //na promenu vežemo događaj
      alert("Hello world!"); //ispis poruke
    });
  };

  var entriesDirective = function() {
    return {
      scope: { //izolovanje opsega,
        entries: "=blogEntries", // blogEntries se mapira na blog-entries,
        order: "=sortOrder" // scopeOrder se mapira na scope-order,
      },
      restrict: "E",
      templateUrl: "primer09-entries.html",
      link: link
    };
  };

  var app = angular.module("app", []);
  app.controller("blogEntriesCtrl", blogEntriesController);
  app.directive("xwsEntries", entriesDirective);

})(angular);
