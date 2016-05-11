(function (angular) {
	angular.module('comment',['comment.resource', 'blogEntry.resource'])
	.controller('commentCtrl', function($scope, Comment, BlogEntry, $location) {
		$scope.comment = new Comment();
		$scope.save = function (blogEntry) {
			//pri pozivu custom post metode (save) prosledjuje se parametar blogEntryId
			$scope.comment.$save({'blogEntryId':blogEntry._id},function () {
				$scope.comment = new Comment();
				blogEntry.$get();
			});	
		} 
	});
}(angular));


