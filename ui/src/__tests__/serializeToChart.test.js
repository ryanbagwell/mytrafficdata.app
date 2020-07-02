const fs = require("fs")
const serializeToChart = require("../utils/serializeToChart")
const moment = require("moment")

test("Can correctly serialize chart", () => {
  const data = fs.readFileSync(`${__dirname}/set1.json`, {
    encoding: "utf-8",
  })

  const summary = {}

  JSON.parse(data).map(d => {
    const hour = moment.unix(d.endTime).format("H")
    if (!summary[hour]) {
      summary[hour] = 0
    }

    summary[hour] = summary[hour] + 1
  })

  const chart = serializeToChart(JSON.parse(data))

  Object.keys(summary).map(k => {
    const expectedTotal = summary[k]
    const chartHourTotal = chart[k].reduce((final, current) => {
      final = final + current
      return final
    }, 0)
    expect(chartHourTotal).toBe(expectedTotal)
  })
})
