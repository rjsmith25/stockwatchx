var mongoose = require('mongoose');

var stockSchema = new mongoose.Schema({
	name:String,
	symbol:String
})

mongoose.model('Stock',stockSchema);