exports.skills = function (bot, sender, args, data) {
    if (typeof args[0] == 'undefined' || args[0].trim() == "") {
        _skills(bot, sender, data.trip, sender);
    } else if (args[0].trim() === "add") {
        var user = args[1].trim();
        args.splice(0, 2);
        _addSkill(bot, sender, args, data.trip, user);
    } else {
        var user = args[0].trim();
        _skills(bot, sender, data.trip, user);
    }
}

var _addSkill = function (bot, sender, skills, trip, user) {
    if (bot.config.tripCode[sender] !== trip) {
        bot.send("@" + sender + " Sorry, you can't do that. You're not valid.")
    } else if (bot.config.tripCode[user] !== "") {
        bot.send("@" + sender + " Sorry, you can't do that. " + user + " is not valid.")
    } else if (skills.length === 0) {
        bot.send("@" + sender + " Usage: /skills add <user> <skill> <skill> etc...");
    } else {
        bot.config.skills[user] = bot.config.skills[user].concat(skills);
        bot.commands["configCmd"](bot, "raf924", ["save"]);
        _skills(bot, sender, trip, sender);
    }
}

var _skills = function (bot, sender, trip, user) {
    if (bot.config.tripCodes[user] === trip) {
        var skills = bot.config.skills[trip];
        if (skills.length > 0) {
            bot.send("@" + sender + " user " + user + " has registered the following skills:" + JSON.stringify(skills));
        } else {
            bot.send("@" + sender + " user " + user + "has not registered any skill (you'll have to ask him)");
        }
    } else {
        bot.send("@" + sender + " user " + user + " is not on the list of known users");
    }
}
