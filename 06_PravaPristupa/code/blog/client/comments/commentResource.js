(function (angular) {
	angular.module('comment.resource',['ngResource'])
	.factory('Comment', function($resource){
		var Comment = $resource('/api/comments/:_id',
			{_id:'@_id'},
			{
				update:{method:'PUT'},
				save:{//custom post metoda koja postavlja komentar za zapis
					method:'POST',
					url:'/api/comments/blogEntry/:blogEntryId'
				}
			}
			);
		return Comment;
	});
}(angular));