(function(){
	'use strict'
	angular
		.module('app.common')
		.factory('socketService',socketService);

		socketService.$inject = ['socketFactory'];

		function socketService(socketFactory){
			return socketFactory;
		}
})()