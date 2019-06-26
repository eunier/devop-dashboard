const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const appStatus = require('./app-status');

let clients = [];
let history = [];
let initialized = false;
let emiting = false;
const maxHistorySeconds = 60 * 30;

io.on('connect', socket => {
  clients.push(socket);
  console.log(`socket connected, total ${clients.length}`);

  socket.on('req_full_history', data => {
    let resHistory = [];

    history.forEach(elem => {
      resHistory.push(elem[data.appIndex]);
    });

    socket.emit('res_full_history', { appHistory: resHistory });
  });

  socket.on('req_last_history_elem', data => {
    appFocusIndex = data.appIndex;
  });

  socket.on('disconnect', () => {
    clients.splice(clients.indexOf(socket), 1);
    console.log(`socket disconnected, total ${clients.length}`);
  });
});

setInterval(() => {
  if (initialized === false) {
    while (history.length < maxHistorySeconds - 1) {
      history.push(
        appStatus.generateAppStatusData(
          history,
          maxHistorySeconds,
          history.length
        ).detail
      );
    }

    initialized = true;
  }

  current = appStatus.generateAppStatusData(history);
  history.push(current.detail);

  if (history.length > maxHistorySeconds) {
    history.splice(0, 1);
  }

  if (clients.length > 0) {
    emiting = true;

    io.emit('apps_status', {
      current: current
    });

    io.emit('res_last_history_elem', {
      latestHistory: history[history.length - 1]
    });
  } else {
    emiting = false;
  }

  const date = new Date();
  console.log(
    `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}] - ${
      emiting ? `emiting, socket count: ${clients.length}` : 'no socket connected'
    }`
  );
}, 1000);

const port = 8000;
http.listen(port, () => {
  console.log(`listening on port ${port}`);
});
