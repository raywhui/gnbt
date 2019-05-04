const axios = require('axios');
const util = require('util');
const parseString = require('xml2js').parseString;
const { fedexAuthKey, fedexPassword, fedexAccNum, fedexMeterNumber} = require('../../auth.json').fedex;
const fedexXmlBody = require('../consts/fedexXmlBody.js');

// const moment = require('moment');

// Converts parseString from callback into promise
const parse = util.promisify(parseString);

//https://www.fedex.com/us/developer/downloads/pdf/2018/FedEx_WebServices_DevelopersGuide_v2018.pdf#page=652&zoom=100,0,109


/**
 * API post request to ups (Poorly designed API as it should only be a pull request);
 * @param {String} tracking - tracking ID
 * @return {Object} Resolves with ups tracking response
 */
const packageTracking = (tracking) => {
  return axios.post(
    'https://ws.fedex.com:443/web-services ',
    // key, password, accNum, meterNum, trackingNum
    fedexXmlBody(
      fedexAuthKey,
      fedexPassword,
      fedexAccNum,
      fedexMeterNumber,
      '487004955503',
    ),
  );
};

async function why() {
  const what = await packageTracking();
  const result = await parse(what.data);
  const { StatusDetail, DatesOrTimes } = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0].TrackReply[0].CompletedTrackDetails[0].TrackDetails[0];
  console.log(StatusDetail[0])
  console.log(DatesOrTimes)
  // Need status details
  // DatesOrTimes
  //`${activity.Status.Description} at 
  // ${activity.ActivityLocation.Address.City}, 
  // ${activity.ActivityLocation.Address.StateProvinceCode} 
  // on ${dateTime}`
  // Origin Scan at Cerritos, CA on 7:25:53pm May 02, 2019
};

why();