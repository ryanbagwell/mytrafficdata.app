const logger = require('../logger');
const moment = require('moment-timezone');
const slugify = require('slugify');
const getFirebase = require('./getFirebase');

const firebase = getFirebase();

const LOCATION = slugify(process.env.LOCATION_ID || '')
const LEGACY_LOCATION = slugify(process.env.LOCATION_DESCRIPTION || '')


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
  logger.debug(`Saving data: ${JSON.stringify(data)}`);

  await firebase.database().ref(
    `speedreports/${LOCATION}/counts/${dateStr}`
  ).push(data).then(() => {
    logger.info(`Pushed count to speedreports/${LOCATION}/counts/${dateStr}`)
  });

  await firebase.database().ref('counts').push(data).then(() => {
    logger.info(`Pushed count to counts`)
  })

  await firebase.firestore()
  .collection(`rawCounts`)
  .doc(`${LOCATION}-${data.countDateTime}`)
  .set({
    ...data,
    location: firestore.doc(`locations/${LOCATION}`),
  }).then(() => {
    logger.info(`Pushed count to firestore`)
  })

}

module.exports = {
  updateLiveSpeedReport,
  saveSpeedReport
}