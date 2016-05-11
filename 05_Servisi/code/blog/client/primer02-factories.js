(function (angular) {
	angular.module('myFactories',['myValues'])
	.factory('logDefaultUser', function(defaultUser,$log){
		return function(){
			$log.info(defaultUser);
		};
	})
	.factory('personFactory', function(defaultUser){
		return new Person(defaultUser);
	});
	var Person = function (defaultUser){
		this.firstName = defaultUser.ime;
		this.lastName = defaultUser.prezime;
	};
	Person.prototype.sayHello = function(){
		return 'Hello, my name is '+this.firstName+' '+this.lastName;
	};
}(angular));