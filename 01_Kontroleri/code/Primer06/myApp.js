(function(angular) {

	var deferredController = function ($scope, $q) {
		function asyncGreet(name) {
			var deferred = $q.defer();

			setTimeout(function() {
				deferred.notify('About to greet ' + name + '.');

				setTimeout(function () {
					if (Math.random()>0.5) {
						deferred.resolve('Hello, ' + name + '!');
					} else {
						deferred.reject('Greeting ' + name + ' is not allowed.');
					}
				}, 5000);
			}, 1000);

			return deferred.promise;
	}

	$scope.greet = function () {
		var promise = asyncGreet('Robin Hood');
		promise.then(function(greeting) {
			alert('Success: ' + greeting);
		}, function(reason) {
			alert('Failed: ' + reason);
		}, function(update) {
			alert('Got notification: ' + update);
		});

	};
};

var app = angular.module("app", []);
app.controller("deferredCtrl", deferredController);

})(angular);
