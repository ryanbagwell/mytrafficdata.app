const firebase = require('firebase-admin');
const logger = require('../logger');
const moment = require('moment-timezone');
const slugify = require('slugify');

const LOCATION = slugify(process.env.LOCATION_ID)
const LEGACY_LOCATION = slugify(process.env.LOCATION_DESCRIPTION)


firebase.initializeApp({
  credential: firebase.credential.applicationDefault(),
  databaseURL: process.env.databaseURL,
});

const updateLiveSpeedReport = async (data) => {
  return await firebase.database().ref(
    `speedreports/${LOCATION}/live`
  ).set(data);
}

const saveSpeedReport = async (data) => {
  let dateStr = moment().tz('America/New_York').format('YYYY-MM-DD');
  data = {
    ...data,
    location: LOCATION,
    legacyLocation: LEGACY_LOCATION,
  };
  await firebase.database().ref(
    `speedreports/${LOCATION}/counts/${dateStr}`
  ).push(data).then(() => {
    logger.info(`Pushed count to speedreports/${LOCATION}/counts/${dateStr}`)
  });
  await firebase.database().ref('counts').push(data).then(() => {
    logger.info(`Pushed count to counts`)
  })
}

module.exports = {
  updateLiveSpeedReport,
  saveSpeedReport
}