/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyAuBHGB9Yw2S_HGnuXOBdw58MtEA57d4QI',
  databaseURL: "https://speedcamera-b5aae.firebaseio.com",
};

firebase.initializeApp(firebaseConfig);

// const database = firebase.database();

// database.ref('speedreports').once('value').then((snapshot) => {
//   console.log('ahhhh')
//   console.log(snapshot.toJSON())
//   // snapshot.forEach(() => {

//   // })

// });
