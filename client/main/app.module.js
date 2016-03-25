(function(){
	'use strict'
	angular
		.module('app',[
		/*third party modules*/
		'ngRoute',
		'btford.socket-io',
		'highcharts-ng',
		/*my modules*/
		'app.common',
		'app.stock'
	])
	.config(configFunction)

	configFunction.$inject = ['$routeProvider', '$locationProvider'];

	function configFunction($routeProvider,$locationProvider){
		$locationProvider.html5Mode(true);
		$routeProvider.otherwise({
			redirectTo:'/'
		})
	}

})()