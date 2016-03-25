(function(){
	'use strict'
	angular
		.module('app.common')
		.service('charthelper',charthelper);

		charthelper.$inject = [];

		function charthelper(){
			var config =  {
			    options: {
			        chart: {
			            zoomType: 'x'
			        },
			        rangeSelector: {
			            enabled: true
			        },
			        navigator: {
			            enabled: true
			        }
			    },
			    series:[],
			    title: {
			        text: 'stockwatchx'
			    },
			    useHighStocks: true
		    }

		    return config;
		}

})()