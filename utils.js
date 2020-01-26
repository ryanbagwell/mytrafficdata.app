const fs = require('fs');
const SerialPort = require('serialport');


function metersToFeet(meters) {
  return (meters * 3.28084).toFixed(10);
}

function feetToMiles(feet) {
  return (feet * 0.000189394).toFixed(10);
}

function metersToMiles(meters) {
  return (meters * 0.000621371).toFixed(10);
}

function millisecondsToHours(ms) {
  return (ms / (3600 * 1000)).toFixed(10);
}

module.exports = {
  metersToFeet,
  feetToMiles,
  metersToMiles,
  millisecondsToHours
}
