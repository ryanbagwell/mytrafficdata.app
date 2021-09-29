import React, { useEffect, useState } from "react"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"
import { observer } from "mobx-react"
import { useStore, LocationDataStoreProvider } from "../../stores/locationData"
import Page from "../Page"
import getLocationCountsByDay from "../../utils/getLocationCountsByDay"
import getLocationById from "../../utils/getLocationById"
import memoizeOne from "memoize-one"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Paper from "@material-ui/core/Paper"
import DailyReportTab from "./DailyReportTab"

import type {LocationPageProps} from '../../declarations';

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


const TabPanelChooser = ({selectedTab}: {selectedTab: number}) => {
  if (selectedTab === 0) {
    return <DailyReportTab />
  }
  return null
}


export default observer((props: LocationPageProps) => {
  const classes = useStyles()
  const { queryDate, setQueryDate, selectedLocation, setSelectedLocationById } = useStore()
  const [counts, setCounts] = useState({})
  const [location, setLocation] = useState({})
  const [selectedTab, setSelectedTab] = useState(0)
  const { locationId } = props

  console.log(location)

  useEffect(() => {
    setSelectedLocationById(props.locationId)
  }, [])

  // useEffect(() => {
  //   if (!queryDate) return
  //   ;(async function getData() {
  //     const dailyCount = await getLocationCountsByDay(locationId, queryDate)
  //     console.log(dailyCount)
  //     setCounts(dailyCount.speedsByHour)
  //   })()
  // }, [queryDate, locationId])

  // const allSpeeds = getSpeedList(counts)

  // Flatten this to prepare it for passing to our countReport component
  //const flattenedSpeeds = getFlattenedSpeeds(counts, queryDate)

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
              onChange={(e, newValue) => {
                setSelectedTab(newValue)
              }}
              value={selectedTab}
            >
              <Tab label="Daily Report" />
              <Tab label="Trends" />
              <Tab label="Location Details" />
            </Tabs>
          </Paper>

          <TabPanelChooser selectedTab={selectedTab} />

          {/* <form noValidate className={classes.form}>
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
          {flattenedSpeeds.length && <CountReport counts={flattenedSpeeds} />} */}
        </Container>
      </Page>
    </LocationDataStoreProvider>
  )
})
