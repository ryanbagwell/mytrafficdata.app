const milesToFeet = (miles) => {
  return miles * 5280;
}

const hoursToSeconds = (hours) => {
  return hours * 60 * 60;
}

const calculateVehicleLength = (speed, travelTime) => {
  return milesToFeet(speed) * travelTime / hoursToSeconds(1);
}

const correctForCosineError = (measuredSpeed, angle) => {
  return measuredSpeed / Math.cos((this.angle - 10) * Math.PI / 180);
}

module.exports = {
  milesToFeet,
  hoursToSeconds,
  calculateVehicleLength,
  correctForCosineError
}

