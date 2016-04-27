(function (angular) {
	var blogEntriesCtrl = function ($scope, $resource) {
		var BlogEntry = $resource('/api/blogEntries/:id',
			{id:'@_id'},
			{update:{method:'PUT'}});
		var loadEntries = function () {
			$scope.blogEntries = BlogEntry.query();		
			$scope.blogEntry = new BlogEntry();
		}
		loadEntries();
		$scope.save = function () {
			if(!$scope.blogEntry._id){
				$scope.blogEntry.$save(loadEntries);
			}
			else{
				$scope.blogEntry.$update(loadEntries);				
			}
		} 
		$scope.delete = function (blogEntry) {
			blogEntry.$delete(loadEntries);
		}
		$scope.edit = function (blogEntry) {
			$scope.blogEntry = blogEntry;
		} 
	};
	var app = angular.module('app',['ngResource']);
	app.controller('blogEntriesCtrl', blogEntriesCtrl);
}(angular));