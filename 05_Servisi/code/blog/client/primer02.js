(function (angular) {
	var valuesController = function ($scope, defaultUser) {
		$scope.showUser = function () {
			console.log(defaultUser);
			console.log(defaultUser.predstaviSe());
		}
	}

	var factoriesController = function ($scope, logDefaultUser, personFactory) {
		$scope.showUser = function () {
			logDefaultUser();
		}
		$scope.showNewPerson = function () {
			console.log(personFactory.sayHello());
		}

	}

	var servicesController = function ($scope, personService) {
		$scope.showNewPerson = function () {
			console.log(personService.sayHello());
		}

	}

	var providersController = function ($scope, hello) {
		$scope.sayHello = function () {
			console.log(hello.sayHello());
		}

	}

	var app = angular.module('app',['myValues','myFactories', 'myServices', 'myProviders', 'myConstants']);
	app.config(function(appendix, helloProvider) {
		helloProvider.setLanguage('sr');
		helloProvider.setAppendix(appendix);
	});
	app.controller('valuesCtrl',valuesController);
	app.controller('factoriesCtrl',factoriesController);
	app.controller('servicesCtrl',servicesController);
	app.controller('providersCtrl',providersController);

}(angular))