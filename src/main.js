var fs = require("fs");
var path = require("path");
var request = require('request');

var wait = false;

var ChatConnection = require("./connection.js");
var config = require("./config.json");

var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Salut tout le monde !');
});
server.on("clientError", function(e) {
  console.log(e);
});
server.listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP);

setInterval(function() {
  request(process.env.OPENSHIFT_NODEJS_IP + ":" + process.env.OPENSHIFT_NODEJS_PORT, function(err, res, data) {});
}, 1000 * 60 * 10);

fs.readdir("./src/commands", function(err, files) {
  if (err)
    throw err;

  var channel = process.env.OPENSHIFT_HOMEDIR ? config.channel : config.testchannel;
  var bot = new ChatConnection(config.url, config.nick, config.channel);

  bot.commands = {};
  bot.init = [];

  for (var i = 0; i < files.length; i++) {
    if (path.extname(files[i]) == ".js") {
      var cmds = require("./commands/" + files[i]);

      if (typeof cmds != 'object')
        throw "Invalid command " + files[i];

      if (typeof cmds.init == 'function') {
        cmds.init(bot);
        bot.init.push(cmds.init);
        delete cmds.init;
      }

      for (var key in cmds) {
        if (typeof cmds[key] != 'function')
          throw "Invalid command " + files[i];

        bot.commands[key] = cmds[key];
      }
    }
  }

  bot.parseCmd = function(data) {
    console.log(data.nick + ": " + data.text);

    if (data.nick == config.nick)
      return;
    if (wait && (data.trip != null || config.tripCodes[data.nick] != null || config.tripCodes[data.nick] != data.trip))
      return;
    if (this.bans.indexOf(data.nick.toLowerCase()) !== -1)
      return;
    bot.commands.greet(this, data.nick, data);
    var msg = data.text;
    if (msg[0] == "/") {
      wait = true;
      setTimeout(function() {
        wait = false;
      }, 1000 * 3);
      var cmd = msg.substr(1).split(" ")[0];
      var args = msg.substr(2 + cmd.length).split(" ");

      if (typeof this.commands[cmd] == 'function' && this.commands.hasOwnProperty(cmd))
        this.commands[cmd](this, data.nick, args, data);
    }
  }

  bot.on("chat", function(data) {
    bot.parseCmd(data);
  });

  bot.on("info", function(data) {
    console.log("INFO : " + data.text);
  });

  bot.on("warn", function(data) {
    console.log("WARN : " + data.text);
  });
  bot.on("onlineAdd", function(data) {
    bot.commands.greet(this, data.nick);
  });
  bot.on("onlineSet", function(data) {
    bot.commands.greet(this, data.nicks);
  });
});
