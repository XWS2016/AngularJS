(function(angular) {

  var blogEntriesController = function($scope, $resource) {
    var BlogEntry = $resource('/api/blogEntries/:_id',
      {_id:'@_id'},
      {update:{method:'PUT'}});
    var search = function() {
      if($scope.searchEntry&&$scope.searchEntry.title){
        $scope.blogEntries = BlogEntry.query({title:$scope.searchEntry.title});   
      }
      else{
        $scope.blogEntries = BlogEntry.query();             
      }
    };
    $scope.search = search;
    search();
  };

  var app = angular.module('app', ['ngRoute','ngResource']);
  app.controller('blogEntriesCtrl', blogEntriesController);

  app.config(function($routeProvider) {
    $routeProvider
    .when('/main',{
      templateUrl: 'primer01-entries.html',
      controller: 'blogEntriesCtrl'
    })
    .otherwise({
      redirectTo:'/main'
    });
  });
})(angular);
