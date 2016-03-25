(function(){
   'use strict'
    angular
     .module('app.common')
     .factory('stockService',stockService);

     stockService.$inject = ['$http'];

     function stockService($http){

        function getStock(name){
            return $http.get('/api/stocks',{params: {name:name}})
                        .then(function(response){
                            return JSON.parse(response.data);
                        });
        }

        function getStockInDatabase(){
            return $http.get('api/stocks/database')
                        .then(function(response){
                            return response.data;
                        });
        }
        
        function createStock(data){
            return $http.post('/api/stocks',data);
        }

        function deleteStock(stockid){
            return $http.delete('/api/stocks/' + stockid);
        }

        return{
            getStock:getStock,
            getStockInDatabase:getStockInDatabase,
            createStock:createStock,
            deleteStock:deleteStock
        }

     }
})()