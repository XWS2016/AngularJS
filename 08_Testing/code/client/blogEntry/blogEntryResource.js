(function (angular) {
	angular.module('blogEntry.resource',['ngResource'])
	.factory('BlogEntry', ["$resource", function($resource){
		var BlogEntry = $resource('/api/blogEntries/:_id',
			{_id:'@_id'},
			{update:{method:'PUT'}});
		return BlogEntry;
	}]);
}(angular));