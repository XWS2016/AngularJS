(function (angular) {
	angular.module('myProviders',['myValues'])
	.provider('hello', function () {
		this.language = 'en';
		this.$get = function (defaultUser) {
			var that = this;
			return { 
				sayHello: function() {
					if(that.language==='sr'){
						return 'Zdravo! Ja se zovem '+defaultUser.ime +' '+ that.appendix;
					}
					else{
						return 'Hello! My name is '+defaultUser.ime+' '+ that.appendix;
					}
				}
			}
		}
		this.setLanguage = function(language){
			this.language = language;
		}
		this.setAppendix = function (appendix) {
			this.appendix = appendix;
		}
	});
}(angular));