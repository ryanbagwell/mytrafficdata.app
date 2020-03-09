
/*
 *  This takes advantage of the cosine error.
 *  As a vehicle approaches the unit, its speed will always
 *  decrease. A substantial increase in speed means the unit
 *  is targeting a new vehicle that is farther away (unless
 *  the current vehicle sped up suddenly and dramatically).
 *
 *  This strategy looks for an increase in speed of more than
 *  2 mph to delineate a new car.
 */
exports.inboundSpeedIncrease = (previousReport, currentReport) => {

  const speedDiff = currentReport.speed -  previousReport.speed;

  if (speedDiff >= 10) return true;

  return false;

}

/*
 *  This strategy takes a distance value in feet, determines how much time
 *  a vehicle would take to travel that distance at the measured speed,
 *  and checks to see if that amount of time is >= the elapsed time
 *  between reports.
 *
 */
exports.inboundElapsedTime = (previousReport, currentReport, gapSize = 18) => {

  const gapTime = gapSize / ((5280 * currentReport.speed) / 3600);

  return currentReport.time - previousReport.time >= gapTime;

}

