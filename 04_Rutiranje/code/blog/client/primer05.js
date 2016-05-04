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

  var blogEntryCtroller = function ($scope, $stateParams, $resource) {
    var BlogEntry = $resource('/api/blogEntries/:_id',
      {_id:'@_id'},
      {update:{method:'PUT'}});
    var blogEntryId = $stateParams.id;
    $scope.blogEntry = BlogEntry.get({_id:blogEntryId});
  };

  var app = angular.module('app', ['ui.router','ngResource']);
  app.controller('blogEntriesCtrl', blogEntriesController);
  app.controller('blogEntryCtrl', blogEntryCtroller);

  app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/main');
    $stateProvider
    .state('main', {//naziv stanja!
      url: '/main',
      views: {
        blogView:{
          templateUrl: 'primer05-entries.html',
          controller: 'blogEntriesCtrl'
        },
        fooBarView:{
          templateUrl: 'primer05-foo.html'
        }
      }
    })
    .state('entry', {
      url: '/blogEntries/:id',
      views: {
        blogView:{
          templateUrl: 'primer05-entry.html',
          controller: 'blogEntryCtrl'
        },
        fooBarView:{
          templateUrl: 'primer05-bar.html'
        }
      }
    });
  });
})(angular);
