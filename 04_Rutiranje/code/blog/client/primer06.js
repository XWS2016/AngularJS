(function(angular) {
  var blogEntriesController = function($resource, $location) {
    var that = this;//cemu ovo sluzi?
    var BlogEntry = $resource('/api/blogEntries/:_id',
      {_id:'@_id'},
      {update:{method:'PUT'}});
    var search = function() { //zbog cega ovu funkciju moramo da pozivamo nad that?
      if(that.searchEntry&&that.searchEntry.title){
        that.blogEntries = BlogEntry.query({title:that.searchEntry.title});   
      }
      else{
        that.blogEntries = BlogEntry.query();             
      }
    };
    this.search = search;
    this.details = function (blogEntry) {
      $location.path('/entry/'+blogEntry._id);
    }
    search();
  };

  var blogEntryCtroller = function ($resource) {
    this.$routerOnActivate = function (next, previous) {
      var BlogEntry = $resource('/api/blogEntries/:_id',
        {_id:'@_id'},
        {update:{method:'PUT'}});
      var blogEntryId = next.params.id;
      this.blogEntry = BlogEntry.get({_id:blogEntryId});
    }
  };

  var blogEntriesListController = function () {
//
  };

  var blogCommentController = function () {
//    
  };

  var appComponent = {
    templateUrl: 'primer06-app.html',
    $routeConfig: [
    {path: '/entries', name: 'BlogEntries', component: 'blogEntriesComponent', useAsDefault: true},
    {path: '/entry/:id', name: 'BlogEentry', component: 'blogEntryComponent'}
  ]
  };

  var blogEntriesComponent =     {
      templateUrl: 'primer06-entries.html',
      controller: blogEntriesController,
      controllerAs: 'entriesCtrl'
  };

  var blogEntriesListComponent = {
    templateUrl:'primer06-entries-list.html',
    bindings: { 
      blogEntries: "<",
      details: "=" 
    },
    controller: blogEntriesListController,
    controllerAs: 'blogEntriesListCtrl'
  };

  var blogEntryComponent = {
    templateUrl: 'primer06-entry.html',
    controller: blogEntryCtroller,
    controllerAs: 'blogEntryCtrl'
  };

  var blogCommentComponent = {
    templateUrl: 'primer06-comment.html',
    bindings: { 
      comment: "<"
    },
    controller: blogCommentController,
    controllerAs: 'blogCommponentCtrl'
  }

  var app = angular.module('app', ['ngComponentRouter','ngResource']);
  app.value('$routerRootComponent', 'app');
  app.component('blogEntriesComponent', blogEntriesComponent);   
  app.component('blogEntriesListComponent', blogEntriesListComponent);   
  app.component('blogEntryComponent', blogEntryComponent);   
  app.component('blogCommentComponent', blogCommentComponent);   
  app.component('app', appComponent);

  })(angular);
