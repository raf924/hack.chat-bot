var soap = require('soap');
var url = "http://www.yodaspeak.co.uk/webservice/yodatalk.php?wsdl";
exports.yoda = function (bot, sender, args, data) {
    var form_sentence = args.join(" ");
    soap.createClient(url, function (err, client) {
      client.yodaTalk({input:form_sentence}, function (err, result) {
        bot.send("@"+sender+" Yoda would say: "+result.return);
      });
    });
};
