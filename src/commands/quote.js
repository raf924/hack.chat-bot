var unirest = require("unirest");

var quote = function (bot, sender, args, data) {
    unirest.post("https://andruxnet-random-famous-quotes.p.mashape.com/cat=movies")
        .header("X-Mashape-Key", "54pyT5Ih3Vmsh7yUVh3vC3Nf2FuAp1MbTcjjsnj0of8Htcq5G2")
        .header("Content-Type", "application/x-www-form-urlencoded")
        .header("Accept", "application/json")
        .end(function (result) {
            var data = JSON.parse(result.body);
            var quote = data.quote;
            var author = data.author;
            var form_quote = quote.replace(/[ ]/gi, "\\ ");
            var form_author = author.replace(/[ ]/gi, "\\ ");
            var text = "$$ \huge{" + form_quote + "}\ \small {by}\ {" + form_author + "} $$";
            bot.send(text);
        });

}

exports.quote = quote;
