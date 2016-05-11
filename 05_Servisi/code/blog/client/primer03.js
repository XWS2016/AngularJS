(function (angular) {
	var app = angular.module('app',['blogEntry','comment','ui.router']);
	app.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/main');
		$stateProvider
    	.state('main', {
    		url: '/main',
    		templateUrl: 'primer03-blogEntry/blogEntries.html',
    		controller: 'blogEntriesCtrl'
    	})
    	.state('entry', {
    		url: '/blogEntries/:id',
    		templateUrl: 'primer03-blogEntry/blogEntry.html',
    		controller: 'blogEntryCtrl'
    	});
});

}(angular));