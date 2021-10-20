/*
 *  Takes a list of individual vehicle counts and
 *  summarizes them into a 2D list.
 *
 *  Each key in the list represents an hour of the day, i.e
 *  hour 0 represents 12 am - 12:59am, hour 1 = 1am - 1:59am, etc.
 *
 *  Each value is a list of numbers representing the speed of each vehicle counted.
 *
 *  Example:
 *
 *  [
 *    [35, 67, 21],
 *    [15,  23, 33],
 *    etc ...
 *  ]
 */
import type {RawVehicleCount} from '../declarations';

export default (counts: RawVehicleCount[]) => {
  const speedsByHour = [...Array(24).keys()].map(() => [])

  for (const count of counts) {
    const { countTimestamp, correctedSpeed, endTime, magnitude } = count;
    const d = new Date(countTimestamp)
    const hour = d.getHours()
    const speed = Math.round(correctedSpeed)
    speedsByHour[hour].push(speed);
  }
  return speedsByHour
}