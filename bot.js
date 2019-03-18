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

bot.on('ready', (evt) => {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.setPresence({
  game: {
    name: "games with your heart."
  }
});

bot.on('message', function (user, userID, channelID, message, evt) {
  // Sends message to channel
  const msg = (val) => {
    bot.sendMessage({
      to: channelID,
      message: val
    });
  }

  if (message.substring(0, 1) == '$') {
    var args = message.substring(1).split(' ');
    var cmd = args[0];
    var secCmd = args[1];
    var thirdCmd = args[2];

    args = args.splice(1);
    switch (cmd) {
      case 'track':
        let trackId, firstChar, secChar;
        if (secCmd !== undefined) {
          trackId = secCmd.toUpperCase(); // Forces all tracking ID's to be upper case
          firstChar = trackId[0];
          secChar = trackId[1];
        };
        switch (true) {
          case `${firstChar}${secChar}` == `1Z` && secCmd.length == 18: // UPS tracking case
            search(secCmd, thirdCmd)
              .then((response) => {
                msg(```${response}```);
              });
            break;
          default:
            msg(`Invalid tracking code.`);
            break;
        }
        break;
      //james
      case 'chow':   //where to go eat?
        //e.g. "$chow japanese 4 5" to spit back a random japanese restaurant rated 4+ stars within 5 miles
        //$chow <category> <minumum stars> <maximum distance in miles>
        //$chow <empty> ---> any restaurant 3.5+ stars within 5 miles
        switch (secCmd) {
          case 'japanese':
            msg('testing "eat at" japanese command');
            break;
          default:
            msg('testing "eat at" any category command');
            break;
        }
        break;
      //end james
      case 'whoami':
        msg("hahaaha u are " + "<@!" + userID + ">");
        break;
      case 'help':
        msg(`$track\n$chow\n$whoami\n$test`);
        break;
      case 'test':
        bot.sendMessage({
          to: channelID,
          message: 'test my ass'
        });
        // bot.getMessages({
        //   channelID: channelID,
        //   limit: 2
        // }, (err, val) => {
        //   if (err) {
        //     console.error(err);
        //   } else {
        //     let messagesArr = val.map((message)=>{
        //       return message.id;
        //     });
        //     bot.deleteMessages({
        //       channelID: channelID,
        //       messageIDs: messagesArr,
        //     })
        //   }
        // })
    };
  };
});
