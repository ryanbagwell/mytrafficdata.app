const memoize = require('memoize-one');

const milesToFeet = memoize((miles) => {
  return miles * 5280;
})

const hoursToSeconds = memoize((hours) => {
  return hours * 60 * 60;
})

const calculateVehicleLength = memoize((speed, travelTime) => {
  return milesToFeet(speed) * travelTime / hoursToSeconds(1);
})

const correctForCosineError = memoize((measuredSpeed, angle) => {
  return measuredSpeed / Math.cos(angle * Math.PI / 180);
})

const calculateTargetAngle = memoize((rangeToTarget, distanceToTarget) => {
  const radians = Math.asin(rangeToTarget / distanceToTarget);
  return radians * 180 / Math.PI;
})

const calculateRangeToTarget = memoize((distanceToLaneCenter, distanceToTarget) => {
  const {sqrt, pow} = Math;
  return sqrt(pow(distanceToTarget, 2) - pow(distanceToLaneCenter, 2));
})


module.exports = {
  milesToFeet,
  hoursToSeconds,
  calculateVehicleLength,
  correctForCosineError,
  calculateRangeToTarget,
  calculateTargetAngle,
}

