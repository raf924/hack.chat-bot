var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT;

var http = require('http');
var request = require('request');

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

setInterval(function() {
  request("http://nodejs-raf924.rhcloud.com/", function(err, data, res) {});
}, 1000 * 50);
