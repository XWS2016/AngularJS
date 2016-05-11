(function (angular) {
	angular.module('blogEntry',['blogEntry.resource'])
	.controller('blogEntriesCtrl', function($scope, $location, BlogEntry) {
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
	    $scope.details = function (blogEntry) {
	      $location.path('/blogEntries/'+blogEntry._id);
	    }
	})
	.controller('blogEntryCtrl', function($scope, $stateParams, BlogEntry){
		var blogEntryId = $stateParams.id;
		$scope.blogEntry = BlogEntry.get({_id:blogEntryId});
	});
}(angular));


