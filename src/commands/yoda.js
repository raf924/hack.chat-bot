var unirest = require("unirest");

exports.yoda = function (bot, sender, args, data) {
    var form_sentence = args.join(" ");
    unirest.get("https://yoda.p.mashape.com/yoda?sentence=" + form_sentence)
        .header("X-Mashape-Key", "54pyT5Ih3Vmsh7yUVh3vC3Nf2FuAp1MbTcjjsnj0of8Htcq5G2")
        .header("Accept", "text/plain")
        .end(function (result) {
            var text = result.body;
            bot.send("@" + sender " Yoda would say : " + text);
        });
};
