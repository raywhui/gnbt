const axios = require('axios');
const auth = require('../auth.json');
const upsReqBody = require('../consts/upsReqBody.js');
const moment = require('moment');

//https://www.fedex.com/us/developer/downloads/pdf/2018/FedEx_WebServices_DevelopersGuide_v2018.pdf#page=652&zoom=100,0,109


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
    )
  );
};