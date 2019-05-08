const help = require('./help');
const msg = require('../../bot').msg;

const botHelp = (bot, channelID) => {
  msg(bot, channelID, help());
};

module.exports = botHelp;