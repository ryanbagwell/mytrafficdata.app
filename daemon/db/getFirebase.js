const firebase = require('firebase-admin');
const logger = require('../logger');

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = `${__dirname}/../serverKey.json`;
  logger.info(`No GOOGLE_APPLICATION_CREDENTIALS environment variable set. Defaulting to ${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);
}

if (!process.env.LOCATION_DESCRIPTION) {
  logger.info('No LOCATION_DESCRIPTION environment variable set. Using the current time as the default location')
  process.env.LOCATION_DESCRIPTION = moment().tz('America/New_York').format('YYYY-MM-DD-kk-mm-ss');
}


let instance;

module.exports = () => {
  if (!instance) {
    firebase.initializeApp({
      credential: firebase.credential.applicationDefault(),
      databaseURL: process.env.databaseURL,
    });
    instance = firebase
  }
  return instance;
}
