import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import ReportDateChooser from "./ReportDateChooser"
import getDB from "../utils/getDB"
import moment from "moment"
import styled from "styled-components"
import percentile from "percentile"
import { numberFormat } from "humanize"
import serializeToChart from "../utils/serializeToChart"

const database = getDB()

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 20px;
`

const Title = styled.div`
  margin: 0 auto;
  display: inline-flex;
  align-items: center;
`

const Stat = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin-bottom: 30px;
`

const formatNumber = num => numberFormat(num, 0)

export default ({ location = null }) => {
  const [date, setDate] = useState(null)
  const [counts, setCounts] = useState(null)
  const [speeds, setSpeeds] = useState(null)
  const [chart, setChart] = useState(null)

  useEffect(() => {
    if (!date) return

    database
      .ref(`speedreports/${location}/counts/${date}`)
      .once("value")
      .then(snapshot => {
        const data = snapshot.toJSON()
        const counts = Object.values(data)

        setCounts(counts)

        setSpeeds(counts.map(c => c.correctedSpeed))

        const chart = serializeToChart(counts)

        setChart(chart)
      })
  }, [date])

  const totals = []

  const rows =
    chart &&
    Object.keys(chart).map((hour, i) => {
      return (
        <tr key={i}>
          <td>
            <strong>{hour}</strong>
          </td>
          {chart[hour].map((cars, i) => {
            if (!totals[i]) {
              totals[i] = 0
            }
            totals[i] = totals[i] + cars

            return <td key={i}>{formatNumber(cars)}</td>
          })}
        </tr>
      )
    })

  return (
    <Container>
      <Title>
        <h3>Show Hourly Reports for</h3>&nbsp;
        <ReportDateChooser
          location={location}
          handleChange={e => {
            setDate(e.target.value)
          }}
        />
      </Title>

      {chart && (
        <Stats>
          <Stat>
            <b>Total vehicles</b>
            <span>{formatNumber(counts.length)}</span>
          </Stat>

          <Stat>
            <b>Total > 30 mph</b>
            <span>
              {formatNumber(totals.slice(6).reduce((a, b) => a + b, 0))}
            </span>
          </Stat>

          <Stat>
            <b>Total > 35 mph</b>
            <span>
              {formatNumber(totals.slice(7).reduce((a, b) => a + b, 0))}
            </span>
          </Stat>

          <Stat>
            <b>50th Percentile Speed</b>
            <span>{Math.floor(percentile(50, speeds))} mph</span>
          </Stat>

          <Stat>
            <b>85th Percentile Speed</b>
            <span>{Math.floor(percentile(85, speeds))} mph</span>
          </Stat>
        </Stats>
      )}

      {chart && (
        <table>
          <thead>
            <tr>
              <th>Hour</th>
              {Object.values(chart)[0].map((val, i) => {
                return (
                  <th key={i}>
                    {i * 5} - {(i + 1) * 5 - 1} mph
                  </th>
                )
              })}
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Totals:</td>
              {totals.map((val, i) => (
                <td key={i}>{formatNumber(val)}</td>
              ))}
            </tr>

            {rows}
          </tbody>
        </table>
      )}
    </Container>
  )
}
