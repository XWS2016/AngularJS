(function (angular) {
	var Person = function (defaultUser){
		this.firstName = defaultUser.ime;
		this.lastName = defaultUser.prezime;
	};
	Person.prototype.sayHello = function(){
		return 'Hello, my name is '+this.firstName+' '+this.lastName;
	};
	angular.module('myServices',['myValues'])
	.service('personService', ['defaultUser', Person]);
}(angular));