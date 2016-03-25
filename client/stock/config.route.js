(function(){
	'use strict'
	 angular
	 	 .module('app.stock')
	 	 .config(configFunction)

	 	 configFunction.$inject = ['$routeProvider'];

	 	 function configFunction($routeProvider){
	 	 	$routeProvider.when('/',{
	 	 		templateUrl:'/stock/stock.html',
				controller:'stockController',
				controllerAs:'vm'
	 	 	})
	 	 }
	 	 
})()