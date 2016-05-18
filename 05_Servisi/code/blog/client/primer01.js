(function (angular) {
	var timeoutController = function ($scope, $timeout) {
		var timeoutPromise;

		$scope.startTimeout = function () {
			timeoutPromise = $timeout(
				function() {
					console.log('timeout fired');
				}, 
				3000);			
		};

		$scope.cancelTimeout = function (){
			$timeout.cancel(timeoutPromise);
			console.log('timeout canceled');
		};
	}

	var intervalController = function ($scope, $interval) {
		var intervalPromise;

		$scope.startInterval = function () {
			intervalPromise = $interval(function () {
				console.log('interval fired');
			},1000,5);
		} 

		$scope.cancelIterval = function () {
			$interval.cancel(intervalPromise);
			console.log('interval canceled');
		}
	}

	var loggerController = function ($scope, $log) {
		$scope.logS = function () {
			$log.info('$log service');
		}
	}

	var app = angular.module('app',[]);
	app.controller('timeoutCtrl', timeoutController);
	app.controller('intervalCtrl', intervalController);
	app.controller('loggerCtrl', loggerController);

}(angular))