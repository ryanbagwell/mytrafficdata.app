const logger = require('../logger');
const moment = require('moment-timezone');
const slugify = require('slugify');
const getFirebase = require('./getFirebase');

const firebase = getFirebase();

const LOCATION = slugify(process.env.LOCATION_ID || '')
const LEGACY_LOCATION = slugify(process.env.LOCATION_DESCRIPTION || '')

const firestore = firebase.firestore();

const saveSpeedReport = async (data) => {
  let dateStr = moment().tz('America/New_York').format('YYYY-MM-DD');
  data = {
    ...data,
    location: LOCATION,
    legacyLocation: LEGACY_LOCATION,
  };
  logger.debug(`Saving data: ${JSON.stringify(data)}`);

  await firestore
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
  updateLiveSpeedReport: () => {},
  saveSpeedReport
}
