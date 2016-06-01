(function (angular) {
	angular.module('login',['authentication'])
	.controller('loginCtrl', ["$scope", "$log", "AuthenticationService", function($scope, $log, AuthenticationService){
		$scope.user={};
		$scope.login=function () {
			AuthenticationService.login($scope.user.name,$scope.user.password,loginCbck);
		};
		function loginCbck(success) {
			if (success) {
				$log.info('success!');
			}
			else{
				$log.info('failure!');
			}
		}
	}]);
}(angular));