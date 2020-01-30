const getFirebase = require('./getFirebase');
const firebase = getFirebase();

module.exports = async (data) => {
  await firebase.database().ref().child('speedreports').push(data);
}