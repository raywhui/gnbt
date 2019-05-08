const track = require('./track');
const msg = require('../../bot').msg;

// Passes message data into track
const botTrack = async (bot, channelID, secCmd, thirdCmd) => {
  const trackResult = await track(secCmd, thirdCmd);
  msg(
    bot,
    channelID,
    `\`\`\`${trackResult}\`\`\``
  );
}

module.exports = botTrack;