const axios = require("axios");
const auth = require("./auth.json");
const upsReqBody = require("./requestBody.js");

// UPS is lame, needs to be done as post request
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
 * Publish a notification. if `dismissAfter` is set, the notification will be
 * @param {Object} notif - Object containing
 */
const searchPackage = (activity) => {
  switch (activity.Status.Type) {
    case 'D':
      console.log(`${activity.Status.Description} at ${activity.ActivityLocation.Address.City}, ${activity.ActivityLocation.Address.StateProvinceCode} on ${activity.Time} ${activity.Date}`)
      console.log("-----------------------------------")
      break;
    case 'I':
      console.log(`${activity.Status.Description} at ${activity.ActivityLocation.Address.City}, ${activity.ActivityLocation.Address.StateProvinceCode} on ${activity.Time} ${activity.Date}`)
      console.log("-----------------------------------")
      break;
    case 'M':
      console.log(`${activity.Status.Description} on ${activity.Time} ${activity.Date}`)
      console.log("-----------------------------------")
      break;
    default:
      console.log(`Untracked ${trackingData.Status}`);
      break;
  };
};

// V Define search function
async function search() {
  try {
    const data = await packageTracking(auth.test);
    const trackingData = data.data.TrackResponse.Shipment.Package.Activity;
    
    trackingData[0]
    
    trackingData.forEach((activity) => {
      searchPackage(activity);
    });
  } catch(err) {
    console.log('ERROR:', err);
  }

}


// Running search function
search();

// console.log(upsReqBody(
//   auth.upsUser,
//   auth.upsPass,
//   auth.upsServiceAccessToken,
//   auth.test
// ))