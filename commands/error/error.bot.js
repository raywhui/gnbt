const error = require('./error');
const msg = require('../../bot').msg;

const botError = (bot, channelID) => {
  msg(bot, channelID, error());
};

module.exports = botError;