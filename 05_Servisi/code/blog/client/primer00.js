(function (angular) {
	var $injector = angular.injector(['ng']);
	var helloWorldController=function () {
		var $log = $injector.get('$log');
		$log.info('hello world');
	};
	var app = angular.module('app',[]);
	app.controller('helloWorldCtrl',helloWorldController);
}(angular));