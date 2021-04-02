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

const formatNumber = num => numberFormat(num, 0)

interface Count {
  correctedSpeed: number
  endTime: number
  startTime: number
  magnitude: number
  measuredSpeed: number
}

interface CountStatsProps {
  counts: Count[]
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

export default ({ counts }: CountStatsProps) => {
  const classes = useStyles()
  if (!counts) return null

  const speeds = counts.map(c => c.correctedSpeed)

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
      <StatCard
        title="Total > 30 mph"
        stat={formatNumber(counts.filter(c => c.correctedSpeed > 30).length)}
      />
      <StatCard
        title="Total > 35 mph"
        stat={formatNumber(counts.filter(c => c.correctedSpeed > 35).length)}
      />
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
