var request = require("request");
var redditWrap = require('redwrap');

exports.reddit = function(bot, sender, args, data) {

  if (sender == bot.nick)
    return;
  var r = args[0] || "";
  var out = [];
  redditWrap.r(r, function(err, data, res) {
    var posts = data.data.children;
    for (var index in posts) {
      out.push(post[index].data.title + " - http://redd.it/" + post[index].data.id);
      if(out.length===args[1]||3){
        return;
      }
    }
  });
  bot.send(out.join("\n"));
}
