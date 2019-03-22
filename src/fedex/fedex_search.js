const axios = require('axios');
const auth = require('../auth.json');
const upsReqBody = require('../consts/upsReqBody.js');
const moment = require('moment');

/**
 * API post request to ups (Poorly designed API as it should only be a pull request);
 * @param {String} tracking - tracking ID
 * @return {Object} Resolves with ups tracking response
 */
const packageTracking = (tracking) => {
  return axios.post(
    'https://onlinetools.ups.com/rest/Track',
    // user, password, aln, inquiry
    upsReqBody(
      auth.upsUser,
      auth.upsPass,
      auth.upsServiceAccessToken,
      tracking
    ));
};