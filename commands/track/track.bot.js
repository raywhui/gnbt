const track = require('./track');
const msg = require('../../bot').msg;

// Passes message data into track
const botTrack = (bot, channelID, secCmd, thirdCmd) => {
  msg(bot, channelID, track(secCmd, thirdCmd));
}

module.exports = botTrack;