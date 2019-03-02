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

// Auths to get HJI Token
// const authenticate = () => {
//   return axios.get(authUrl);
// }

// Uses placesUrl to query location based on keywords
// Typically places is the best to search with as it provides the most IDX results
// const placesSearch = (url, token) => {
//   return axios.get(url, {
//     headers: {
//       'HJI-Slipstream-Token': token
//     }
//   });
// }

// V Define search function
async function search() {
  try {
    const data = await packageTracking(auth.test);
    const trackingData = data.data.TrackResponse.Shipment.Package.Activity;
    // console.log(status)
    trackingData.forEach((activity) => {
      // console.log(activity)
      // TO DO: CONVERT TIMES INTO SOMETHING NOT SHIT
      // ONLY GRAB 1ST INSTANCE OF ARRAY
      switch (activity.Status.Type) {
        case 'D':
          // console.log(activity.Status.Type)
          // console.log(activity.ActivityLocation.Address.City)
          // console.log(activity.ActivityLocation.Address.StateProvinceCode)
          // console.log(activity.Status.Code)
          console.log(`${activity.Status.Description} at ${activity.ActivityLocation.Address.City}, ${activity.ActivityLocation.Address.StateProvinceCode} on ${activity.Time} ${activity.Date}`)
          console.log("-----------------------------------")
          break;
        case 'I':
          console.log(`${activity.Status.Description} at ${activity.ActivityLocation.Address.City}, ${activity.ActivityLocation.Address.StateProvinceCode} on ${activity.Time} ${activity.Date}`)
          console.log("-----------------------------------")
          break;
        case 'M':
          // console.log(activity.Status.Type)
          // console.log(activity.Status.Code)
          console.log(`${activity.Status.Description} on ${activity.Time} ${activity.Date}`)
          console.log("-----------------------------------")
          break;
        default:
          console.log(`Untracked ${trackingData.Status}`);
          break;
      }
    })
    // console.log('DATA:', data.data.TrackResponse.Shipment.Package);
    // console.log('DATA:', data.data.TrackResponse.);
    //Want location, ETA,
    
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