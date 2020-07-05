import React, { useState, useEffect } from "react"
import moment from "moment"
import shallowQuery from "../utils/shallowQuery"

export default ({ location = null, handleChange = () => {} }) => {
  const cachedDates = window.localStorage.getItem("CACHED_DATES") || "[]"

  const [dates, setDates] = useState(JSON.parse(cachedDates))

  useEffect(() => {
    if (!location) return
    shallowQuery(`speedreports/${location}/counts`).then(data => {
      const dates = Object.keys(data).sort((a, b) => {
        return moment(b).unix() - moment(a).unix()
      })
      window.localStorage.setItem("CACHED_DATES", JSON.stringify(dates))
      setDates(dates)
    })
  }, [location])

  return (
    <form>
      <select onChange={handleChange}>
        <option value="">Select a date</option>
        {dates.map((name, i) => (
          <option value={name} key={i}>
            {name}
          </option>
        ))}
      </select>
    </form>
  )
}
