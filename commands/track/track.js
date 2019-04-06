const search = require('../../apis/ups/ups_search');

const track = (secCmd) => {
  let trackId, firstChar, secChar;
  if (secCmd !== undefined) {
    trackId = secCmd.toUpperCase(); // Forces all tracking ID's to be upper case
    firstChar = trackId[0];
    secChar = trackId[1];

    switch (true) {
      case `${firstChar}${secChar}` == `1Z` && secCmd.length == 18: // UPS tracking case
        const res = search(secCmd, thirdCmd);
        return ```${res}```;
      default:
        return `Invalid tracking code.`;
    };
  } else {
    return `Invalid command. Enter missing tracking code.`
  }
};

module.exports = track;
