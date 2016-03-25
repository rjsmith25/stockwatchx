(function(){
	'use strict'
	 angular
	 	 .module('app.stock')
	 	 .controller('stockController',stockController);

	 	 stockController.$inject = ['stockService','socketService','charthelper'];

	 	 function stockController(stockService,socketService,charthelper){
	 	 	var idx = null; 
	 	 	var vm = this;
	 	 	vm.stocks;
	 	 	vm.data = {
	 	 		symbol:''
	 	 	}

	 	 	vm.chartConfig = charthelper;
	 	 	vm.createStock = function(){
	 	 		// check that stock is not already added
	 	 		var check  = vm.stocks.every(function(elem){
	 	 			return elem.symbol !== vm.data.symbol.toUpperCase();
	 	 		})

	 	 		if(check){
	 	 			stockService.getStock(vm.data.symbol)
	 	 			.then(function(data){
	 	 				vm.data = {
	 	 				 symbol:''
	 	 				}
	 	 				return stockService.createStock({symbol:data.dataset.dataset_code,name:data.dataset.name})  
	 	 			})
	 	 			.then(function(res){
	 	 				console.log(res);
	 	 			})
	 	 			.catch(function(err){
	 	 				vm.data = {
	 	 				 symbol:''
	 	 				}
	 	 				console.log(err);
	 	 			})
	 	 		}else{
	 	 			vm.data = {
	 	 				 symbol:''
	 	 				}
	 	 		}
	 	 	}

	 	 	vm.deleteStock = function(stockid,index){
	 	 		idx = index;
	 	 		stockService.deleteStock(stockid)
	 	 			.then(function(res){
	 	 				console.log(res);
	 	 			})
	 	 			.catch(function(err){
	 	 				idx = null;
	 	 				console.log(err);
	 	 			})
	 	 	}

	 	 	var socket = socketService();
	 	 	socket.on('addStock',function(data){
	 	 			vm.stocks.push(data);
	 	 			getStock(data.symbol);
	 	 	})

	 	 	socket.on('deleteStock',function(data){
	 	 		stockService.getStockInDatabase()
	 	 					.then(function(data){
	 	 						vm.stocks = data;
	 	 						vm.chartConfig.series.splice(idx,1);
	 	 						idx = null;
	 	 					})
	 	 	})

	 	 	function getStock(name){
	 	 		var serie = {
	 	 			name:name,
	 	 			data:null
	 	 		}

	 	 		stockService.getStock(name)
		 	 		.then(function(data){
		 	 			serie.data =  data.dataset.data.reverse().map(function(datas){
		 	 				return [
		 	 					(new Date(datas[0])).getTime(),datas[1]
		 	 				]
		 	 			})
		 	 			
		 	 		})
		 	 		.catch(function(err){
		 	 			console.log(err);
		 	 		})

		 	 	 vm.chartConfig.series.push(serie);
		 	 	 console.log(vm.chartConfig.series);
	 	 	}

	 	 	stockService.getStockInDatabase()
	 	 				.then(function(data){
	 	 					vm.stocks = data;
	 	 					data.forEach(function(stock){
	 	 						getStock(stock.symbol);
	 	 					})
	 	 				})
	 	 				.catch(function(err){
	 	 					console.log(err);
	 	 				})
	 	 	
	 	 }
	 	 
})()