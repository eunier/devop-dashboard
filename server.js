const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const appStatus = require('./app-status');

app.get('/', (_, res) => {
  res.send('<h1>test</>');
});

// let emitCnt = 0;

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
let history = [];
let initialized = false;
let emiting = false;
const maxHistorySeconds = 2 * 60 * 60;

io.on('connect', socket => {
  console.log(`socket connected, total ${++socketCnt}`);

  socket.on('disconnect', () => {
    console.log(`socket disconnected, total ${--socketCnt}`);
  });
});

setInterval(() => {
  if (initialized === false) {
    while (history.length < maxHistorySeconds - 1) {
      history.push(
        appStatus.generateAppStatusData(maxHistorySeconds, history.length)
          .detail
      );
      if (history.length === 7199) {
        debugger;
        console.log('slkfs');
      }
    }

    initialized = true;
  }

  current = appStatus.generateAppStatusData();
  history.push(current);

  if (history.length > maxHistorySeconds) {
    history.splice(0, 1);
  }

  if (socketCnt > 0) {
    emiting = true;

    io.emit('apps_status', {
      current: current,
      history: history
    });
  } else {
    emiting = false;
  }

  const date = new Date();
  console.log(
    `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}] - ${
      emiting ? 'emiting, ' : ''
    }socket count: ${socketCnt}`
  );

  console.log(history.length);
}, 1000);

const port = 8000;
http.listen(port, () => {
  console.log(`listening on port ${port}`);
});
