const firebase = require('firebase');
require('firebase/database');

var firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
};

console.log(firebase);

firebase.initializeApp(firebaseConfig);

export default () => firebase.database();