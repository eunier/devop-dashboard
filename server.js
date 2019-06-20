const express = require('express');
const app = express();
const http = require('http').createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>test</>');
});

http.listen(3000, () => {
  console.log('listening on port 3000');
});
