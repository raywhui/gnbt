const chow = require('./chow');
const msg = require('../../bot').msg;

const botChow = async (bot, channelID, ...multiStrArr) => {
  msg(bot, channelID, await chow(...multiStrArr));
};

module.exports = botChow;