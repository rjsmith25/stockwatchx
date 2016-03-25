module.exports = function(io){

	var router = require('express').Router();
	var stockCtrl = require('../controllers/stocks')(io);

	/*stock routes*/
	router.get('/stocks',stockCtrl.getStockData);
	router.get('/stocks/database',stockCtrl.getStockInDatabase);
	router.post('/stocks',stockCtrl.createStockData);
	router.delete('/stocks/:stockid',stockCtrl.deleteStockData);

	return router;
}