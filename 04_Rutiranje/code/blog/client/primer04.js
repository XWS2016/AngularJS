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
      templateUrl: 'primer04-entries.html',
      controller: 'blogEntriesCtrl'
    })
    .state('main.search', {
      url: '/search', //url je #/main/search
      templateUrl: 'primer04-entries-search.html'
    })
    .state('entry', {
      url: '/blogEntries/:id',
      templateUrl: 'primer04-entry.html',
      controller: 'blogEntryCtrl'
    });
  });
})(angular);
