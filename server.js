const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const appStatus = require('./app-status');

app.get('/', (_, res) => {
  res.send('<h1>test</>');
});

let emitCnt = 0;

// io.on('connection', socket => {
//   console.log('socket connected');

//   const loop = setInterval(() => {
//     console.log(++emitCnt);
//     socket.emit('data', appStatus.generateAppStatusData());
//   }, 1000);

//   socket.on('disconnect', () => {
//     clearInterval(loop);
//     console.log('socket disconnected');
//   });
// });

let socketCnt = 0;

io.on('connect', socket => {
  console.log(`socket connected, total ${++socketCnt}`);

  socket.on('disconnect', () => {
    console.log(`socket disconnected, total ${--socketCnt}`);
  });
});

setInterval(() => {
  if (socketCnt > 0) {
    io.emit('apps_status', appStatus.generateAppStatusData());
    const date = new Date();
    console.log(
      `[${date.toLocaleDateString()} ${
        date.toLocaleTimeString()
      }] - emiting, socket count: ${socketCnt}`
    );
  }
}, 1000);

const port = 8000;
http.listen(port, () => {
  console.log(`listening on port ${port}`);
});
