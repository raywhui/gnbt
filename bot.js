const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');
const search = require('./actions/ups_search.js');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';

// Initialize Discord Bot
const bot = new Discord.Client({
  token: auth.token,
  autorun: true
});

const message = () => {
    bot.sendMessage({
        to: channelID,
        message: `france test ${afdsf}`
    });
}


bot.on('ready', (evt) => {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.setPresence({
    game:{
        name: "games with your heart."
    }
  });

bot.on('message', function (user, userID, channelID, message, evt) {
  if (message.substring(0, 1) == '$') {
    var args = message.substring(1).split(' ');
    var cmd = args[0];
    var secCmd = args[1];
    var thirdCmd = args[2];
  
    args = args.splice(1);
        switch(cmd) {
            case 'track':
                // Forces all tracking ID's to be upper case
                let trackId;
                let firstChar;
                let secChar;
                if (secCmd !== undefined) {
                    trackId = secCmd.toUpperCase();
                    firstChar = trackId[0];
                    secChar = trackId[1];
                };
                switch(true) {
                    case secCmd == 'france':
                        bot.sendMessage({
                            to: channelID,
                            message: `france test ${secCmd}`
                        });
                        break;
                    case secCmd == 'james':
                        bot.sendMessage({
                            to: channelID,
                            message: `james test ${secCmd}`
                        });
                        break;
                    // UPS tracking case
                    case `${firstChar}${secChar}` == `1Z` && secCmd.length == 18:
                        search(secCmd, thirdCmd)
                            .then((response) => {
                                bot.sendMessage({
                                    to: channelID,
                                    message: response
                                });
                            })
                        break;
                    default:
                        bot.sendMessage({
                            to: channelID,
                            message: `Invalid tracking code.`
                        });
                        break;
                }
            break;
            case 'whoami':
                bot.sendMessage({
                  to: channelID,
                  message: "hahaaha u are " + "<@!" + userID + ">"
                });
            break;
    }
  }
});