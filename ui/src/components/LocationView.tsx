import React, { useEffect, useState } from "react"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import { observer } from "mobx-react"
import { useStore, LocationDataStoreProvider } from "../stores/locationData"
import CountReport from "./CountReport"
import CountStats from "./CountStats"
import Page from "./Page"
import getLocationCountsByDay from "../utils/getLocationCountsByDay"
import getLocationById from "../utils/getLocationById"
import memoizeOne from "memoize-one"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Paper from "@material-ui/core/Paper"

interface LocationDataProps {
  locationTitle: string
  locationSlug: string
  locationId: string
}

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: 20,
    marginBottom: 20,
  },
}))

const getDateStringFromTimestamp = (seconds) => {
  const d = new Date(seconds * 1000)
  return `${d.getFullYear()}-${`0${d.getMonth() + 1}`.slice(
    -2
  )}-${`0${d.getDate()}`.slice(-2)}`
}

const getSpeedList = memoizeOne((counts) => {
  return Object.keys(counts).reduce((final, hour) => {
    const hourSpeeds = counts[hour]
    return [...final, ...hourSpeeds]
  }, [])
})

const getFlattenedSpeeds = memoizeOne((counts, queryDate) => {
  return Object.keys(counts).reduce((final, hour) => {
    const d = new Date(queryDate)
    d.setMinutes(0)
    d.setSeconds(0)
    d.setMilliseconds(0)

    const hourSpeeds = counts[hour].map((s) => {
      d.setHours(parseInt(hour))
      return {
        correctedSpeed: s,
        endTime: d.getTime(),
      }
    })
    return [...final, ...hourSpeeds]
  }, [])
})

export default observer((props: LocationDataProps) => {
  const classes = useStyles()
  const { queryDate, setQueryDate } = useStore()
  const [counts, setCounts] = useState({})
  const [location, setLocation] = useState({})
  const { locationId } = props

  useEffect(() => {
    if (!locationId) return
    ;(async function () {
      const loc = await getLocationById(locationId)
      setLocation(loc)
    })()
  }, [locationId])

  useEffect(() => {
    if (!queryDate) return
    ;(async function getData() {
      const dailyCount = await getLocationCountsByDay(locationId, queryDate)
      console.log(dailyCount)
      setCounts(dailyCount.speedsByHour)
    })()
  }, [queryDate, locationId])

  const allSpeeds = getSpeedList(counts)

  // Flatten this to prepare it for passing to our countReport component
  const flattenedSpeeds = getFlattenedSpeeds(counts, queryDate)

  return (
    <LocationDataStoreProvider>
      <Page title={`Locations > ${location.name || "..."}`}>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper square>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              aria-label="disabled tabs example"
            >
              <Tab label="Daily Report" />
              <Tab label="Trends" />
              <Tab label="Location Details" />
            </Tabs>
          </Paper>

          <form noValidate className={classes.form}>
            <TextField
              id="datetime-local"
              label="Choose a date"
              type="date"
              defaultValue={queryDate}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: getDateStringFromTimestamp(Date.now() / 1000),
              }}
              onChange={(e) => setQueryDate(e.target.value)}
            />
          </form>

          {allSpeeds.length && (
            <CountStats
              counts={allSpeeds}
              speedLimit={location && location.speedLimit}
            />
          )}
          {flattenedSpeeds.length && <CountReport counts={flattenedSpeeds} />}
        </Container>
      </Page>
    </LocationDataStoreProvider>
  )
})
