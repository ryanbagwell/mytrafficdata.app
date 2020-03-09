const {
  calculateRangeToTarget,
  calculateTargetAngle,
  correctForCosineError
} = require('../utils');

exports.rangeEstimationStrategy = (
  previousReport = null,
  currentReport,
  distanceToLaneCenter,
  maxDeviceRange
) => {

  const maxPossibleTargetRange = calculateRangeToTarget(distanceToLaneCenter, maxDeviceRange);

  let rangeToTarget = null;

  /*
   *  If the magnitude is less than 20, of if there's no previous report,
   *  assume the vehicle is at its farthest point
   */
  if (currentReport.magnitude < 20 || !previousReport) {
    rangeToTarget = maxPossibleTargetRange;
  }

  /*
   *  If the time between reports is > 3 seconds,
   *  also assume the vehicle is at its farthest point
   */
  if (currentReport.time - previousReport.time > 3) {
    rangeToTarget = maxPossibleTargetRange;
  }

  /*
   *  Otherwise, assume the vehicle was at half the
   *  the max range
   *
   *  Note: it may also be acceptable to assume a trailing vehicle
   *  was 17 feet from the unit based on other observations
   */

  rangeToTarget = maxPossibleTargetRange / 2;

  const angle = calculateTargetAngle({distanceToLaneCenter, rangeToTarget})

  return correctForCosineError(currentReport.speed, angle);

}