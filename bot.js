const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');
// const search = require('./src/ups/ups_search.js');
const help = require('./commands/help/help');

//BOt.js should only deal with connecting discord functionality and the logic in `./commands`. Export the functions into lookup.js

// Initialize Discord Bot
const bot = new Discord.Client({
  token: auth.token,
  autorun: true
});

// Send message
const msg = (channelID, val) => {
  bot.sendMessage({
    to: channelID,
    message: val
  });
};

// Delete messages (should be admin level command)
const dlt = (channelID, msgLimit) => {
  bot.getMessages({
    channelID: channelID,
    limit: msgLimit
  }, (err, val) => {
    if (err) {
      console.error(err);
    } else {
      let messagesArr = val.map((message)=>{
        return message.id;
      });
      bot.deleteMessages({
        channelID: channelID,
        messageIDs: messagesArr,
      })
    }
  })
}

const what = (hmm) => {
  console.log(hmm);
}

// Object literal commands
const commands = {
  track: what,
  chow: '2',
  whoami: '3',
  help: help,
  test: '5',
}

// Discord Bot Initialization
bot.on('ready', () => {
  console.log('Connected');
  console.log('Logged in as: ');
  console.log(bot.username + ' - (' + bot.id + ')');
});

bot.setPresence({
  game: {
    name: "games with your heart."
  }
});


commands['help']();

bot.on('message', function (user, userID, channelID, message, evt) {
  // Sends message to channel
  const msg = (val) => {
    bot.sendMessage({
      to: channelID,
      message: val
    });
  }
})



// bot.on('message', function (user, userID, channelID, message, evt) {
//   // Sends message to channel
//   const msg = (val) => {
//     bot.sendMessage({
//       to: channelID,
//       message: val
//     });
//   }

  // if (message.substring(0, 1) == '$') {
  //   var args = message.substring(1).split(' ');
  //   var cmd = args[0];
  //   var secCmd = args[1];
  //   var thirdCmd = args[2];

//     args = args.splice(1);
//     switch (cmd) {
//       case 'track':
//         let trackId, firstChar, secChar;
//         if (secCmd !== undefined) {
//           trackId = secCmd.toUpperCase(); // Forces all tracking ID's to be upper case
//           firstChar = trackId[0];
//           secChar = trackId[1];
//         };
//         switch (true) {
//           case `${firstChar}${secChar}` == `1Z` && secCmd.length == 18: // UPS tracking case
//             search(secCmd, thirdCmd)
//               .then((response) => {
//                 msg(```${response}```);
//               });
//             break;
//           default:
//             msg(`Invalid tracking code.`);
//             break;
//         }
//         break;
//       //james
//       case 'chow':   //where to go eat?
//         //e.g. "$chow japanese 4 5" to spit back a random japanese restaurant rated 4+ stars within 5 miles
//         //$chow <category> <minumum stars> <maximum distance in miles>
//         //$chow <empty> ---> any restaurant 3.5+ stars within 5 miles
//         switch (secCmd) {
//           case 'japanese':
//             msg('testing "eat at" japanese');
//             break;
//           default:
//             msg('testing "eat at" any category');
//             break;
//         }
//         break;
//       //end james
//       case 'whoami':
//         msg("hahaaha u are " + "<@!" + userID + ">");
//         break;
//       case 'help':
//         msg(`$track\n$chow\n$whoami\n$test`);
//         break;
//       case 'test':
//         bot.sendMessage({
//           to: channelID,
//           message: 'test my ass'
//         });
//         // bot.getMessages({
//         //   channelID: channelID,
//         //   limit: 2
//         // }, (err, val) => {
//         //   if (err) {
//         //     console.error(err);
//         //   } else {
//         //     let messagesArr = val.map((message)=>{
//         //       return message.id;
//         //     });
//         //     bot.deleteMessages({
//         //       channelID: channelID,
//         //       messageIDs: messagesArr,
//         //     })
//         //   }
//         // })
//     };
//   };
// });