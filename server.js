const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send('<h1>test</>');
});

io.on('connectino', socket => {
  console.log('socket io connected');
});

http.listen(3000, () => {
  console.log('listening on port 3000');
});
