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
}

/**
 * Function to pull relevant data for easy user consumption
 * @param {Object} activity - Object containing ups package tracking information
 */
const searchPackage = (activity) => {
  const dateTime = moment(
    `${activity.Time}${activity.Date}`,
    'hhmmssYYYYMMDD'
  ).format('h:mm:ssa MMM DD, YYYY');
  switch (activity.Status.Type) {
    case 'D':
      console.log(`${activity.Status.Description} at ${activity.ActivityLocation.Address.City}, ${activity.ActivityLocation.Address.StateProvinceCode} on ${dateTime}`)
      break;
    case 'I':
      console.log(`${activity.Status.Description} at ${activity.ActivityLocation.Address.City}, ${activity.ActivityLocation.Address.StateProvinceCode} on ${dateTime}`)
      console.log("-----------------------------------")
      break;
    case 'M':
      console.log(`${activity.Status.Description} on ${dateTime}`)
      console.log("-----------------------------------")
      break;
    default:
      console.log(`Untracked ${trackingData.Status}`);
      break;
  };
};

// V Define search function
async function search(arg3) {
  try {
    const data = await packageTracking(auth.test);
    const trackingData = data.data.TrackResponse.Shipment.Package.Activity;
    switch (arg3) {
      case 'all':
        for (activity of trackingData) {
          await searchPackage(activity);
        };
        break;
      default:
        await searchPackage(trackingData[0]);
        break;
    };
  } catch(err) {
    return `ERROR: ${err}`;
  };
};


// Running search function
// module.exports = search;
search('all')

// console.log(moment('', '').format())
// console.log(moment('15583720190211', 'hhmmssYYYYMMDD').format('h:mm:ssa MMM DD, YYYY'))
