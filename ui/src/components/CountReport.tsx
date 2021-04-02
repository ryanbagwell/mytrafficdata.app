import React from "react"
import moment from "moment"
import { numberFormat } from "humanize"
import serializeToChart from "../utils/serializeToChart"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

const formatNumber = num => numberFormat(num, 0)

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  container: {
    width: "100%",
    padding: 20,
    marginTop: 20,
  },
  headerCell: {
    minWidth: 75,
    padding: "10px 10px 0 10px",
  },
})

interface Count {
  correctedSpeed: number
  endTime: number
  startTime: number
  magnitude: number
  measuredSpeed: number
}

interface CountReportProps {
  counts: Count[]
}

export default ({ counts }: CountReportProps) => {
  const classes = useStyles()
  if (!counts) return null

  const chart = serializeToChart(counts)

  const totals = []

  const rows =
    chart &&
    Object.keys(chart).map((hour, i) => {
      return (
        <TableRow key={i}>
          <TableCell align="left">
            <strong>{moment(hour, "HH").format("h a")}</strong>
          </TableCell>
          {chart[hour].map((cars, i) => {
            if (!totals[i]) {
              totals[i] = 0
            }
            totals[i] = totals[i] + cars

            return (
              <TableCell align="left" key={i}>
                {formatNumber(cars)}
              </TableCell>
            )
          })}
        </TableRow>
      )
    })

  if (!chart) return null

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Typography
        variant="h5"
        component="h2"
        style={{ width: "100%", textAlign: "center", marginBottom: 20 }}
      >
        Hourly Report
      </Typography>

      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Speed (mph)</TableCell>
            {Object.values(chart)[0].map((val, i) => {
              return (
                <TableCell align="left" className={classes.headerCell}>
                  {i * 5} - {(i + 1) * 5 - 1}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              Totals:
            </TableCell>
            {totals.map((val, i) => (
              <TableCell key={i} component="th" scope="row">
                {formatNumber(val)}
              </TableCell>
            ))}
          </TableRow>
          {rows}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
