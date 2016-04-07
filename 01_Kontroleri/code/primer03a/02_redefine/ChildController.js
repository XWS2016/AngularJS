(function() {
	
	var ChildController = function($scope) {		
		$scope.message = "I am the child"; 
	};

	var app = angular.module("myFirstModule"); 
	app.controller("ChildController", ChildController);

})();