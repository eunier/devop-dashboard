import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');

const subscribe = callback => {
  socket.on('timer', data => {
    callback(data);
  });

  socket.emit('subscribe', 1000);
};

export { subscribe };
