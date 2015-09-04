var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT;

var WebSocketServer = require('ws').Server
var WebSocket = require("ws");
var http = require('http');

var server = http.createServer(function(request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  response.write("Welcome to Node.js on OpenShift!\n\n");
  response.end("Thanks for visiting us! \n");
});

server.listen(port, ipaddress, function() {
  console.log((new Date()) + ' Server is listening on port 8080');
});

wss = new WebSocketServer({
  server: server,
  autoAcceptConnections: false
});
wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    ws.send("Received: " + message);
  });
  ws.send('Welcome!');
});


var ws = WebSocket("http://nodejs-raf924.rhcloud.com:8000");
ws.on("open", function () {
  setInterval(function () {
    ws.send("ping");
  }, 1000 * 50);
});
