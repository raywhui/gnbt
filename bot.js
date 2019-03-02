const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

// hello can you read this france?

logger.level = 'debug';
// Initialize Discord Bot
const bot = new Discord.Client({
  token: auth.token,
  autorun: true
});

const message = () => {
    bot.sendMessage({
        to: channelID,
        message: `france test ${}`
    });
}


bot.on('ready', (evt) => {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});



bot.on('message', function (user, userID, channelID, message, evt) {
  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `!`
  if (message.substring(0, 1) == '$') {
    var args = message.substring(1).split(' ');
    var cmd = args[0];
    var secCmd = args[1];
  
    args = args.splice(1);
        switch(cmd) {
            case 'track':
                switch(secCmd) {
                    case 'france':
                        bot.sendMessage({
                            to: channelID,
                            message: `france test ${secCmd}`
                        });
                        break;
                    case 'james':
                        bot.sendMessage({
                            to: channelID,
                            message: `james test ${secCmd}`
                        });
                        break;
                    case 'raymond':
                        bot.sendMessage({
                            to: channelID,
                            message: `Raymond test ${secCmd}`
                        });
                        break;
                    default:
                        bot.sendMessage({
                            to: channelID,
                            message: `Invalid tracking code.`
                        });
                        break;
                }
            case 'shuan':

            case 'eatat': //where to go eat?
                switch(setCmd) {
                    case 'japanese':
                        bot.sendMessage({
                            to: channelID,
                            message: 'testing "eat at" japanese command'
                        });
                        break;
                    default:
                        bot.sendMessage({
                            to: channelID,
                            message: 'testing "eat at" any category command'
                        });
                        break;
                }

            break;
            // Just add any case commands if you want to..
    }
  }
});