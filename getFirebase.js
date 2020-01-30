const firebase = require('firebase-admin');
const key = require('./serverKey.json');

firebase.initializeApp({
  credential: firebase.credential.cert(key),
  databaseURL: process.env.databaseURL,
});

module.exports = () => firebase;