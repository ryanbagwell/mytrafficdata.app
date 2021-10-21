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
  card: {
    marginBottom: 20,
  },
  paper: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    width: "100%",
    padding: "20px 20px 0 20px",
    flexWrap: "wrap",
  },
})

const formatNumber = (num) => numberFormat(num, 0)

interface CountStatsProps {
  allSpeeds: number[];
  speedLimit: string;
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

export default ({ allSpeeds, speedLimit }: CountStatsProps) => {
  const classes = useStyles()
  if (!allSpeeds) return null

  const overFive = speedLimit ? allSpeeds.filter((s) => s > parseInt(speedLimit) + 5) : null
  const overTen = speedLimit ? allSpeeds.filter((s) => s > parseInt(speedLimit) + 10) : null

  return (
    <Paper className={classes.paper}>
      <Typography
        variant="h5"
        component="h2"
        style={{ width: "100%", textAlign: "center", marginBottom: 20 }}
      >
        Count Summary
      </Typography>

      <StatCard title="Total Vehicles" stat={formatNumber(allSpeeds.length)} />
      {speedLimit && (
        <StatCard
          title={`Total > ${parseInt(speedLimit) + 5} mph`}
          stat={formatNumber(overFive.length)}
        />
      )}
      {speedLimit && (
        <StatCard
          title={`Total > ${parseInt(speedLimit) + 10}`}
          stat={formatNumber(overTen.length)}
        />
      )}
      <StatCard
        title="50th Percentile Speed"
        stat={`${Math.floor(percentile(50, allSpeeds))} mph`}
      />
      <StatCard
        title="85th Percentile Speed"
        stat={`${Math.floor(percentile(85, allSpeeds))} mph`}
      />
    </Paper>
  )
}
