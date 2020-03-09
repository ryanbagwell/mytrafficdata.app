const memoize = require('memoize-one');

const radiansToDegrees = memoize((radians) => {
  return radians * 180 / Math.PI;
});


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

const calculateTargetAngle = memoize((
  rangeToTarget = null,
  lineOfSightDistanceToTarget = null,
  distanceToLaneCenter = null
) => {

  let radians;

  if (distanceToLaneCenter && rangeToTarget) {
    radians = Math.atan(distanceToLaneCenter / rangeToTarget);
    return radiansToDegrees(radians);
  }

  if (distanceToLaneCenter && lineOfSightDistanceToTarget) {
    radians = Math.asin(distanceToLaneCenter / lineOfSightDistanceToTarget);
    return radiansToDegrees(radians);
  }

})

const calculateRangeToTarget = memoize((distanceToLaneCenter, lineOfSightDistanceToTarget) => {
  const {sqrt, pow} = Math;
  return sqrt(pow(lineOfSightDistanceToTarget, 2) - pow(distanceToLaneCenter, 2));
})


module.exports = {
  milesToFeet,
  hoursToSeconds,
  calculateVehicleLength,
  correctForCosineError,
  calculateRangeToTarget,
  calculateTargetAngle,
}

