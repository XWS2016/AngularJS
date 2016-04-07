(function() {
	
	var ParentController = function($scope) {		
		$scope.message = "I am the parent";
		$scope.text = "Hello from the parent";
	};

	var app = angular.module("myFirstModule"); 
	app.controller("ParentController", ParentController);

})();