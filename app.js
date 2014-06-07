
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
//var user = require('./routes/user');
//var restaurant = require('./routes/restaurant');
var mongojs = require('mongojs');
var http = require('http');
var path = require('path');
var fs = require('fs');
var socketio = require('socket.io');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/F2G_DB');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function callback(){
    console.log('Database connection established!');
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


var User = require('./models/user');
currUser = null;
/*
User.findOne({'email': "bdesmero@gmail.com"}, function (err, user) {
    currUser = user;
});
*/


// dynamically include routes (controller)
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});


var server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

/*
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});*/


var io = socketio.listen(server);
io.sockets.on('connection', function(socket){
    socket.on('message', function(data){
        io.sockets.emit('message', data);
    });
});