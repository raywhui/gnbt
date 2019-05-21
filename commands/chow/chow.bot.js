const chow = require('./chow');
const msg = require('../../bot').msg;

const botChow = async (bot, channelID) => {
  msg(bot, channelID, await chow('ipot', 'san francisco'));
};

module.exports = botChow;