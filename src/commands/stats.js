var fs = require("fs");

exports.init = function(bot)
{
    var recordStats = false;

    if(fs.existsSync('./src/stats.json'))
    {
        bot.stats = require("./../stats.json");
    }
    else
    {
        bot.stats = {};
    }

    bot.on("info", function(data)
    {
        var split = data.text.split(" ");
        if(split[1] != "unique" || split[2] != "IPs" || split[3] != "in" || split[5] != "channels")
            return;

        if(recordStats)
        {
            recordStats = false;

            var time = new Date().getTime().toString();
            var ips = parseInt(split[0]);
            var channel = parseInt(split[4]);

            bot.stats[time.toString()] = {ips: ips, channel: channel};

            fs.writeFile("./src/stats.json", JSON.stringify(bot.stats, undefined, 4));
        }
        else
        {
            bot.send(data.text);
        }
    });

    var startStatsRequest = function()
    {
        recordStats = true;
        bot.ws.send(JSON.stringify({cmd: "stats"}));
    }

    var recordStats = setInterval(startStatsRequest, 60 * 60 * 1000);
    bot.ws.on("open", startStatsRequest);
}

exports.stats = function(bot, sender, args)
{
    bot.ws.send(JSON.stringify({cmd: "stats"}));
}
