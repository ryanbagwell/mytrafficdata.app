const fs = require('fs');
const SerialPort = require('serialport');


export function metersToFeet(meters) {
  return (meters * 3.28084).toFixed(10);
}

export function feetToMiles(feet) {
  return (feet * 0.000189394).toFixed(10);
}

export function metersToMiles(meters) {
  return (meters * 0.000621371).toFixed(10);
}

export function millisecondsToHours(ms) {
  return (ms / (3600 * 1000)).toFixed(10);
}
