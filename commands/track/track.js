const search = require('../../apis/ups/ups_search');
const searchFedex = require('../../apis/fedex/fedex_search');

const track = (secCmd, thirdCmd) => {
  let trackId, firstChar, secChar;
  if (secCmd !== undefined) {
    trackId = secCmd.toUpperCase(); // Forces all tracking ID's to be upper case
    firstChar = trackId[0];
    secChar = trackId[1];

    // UPS tracking case
    if (`${firstChar}${secChar}` == `1Z` && secCmd.length == 18) {
      // const res = ;
      return search(secCmd, thirdCmd);
      // Add more case/else if statements for other package searches
    } 
    // Fedex tracking case
    else if (
      (`${firstChar}${secChar}` !== `1Z`) && 
      (trackId.length === 12) ||
      (trackId.length === 13) ||
      (trackId.length === 14)
    ) {
      return searchFedex(secCmd);
    }
    else {
      return `Invalid tracking code.`;
    };
  } else {
    return `Invalid command. Enter missing tracking code.`
  }
};

module.exports = track;
