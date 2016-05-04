(function(angular) {
  var blogEntriesController = function($scope, $resource, $location) {
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
    $scope.details = function (blogEntry) {
      $location.path('/blogEntries/'+blogEntry._id);
    }
    search();
  };

  var blogEntryCtroller = function ($scope, $routeParams, $resource) {
    var BlogEntry = $resource('/api/blogEntries/:_id',
      {_id:'@_id'},
      {update:{method:'PUT'}});
    var blogEntryId = $routeParams.id;
    $scope.blogEntry = BlogEntry.get({_id:blogEntryId});
  };

  var app = angular.module('app', ['ngRoute','ngResource']);
  app.controller('blogEntriesCtrl', blogEntriesController);
  app.controller('blogEntryCtrl', blogEntryCtroller);

  app.config(function($routeProvider) {
    $routeProvider
    .when('/main',{
      templateUrl: 'primer02-entries.html',
      controller: 'blogEntriesCtrl'
    })
    .when('/blogEntries/:id',{
      templateUrl:'primer02-entry.html',
      controller: 'blogEntryCtrl'
    })
    .otherwise({
      redirectTo:'/main'
    });
  });
})(angular);
