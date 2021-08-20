import React from "react"
import percentile from "percentile"
import { numberFormat } from "humanize"
import Paper from "@material-ui/core/Paper"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  cardTitle: {
    fontSize: 14,
  },
  cardStat: {
    textAlign: "center",
  },
  paper: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    width: "100%",
    padding: "20px 20px 0 20px",
    flexWrap: "wrap",
  },
  card: {
    marginBottom: 20,
  },
})

const formatNumber = (num) => numberFormat(num, 0)

interface Count {
  correctedSpeed: number
  endTime: number
  startTime: number
  magnitude: number
  measuredSpeed: number
}

interface CountStatsProps {
  counts: Count[]
  speedLimit: number
}

const StatCard = ({ title, stat }) => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.cardTitle}
          color="textSecondary"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography variant="h5" component="h2" className={classes.cardStat}>
          {stat}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ({ counts, speedLimit }: CountStatsProps) => {
  const classes = useStyles()
  if (!counts) return null

  const speeds = counts.map((c) => {
    if (typeof c === "object") {
      return c.correctedSpeed
    } else {
      return c
    }
  })

  const overFive = speedLimit ? speeds.filter((s) => s > speedLimit + 5) : null
  const overTen = speedLimit ? speeds.filter((s) => s > speedLimit + 10) : null

  return (
    <Paper className={classes.paper}>
      <Typography
        variant="h5"
        component="h2"
        style={{ width: "100%", textAlign: "center", marginBottom: 20 }}
      >
        Count Summary
      </Typography>

      <StatCard title="Total Vehicles" stat={formatNumber(counts.length)} />
      {speedLimit && (
        <StatCard
          title={`Total > ${speedLimit + 5} mph`}
          stat={formatNumber(overFive.length)}
        />
      )}
      {speedLimit && (
        <StatCard
          title={`Total > ${speedLimit + 10}`}
          stat={formatNumber(overTen.length)}
        />
      )}
      <StatCard
        title="50th Percentile Speed"
        stat={`${Math.floor(percentile(50, speeds))} mph`}
      />
      <StatCard
        title="85th Percentile Speed"
        stat={`${Math.floor(percentile(85, speeds))} mph`}
      />
    </Paper>
  )
}
