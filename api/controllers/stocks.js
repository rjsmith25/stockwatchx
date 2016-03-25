module.exports = function(io){
    var request = require('request');
    var mongoose = require('mongoose');
    var Stock = mongoose.model('Stock');
    var base_url = "https://www.quandl.com/api/v3/datasets/WIKI/";
    var dotjson = ".json" 
    var apiKey = "?api_key=" + process.env.quandl_apiKey;

    function sendJsonResponse(res,status,content){
        res.status(status);
        res.json(content);
    }

    function getStockData(req,res){
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var date = d.getDate();
        request({
            url: base_url + req.query.name.toUpperCase() + dotjson + apiKey,
            qs:{
                start_date:(year-1) + '-' + month + '-' + date,
                end_date:year + '-' + month + '-' + date
            }
        },function(error,response,body){
            if(error){
                sendJsonResponse(res,404,error);
            }else if(response.statusCode !== 200){
                sendJsonResponse(res,404,error);
            }else{
                sendJsonResponse(res,200,body);
            }

        })
    }

    function createStockData(req,res){
        Stock.create({
            name:req.body.name,
            symbol:req.body.symbol
          },function(err,stk){
            if(err){
                sendJsonResponse(res,400,err)
            }else{
                io.emit('addStock',stk);
                sendJsonResponse(res,201,stk);
            }
       })
    }

    function getStockInDatabase(req,res){
        Stock.find({},function(err,stock){
            if(err){
                sendJsonResponse(res,404,err);
            } else {
                sendJsonResponse(res,200,stock);
            }
        })     
    }

    function deleteStockData(req,res){
        if(req.params && req.params.stockid){
             Stock
                .findByIdAndRemove(req.params.stockid)
                .exec(function(err,stock){
                        if(err){
                            sendJsonResponse(res,404,err);
                        }else {
                            io.emit('deleteStock',stock);
                            sendJsonResponse(res,204,null);
                        }
                })
        }else{
            sendJsonResponse(res,404,{
                "message":"not found stockid required"
            })
        }
    } 

    return {
        getStockData:getStockData,
        getStockInDatabase:getStockInDatabase,
        createStockData:createStockData,
        deleteStockData:deleteStockData
    }

}
