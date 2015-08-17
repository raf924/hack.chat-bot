var soap = require('soap');
var url = "http://www.yodaspeak.co.uk/webservice/yodatalk.php?wsdl";
exports.yoda = function(bot, sender, args, data) {
  if (args.length > 0) {
    var form_sentence = args.join(" ");
    soap.createClient(url, function(err, client) {
      client.yodaTalk({
        input: form_sentence
      }, function(err, result) {
        bot.send("@" + sender + " Yoda would say: " + result.return);
      });
    });
  }
  else {
    bot.send("@"+sender+" Usage: /yoda <sentence>");
  }
};
