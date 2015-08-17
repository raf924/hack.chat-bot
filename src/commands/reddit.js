var request = require("request");
var redditWrap = require('redwrap');

exports.reddit = function(bot, sender, args, data) {

  if (sender == bot.nick)
    return;
  var r = args[0] || "";
  var count = args[1];
  if(count == null){
    count = 3;
  }
  if (r == "") {
    redditWrap.list("new", function(err, data, res) {
      process_posts(err, data, res, bot, count);
    });
  } else {
    redditWrap.r(r, function(err, data, res) {
      process_posts(err, data, res, bot, count);
    });
  }
};

var process_posts = function(err, data, res, bot, count) {
  var out = [];
  var posts = data.data.children;
  for (var index in posts) {
    out.push(posts[index].data.title + " - http://redd.it/" + posts[index].data.id);
    if (index > count-2) {
      break;
    }
  }
  bot.send(out.join("\n"));
};
