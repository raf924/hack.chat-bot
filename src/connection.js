var WebSocket = require("ws");
var events = require("events");
var util = require('util');
var exec = require('child_process').exec;

function ChatConnection(url, nick, channel) {
  this.url = url;
  this.nick = nick;
  this.channel = channel;

  events.EventEmitter.call(this);
  this.ws = new WebSocket(url);
  var that = this;

  this.send = function(text) {
    var msgData = JSON.stringify({
      cmd: "chat",
      text: text
    });
    that.ws.send(msgData);
  };

  this.ws.on("open", function() {
    var joinData = {
      cmd: "join",
      nick: nick,
      channel: channel
    };
    that.ws.send(JSON.stringify(joinData));
    var cwd = process.cwd();
    try {
      process.chdir(process.env.OPENSHIFT_HOMEDIR+"git/nodejs.git");
    }
    catch(err){

    }
    exec("git log -1 --pretty=format:'%s'", function(err, stdout, stderr) {
      if(err!==null){
        that.send("Error:"+stderr);
      }
      that.send("Latest change: "+stdout);
      process.chdir(cwd);
    });
  });

  this.ws.on("message", function(data, flags) {
    var _data = JSON.parse(data);
    that.emit(_data.cmd, _data);
  });

  var pingIntervalId = setInterval(function() {
    var pingPackage = JSON.stringify({
      cmd: "ping"
    });
    that.ws.send(pingPackage);
  }, 240000);
  this.ws.on("close", function() {
    clearInterval(pingIntervalId);
  });
}
util.inherits(ChatConnection, events.EventEmitter);

module.exports = ChatConnection;
