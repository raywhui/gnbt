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
                const trackId = secCmd.toUpperCase();
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
                    case `${trackId[0]}${trackId[1]}` == `1Z` && secCmd.length == 18:
                        search(secCmd, thirdCmd)
                            .then((response) => {
                                bot.sendMessage({
                                    to: channelID,
                                    message: response
                                });
                            })
                        break;
                    default:
                        console.log(secCmd.includes('1Z'));
                        bot.sendMessage({
                            to: channelID,
                            message: `Invalid tracking code.`
                        });
                        break;
                }
            case 'whoami':
                bot.sendMessage({
                  to: channelID,
                  message: "hahaaha u are " + "<@!" + userID + ">"
                });
            break;
    }
  }
});