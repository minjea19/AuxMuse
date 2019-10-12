const express = require('express');
const os = require('os');

const app = express();
const socket_server = require("http").createServer(app);
const io = require("socket.io")(socket_server);

// Start the application
app.use(express.static('dist'));


//var {PythonShell} = require('python-shell');
//var pyshell = new PythonShell('socket_server.py');

// This enables CORs and ensures that our frontend,
// running on a different server can connect to our backend
io.set("origins", "*:*");
io.on("connection", async (socket) => {
  // we should see this printed out whenever we have
  // a successful connection
  console.log("Client Successfully Connected");

  socket.on("client", data =>{
    console.log(data.text);
    //pyshell.send('THIS SHIT WORKS');

	  // sending to all clients except sender
	  io.emit('chat', {text: data.text});
  });
});

socket_server.listen(5000, () => {
  console.log("Socket serving running on port 5000");
});

app.post('/addsong', function(req,res){
  var song = req.query.song;
  /*
  User.findById(id, function(err, docs){
      docs.current_playlist = songs;
      docs.save();
    });
  });
  */
  res.send("Added the song!" + song);
});




app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
