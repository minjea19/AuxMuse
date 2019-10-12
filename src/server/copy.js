const express = require('express');
const os = require('os');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
	transports: ['websocket', 'polling']
	
});

// Start socket connection 
//
io.on('connection', (socket) => {
	console.log("Socket connection established!");
	socket.on('react', data =>{
		console.log("WYeet");
		console.log(data.text);

	});
	//io.broadcast.emit('extension', {text: "Message from Node"}); 
});

http.listen(6000, function(){
  console.log('Socket listening on port 6000');
});





// Start the application
app.use(express.static('dist'));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
