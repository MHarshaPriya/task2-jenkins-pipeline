// index.js - simple HTTP server
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello from Jenkins CI/CD pipeline!');
});

server.listen(3000, () => {
  console.log('App running on port 3000');
});
