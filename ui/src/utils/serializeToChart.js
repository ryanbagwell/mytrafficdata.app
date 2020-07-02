/*
 *  Takes a raw, flat list of speed counts and serializes them into
 *  a 2D array for chart output.
 *
 *  Each hour consists of an array of ranges like:
 *  0-4, 5-9, 10-14, 15-19, etc ...
 */
const moment = require("moment")

module.exports = (counts = []) => {
  //Find the max speed
  const maxSpeed = Math.max(...counts.map(c => c.correctedSpeed))

  //Figure out how many columns we'll need for our totals
  const columns = Math.round(Math.round(maxSpeed) / 5 + 1)

  //Set up our grid with 24 hours as rows and columns of speed ranges
  const grid = [...Array(24).keys()].reduce((final, current) => {
    final[parseInt(current)] = Array(columns).fill(0)
    return final
  }, {})

  // Now assign values to our chart
  const chart = counts.reduce((final, current) => {
    // Get the hour of the count. Note that moment will
    // convert the UTC timestamp to the local timezone
    let hour = parseInt(moment.unix(current.endTime).format("H"))

    //Get the range position it should be in
    let range = Math.floor(current.correctedSpeed / 5)

    // If we haven't created the row (hour) for our ranges, create it now
    if (final[hour] === null) {
      final[hour] = Array(columns).fill(0)
    }

    // Now add one to the range for that hour
    final[hour][range] = final[hour][range] + 1

    return final
  }, grid)

  return chart
}
