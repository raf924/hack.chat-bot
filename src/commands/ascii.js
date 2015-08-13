var ascii = require("figlet");

var createAsciiArt = function (bot, sender, args) {
    if (bot.requirePerm(sender, "ascii"))
        return;

    var text = args.join(" ");
    var i = 0;
    var segments = [];
    if (text.indexOf(" ") === -1) {
        segments = text.match(/.{1,15}/g);
    } else {
        var currentString = text.substr(0, 15);
        var restString = text.substr(15);
        while (restString.length > 15) {
            if (restString[0] !== " ") {
                var end = currentString.substr(currentString.lastIndexOf(" "));
                restString = end + restString;
            }
            segments.push(currentString);
            currentString = restString.substr(0, 15);
            restString = restString.substr(15);
        }
        segments.push(restString);
    }
    text = segments.join("\n");
    ascii(text, function (err, data) {
        if (err) {
            bot.send("Error creating ascii art :(");
            return;
        }

        bot.send(data);
    });
}

module.exports = {
    ascii: createAsciiArt
};
