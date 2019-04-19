const search = require('../../apis/ups/ups_search');

const track = (secCmd, thirdCmd) => {
  let trackId, firstChar, secChar;
  if (secCmd !== undefined) {
    trackId = secCmd.toUpperCase(); // Forces all tracking ID's to be upper case
    firstChar = trackId[0];
    secChar = trackId[1];

    // UPS tracking case
    if (`${firstChar}${secChar}` == `1Z` && secCmd.length == 18) {
      const res = search(secCmd, thirdCmd);
      return ```${res}```;
      // Add more case/else if statements for other package searches
    } else {
      return `Invalid tracking code.`;
    };
  } else {
    return `Invalid command. Enter missing tracking code.`
  }
};

module.exports = track;
