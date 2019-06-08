const searchYelp = require('../../apis/yelp/yelp_search');

const chow = (...argsArr) => {
  const yelpUserData = [...argsArr].join(' ').split('.');
  yelpUserData.shift();
  return searchYelp(yelpUserData[0].trim(), yelpUserData[1].trim());
};

module.exports = chow;
