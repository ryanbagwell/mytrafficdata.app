/*
 *  Takes a raw, flat list of speed counts and serializes them into
 *  a 2D array for chart output.
 *
 *  Each hour consists of an array of ranges like:
 *  0-4, 5-9, 10-14, 15-19, etc ...
 */
import type {DailySummary} from '../declarations';

export default (summary: DailySummary): [] => {
  //Find the max speed
  const allSpeeds = Object.values(summary.speedsByHour).reduce((f, c, i) => [...f, ...c], [])

  const maxSpeed = Math.max(...allSpeeds)

  //Figure out how many columns we'll need for our totals
  const columns = Math.round(Math.round(maxSpeed) / 5 + 1)

  //Set up our grid with 24 hours as rows and columns of speed ranges
  const grid = [...Array(24).keys()].reduce((final, current) => {
    final[current] = Array(columns).fill(0)
    return final
  }, {})

  const chart = Object.values(summary.speedsByHour).reduce((chart, hourSpeeds, i) => {
    let hour = i;

    for (const speed of hourSpeeds) {
      //Get the range position it should be in
      let range = Math.floor(speed / 5)

      // If we haven't created the row (hour) for our ranges, create it now
      if (chart[hour] === null) {
        chart[hour] = Array(columns).fill(0)
      }

      chart[hour][range] = chart[hour][range] + 1
    }

    return chart;

  }, grid)

  // Now assign values to our chart
  // const chart = counts.reduce((final, current) => {
  //   // Get the hour of the count. Note that moment will
  //   // convert the UTC timestamp to the local timezone
  //   let hour = parseInt(moment.unix(current.endTime).format("H"))

  //   //Get the range position it should be in
  //   let range = Math.floor(current.correctedSpeed / 5)

  //   // If we haven't created the row (hour) for our ranges, create it now
  //   if (final[hour] === null) {
  //     final[hour] = Array(columns).fill(0)
  //   }

  //   // Now add one to the range for that hour
  //   final[hour][range] = final[hour][range] + 1

  //   return final
  // }, grid)

  return chart
}
