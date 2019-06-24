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
let clients = [];
let clientsFirstOnData = [];
let history = [];
let initialized = false;
let emiting = false;
const maxHistorySeconds = 2 * 60 * 60;

io.on('connect', socket => {
  clients.push(socket);
  clientsFirstOnData.push(false);
  console.log(`socket connected, total ${clients.length}`);

  socket.on('req_full_history', data => {
    console.log('data', data);
    let resHistory = [];

    history.forEach(elem => {
      resHistory.push(elem[data.appIndex]);
    });

    socket.emit('res_full_history', { appHistory: resHistory });
  });

  socket.on('disconnect', () => {
    clients.splice(clients.indexOf(socket), 1);
    clientsFirstOnData.splice(clients.indexOf(socket), 1);
    console.log(`socket disconnected, total ${clients.length}`);
  });
});

setInterval(() => {
  if (initialized === false) {
    while (history.length < maxHistorySeconds - 1) {
      history.push(
        appStatus.generateAppStatusData(maxHistorySeconds, history.length)
          .detail
      );
    }

    initialized = true;
  }

  current = appStatus.generateAppStatusData();
  history.push(current.detail);

  if (history.length > maxHistorySeconds) {
    history.splice(0, 1);
  }

  if (clients.length > 0) {
    emiting = true;

    io.emit('apps_status', {
      current: current
    });

    io.emit('apps_status_history', {
      latestHistory: history[history.length - 1]
    });
  } else {
    emiting = false;
  }

  const date = new Date();
  console.log(
    `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}] - ${
      emiting ? 'emiting, ' : ''
    }socket count: ${clients.length}`
  );
}, 1000);

const port = 8000;
http.listen(port, () => {
  console.log(`listening on port ${port}`);
});
