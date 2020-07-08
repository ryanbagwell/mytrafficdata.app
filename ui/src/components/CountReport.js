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
  padding: 50px 0;
  max-width: 100%;
  width: 100%;
  overflow: auto;
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
  margin: 15px;
`

const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin-bottom: 30px;
  flex-wrap: wrap;
`
const Table = styled.table`
  font-size: 15px;
`

const TH = styled.th`
  text-align: center;
  font-size: 15px;
  padding-left: 0.1vw;
  padding-right: 0.1vw;
  min-width: 50px;

  &:first-child {
    text-align: left;
    padding-left: 0;
    min-width: 90px;
  }
`

const TD = styled.td`
  text-align: center;
  padding-left: 0.1vw;
  padding-right: 0.1vw;
  min-width: 50px;

  &:first-child {
    text-align: left;
    padding-left: 0;
    min-width: 90px;
  }

  &:nth-child(even) {
    background: #eeeeee;
  }
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
          <TD>
            <strong>{moment(hour, "HH").format("h a")}</strong>
          </TD>
          {chart[hour].map((cars, i) => {
            if (!totals[i]) {
              totals[i] = 0
            }
            totals[i] = totals[i] + cars

            return <TD key={i}>{formatNumber(cars)}</TD>
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
        <Table>
          <thead>
            <tr>
              <TH>Speed (mph)</TH>
              {Object.values(chart)[0].map((val, i) => {
                return (
                  <TH key={i}>
                    {i * 5} - {(i + 1) * 5 - 1}
                  </TH>
                )
              })}
            </tr>
          </thead>

          <tbody>
            <tr>
              <TD>Totals:</TD>
              {totals.map((val, i) => (
                <TD key={i}>{formatNumber(val)}</TD>
              ))}
            </tr>

            {rows}
          </tbody>
        </Table>
      )}
    </Container>
  )
}
