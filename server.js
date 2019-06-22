const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const appStatus = require('./app-status');

app.get('/', (_, res) => {
  res.send('<h1>test</>');
});

io.on('connection', socket => {
  console.log('socket io connected');

  setInterval(() => {
    socket.emit('data', appStatus.generateAppStatusData());
  }, 1000);
});

const port = 8000;
http.listen(port, () => {
  console.log(`listening on port ${port}`);
});
