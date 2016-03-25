var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/stockwatchx';
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI);

// show when event is terminated
function Shutdown(msg,callback){
	mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
}

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});


//nodemon restarts
process.once('SIGUSR2', function() {
    Shutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
//app termination
process.on('SIGINT', function() {
    Shutdown('app termination', function() {
        process.exit(0);
    });
});
// Heroku app termination
process.on('SIGTERM', function() {
    Shutdown('Heroku app termination', function() {
        process.exit(0);
    });
});

require('./stocks');
