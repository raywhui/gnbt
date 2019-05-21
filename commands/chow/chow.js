const searchYelp = require('../../apis/yelp/yelp_search');

const chow = (secCmd, thirdCmd) => {
  return searchYelp(secCmd, thirdCmd);
};

module.exports = chow;
