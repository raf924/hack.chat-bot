var ws = require('ws');

var WebSocketServer = ws.Server,
  wss = new WebSocketServer({
    port: 8080
  });
var socket = new ws("ws://" + process.env.OPENSHIFT_NODEJS_IP + ":" + process.env.OPENSHIFT_NODEJS_PORT);

socket.on("open", function() {
  setInterval(function() {
    ws.send("ping");
  }, 1000 * 50);
});
