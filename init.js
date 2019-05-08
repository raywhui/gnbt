const Discord = require('discord.io');
const auth = require('./auth.json');
const help = require('./commands/help/help.bot');
const track = require('./commands/track/track.bot');
const error = require('./commands/error/error.bot');

// Initialize Discord Bot
const bot = new Discord.Client({
  token: auth.token,
  autorun: true,
});

const msg = (bot, channelID, val) => {
  bot.sendMessage({
    to: channelID,
    message: val,
  });
};

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

bot.on('message', function (user, userID, channelID, message, evt) {
  // Object literal commands
  const commands = {
    track: track,
    // chow: '2',
    // whoami: '3',
    help: help
  };

  // Prevents bot from activating itself on message
  if (message.substring(0, 1) == '$' && userID !== '551329558629187594') {
    let args = message.substring(1).split(' ');
    const cmd = args[0];
    args = args.splice(1);

    console.log(`User: ${user}(${userID}) // Command: ${message}`);

    commands[cmd] !== undefined ? commands[cmd](bot, channelID, ...args) : error(bot, channelID);
  };
});