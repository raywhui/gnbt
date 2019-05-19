const axios = require('axios');
const util = require('util');
const moment = require('moment');
const parseString = require('xml2js').parseString;

const { fedexAuthKey, fedexPassword, fedexAccNum, fedexMeterNumber } = require('../../auth.json').fedex;
const fedexXmlBody = require('../consts/fedexXmlBody.js');

// Converts parseString from callback into promise
const parse = util.promisify(parseString);

/**
 * API SOAP post request to Fedex;
 * @param {String} tracking - tracking ID
 * @return {Object} Resolves with fedex tracking response
 */
const packageTracking = (tracking) => {
  return axios.post(
    'https://ws.fedex.com:443/web-services',
    // key, password, accNum, meterNum, trackingNum
    fedexXmlBody(
      fedexAuthKey,
      fedexPassword,
      fedexAccNum,
      fedexMeterNumber,
      tracking,
    ),
  );
};

/**
 * @desc Function to pull relevant data for easy user consumption
 * @param {Object} result - Object containing Fedex package tracking information
 * @return {String} - Resolves with package status description
 */
const searchPackage = result => {
  const { StatusDetail, DatesOrTimes } = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0].TrackReply[0].CompletedTrackDetails[0].TrackDetails[0];
  const dateTime = moment(
    DatesOrTimes[0].DateOrTimestamp[0],
    'YYYY-MM-DD hh:mm'
  ).format('h:mma MMM DD, YYYY');

  // Since I only have 1 tracking ID, not sure how the other conditions results are formated.
  // Add switch statements when more are created
  return `${StatusDetail[0].Description[0]} at ${StatusDetail[0].Location[0].City[0]}, ${StatusDetail[0].Location[0].StateOrProvinceCode[0]} on ${dateTime}`;
// switch (StatusDetail[0].Code[0]) {
  //   case 'DL': // Delivered
  //     return `${StatusDetail[0].Description[0]} at ${StatusDetail[0].Location[0].City[0]}, ${StatusDetail[0].Location[0].StateOrProvinceCode[0]} on ${dateTime}`;
  //   case 'I':
  //     return `${activity.Status.Description} at ${activity.ActivityLocation.Address.City}, ${activity.ActivityLocation.Address.StateProvinceCode} on ${dateTime}`;
  //   case 'M':
  //     return `${activity.Status.Description} on ${dateTime}`;
  //   case 'X': // The receiver was not available for delivery. We'll make a second attempt the next business day.
  //     return `${activity.Status.Description} at ${activity.ActivityLocation.Address.City}, ${activity.ActivityLocation.Address.StateProvinceCode} on ${dateTime}`;
  //   default:
  //     return `Untracked ${trackingData.Status}`;
  // };
};

/**
 * @desc Async function to run through searchPackage
 * @param {String} trackingId - string for Fedex tracking ID number
 * @param {String} arg3 - string for third argument "all"
 * @return {Promise} - Resolves with promise of current package status description
 */
async function searchFedex(trackingId, arg3) {
  try {
    const pkgData = await packageTracking(trackingId);
    const trackingData = await parse(pkgData.data);
    const result = await searchPackage(trackingData);
    return result;
  } catch (err) {
    return 'Invalid Fedex Tracking Number.';
  }
};

module.exports = searchFedex;