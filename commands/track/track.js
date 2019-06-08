const searchUps = require('../../apis/ups/ups_search');
const searchFedex = require('../../apis/fedex/fedex_search');

const track = (secCmd, thirdCmd) => {
  if (secCmd === undefined) return 'Invalid command. Enter missing tracking code.';
  const trackId = secCmd.toUpperCase(); // Forces all tracking ID's to be upper case
  const upsMarker = `${trackId[0]}${trackId[1]}` == '1Z' && secCmd.length === 18;
  const fedexMarker = (`${trackId[0]}${trackId[1]}` != '1Z') && (trackId.length === 12) || (trackId.length === 13) || (trackId.length === 14);
  return (
    upsMarker ? searchUps(secCmd, thirdCmd) :
    fedexMarker ? searchFedex(secCmd, thirdCmd) :
    'Invalid tracking code.'
  );
};

module.exports = track;
