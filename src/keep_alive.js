var ws = require('ws');

var WebSocketServer = ws.Server,
  wss = new WebSocketServer({
    port: process.env.OPENSHIFT_NODEJS_PORT
  });

var socket = new ws("http://" + process.env.OPENSHIFT_NODEJS_IP + ":" + process.env.OPENSHIFT_NODEJS_PORT);

socket.on("open", function() {
  setInterval(function() {
    ws.send("ping");
  }, 1000 * 50);
});
