var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var stdin = process.openStdin();
var connectedUsers = 0;

/* Serve rit-now.js */
app.get('/rit-now', function(req, res){
	res.sendFile('rit-now.js', { root: __dirname });
});

/* Serve index page */
app.get('/', function(req, res){
	res.sendFile('index.html', { root: __dirname });
});

/* API in JSON with current logged in users */
app.get('/connected-clients', function(req, res){
	res.send( {numConnectedUsers: connectedUsers} );
});

/* Connection events handled here */
io.on('connection', function(socket){

	connectedUsers++; 
	io.emit('update-connected-clients', connectedUsers);
	
	socket.on('disconnect', function(){
		io.emit('update-connected-clients', --connectedUsers);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});