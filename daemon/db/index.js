const firebase = require('firebase-admin');
const logger = require('../logger');
const moment = require('moment');
const slugify = require('slugify');

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  logger.info('No GOOGLE_APPLICATION_CREDENTIALS environment variable set. Defaulting to ../serverKey.json');
  process.env.GOOGLE_APPLICATION_CREDENTIALS = '../serverKey.json';
}

if (!process.env.LOCATION_DESCRIPTION) {
  logger.info('No LOCATION_DESCRIPTION environment variable set. Using the current time as the default location')
  process.env.LOCATION_DESCRIPTION = moment().format('YYYY-MM-DD-kk-mm-ss');
}

const LOCATION = slugify(process.env.LOCATION_DESCRIPTION)


firebase.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: process.env.databaseURL,
});

const updateLiveSpeedReport = async (data) => {
  return await firebase.database().ref(`speedreports/${LOCATION}/live`)
    .set(data);
}

const saveSpeedReport = async (data) => {
  return await firebase.database().ref(`speedreports/${LOCATION}/counts`)
  .push(data);
}

module.exports = {
  updateLiveSpeedReport,
  saveSpeedReport
}