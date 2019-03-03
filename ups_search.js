const axios = require("axios");
const auth = require("./auth.json");
const upsReqBody = require("./requestBody.js");
const moment = require("moment");

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

/**
 * Function to pull relevant data for easy user consumption
 * @param {Object} activity - Object containing ups package tracking information
 * @return {String} - Resolves with package status description
 */
const searchPackage = (activity) => {
  const dateTime = moment(
    `${activity.Time}${activity.Date}`,
    'hhmmssYYYYMMDD'
  ).format('h:mm:ssa MMM DD, YYYY');
  switch (activity.Status.Type) {
    case 'D':
      return `${activity.Status.Description} at ${activity.ActivityLocation.Address.City}, ${activity.ActivityLocation.Address.StateProvinceCode} on ${dateTime}`;
    case 'I':
      return `${activity.Status.Description} at ${activity.ActivityLocation.Address.City}, ${activity.ActivityLocation.Address.StateProvinceCode} on ${dateTime}`;
    case 'M':
      return `${activity.Status.Description} on ${dateTime}`;
    default:
      return `Untracked ${trackingData.Status}`;
  };
};

/**
 * Async function to run through seachPackage
 * @param {String} arg3 - string for third argument "all" 
 * @return {String} - Resolves with first or all package status descriptions
 */
async function search(trackingId, arg3) {
  try {
    let message = '';
    const data = await packageTracking(trackingId);
    const trackingData = data.data.TrackResponse.Shipment.Package.Activity;
    switch (arg3) {
      case '--all':
        for ([index, activity] of trackingData.entries()) {
          const allData = await searchPackage(activity);
          message = `${message}${allData}\n`;
        };
        return message;
      default:
        return searchPackage(trackingData[0]);
    };
  } catch(err) {
    return `ERROR: ${err}`;
  };
};

module.exports = search;
