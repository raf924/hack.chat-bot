var request = require("request");
var redditWrap = require('redwrap');

exports.reddit = function(bot, sender, args, data) {

  if (sender == bot.nick)
    return;
  var r = args[0] || "";
  var out = [];
  redditWrap.r(r, function(err, data, res) {
    var posts = data.data.children;
    for (var post of posts) {
      out.push(post.data.title + " - http://redd.it/" + post.data.id);
      if(out.length===args[1]||3){
        return;
      }
    }
  });
  bot.send(out.join("\n"));
}
