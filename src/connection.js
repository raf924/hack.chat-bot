var WebSocket = require("ws");
var events = require("events");
var util = require('util');

function ChatConnection(url, nick, channel) {
    this.url = url;
    this.nick = nick;
    this.channel = channel;

    events.EventEmitter.call(this);
    this.ws = new WebSocket(url);
    var that = this;

    this.send = function (text) {
        var msgData = JSON.stringify({
            cmd: "chat",
            text: text
        });
        that.ws.send(msgData);
    };

    this.ws.on("open", function () {
        var joinData = {
            cmd: "join",
            nick: nick,
            channel: channel
        };
        that.ws.send(JSON.stringify(joinData));
        that.wd.send(JSON.stringify({
            cmd: "chat",
            text: "This is bot hosted on openshift.com thanks to raf924, all praise him (or whatever you humans do)!"
        }))
    });

    this.ws.on("message", function (data, flags) {
        var _data = JSON.parse(data);

        that.emit(_data.cmd, _data);
    });

    var pingIntervalId = setInterval(function () {
        var pingPackage = JSON.stringify({
            cmd: "ping"
        });
        that.ws.send(pingPackage);
    }, 240000);
    this.ws.on("close", function () {
        clearInterval(pingIntervalId);
    });
}
util.inherits(ChatConnection, events.EventEmitter);

module.exports = ChatConnection;
