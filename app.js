const http = require('http');
const fs = require('fs');
const routes = require('./routes');

console.log(routes.text);

const server = http.createServer(routes.handler);

server.listen(3000);