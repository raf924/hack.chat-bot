exports.greet = function(bot, sender, args, data) {
  if (args || data) {
    return;
  }
  if (typeof(sender) == "object") {
    var text = "";
    var out = sender.slice();
    out.splice(out.indexOf(bot.nick), 1);
    for (var index in sender) {
      var user = sender[index];
      sender[index] = "@" + user;
      var nick = sender[index];
      out[out.indexOf(user)] = nick;
      var tripCode = bot.config.tripCodes[user];
      if (tripCode != null) {
        var greeting = bot.config.greet[tripCode];
        if (greeting != null) {
          out.splice(out.indexOf(nick), 1);
          text += "\n" + nick + " " + greeting;
        }
      }
    }
    bot.send("Hello " + out.join(", ") + text);
  } else {
    var tripCode = bot.config.tripCodes[sender];
    var greeting = bot.config.greet[tripCode];
    if (data && data.text && data.trip === null) {
      bot.send("@" + sender + " Sorry bud, you're $ \\color{red}{not} $ valid");
    } else if (tripCode == null) {
      return;
    } else if (greeting == null) {
      bot.send("@" + sender + " Hello you.");
    } else {
      bot.send("@" + sender + " " + greeting);
    }
  }
}
