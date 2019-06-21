const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (_, res) => {
  res.send('<h1>test</>');
});

let testCnt = 0;

io.on('connection', socket => {
  console.log('socket io connected');

  socket.on('subscribe', interval => {
    console.log(`socket is subscribing with interval, ${interval}`);

    setInterval(() => {
      socket.emit('timer', ++testCnt);
    }, interval);
  });
});

const port = 8000;
http.listen(port, () => {
  console.log(`listening on port ${port}`);
});
