var request = require("request");

var jokes = [];
request("http://reddit.com/r/jokes/.json", function(err, res, data) {
  if (err)
    throw err;

  data = JSON.parse(data);

  var posts = data.data.children;

  for (var i = 0; i < posts.length; i++) {
    var selfText = posts[i].data.selftext;
    if (posts[i].data.domain != "self.Jokes" || selfText.split("\n").length > 10 || selfText.length > 500)
      continue;

    var text = posts[i].data.title + "\n" + selfText + " - http://redd.it/" + posts[i].data.id;
    jokes.push(text);
  }
});

var joke = function(bot, sender, args) {
  var selected = Math.round(Math.random() * (jokes.length - 1 * 2));

  if (selected > jokes.length - 1) {
    console.log("Extra jokes");
    request("http://www.thejokeexchange.com/japi_send.php", function(err, res, data) {
      var text = data;
      text = text.replace(/<br>/gi, "");
      text = text.replace(/<span .+>.+<[/]span>/gi, "");
      text = text.replace(/\n\n/gi, "\n");
      bot.send(text);
    });
  } else {
    bot.send(jokes[selected]);
  }

};

module.exports = {
  joke: joke
};
