(function (angular) {
	angular.module('myValues',[])
	.value('defaultUser',{
		'ime':'pera',
		'prezime':'peric',
		'predstaviSe':function () {
			return this.ime+' '+this.prezime; 
		}
	});
}(angular));