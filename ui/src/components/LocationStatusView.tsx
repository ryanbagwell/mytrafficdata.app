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
import LocationNav from './LocationNav'

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


export default observer((props: LocationDataProps) => {
  const classes = useStyles()
  const { queryDate, setQueryDate } = useStore()

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
          <LocationNav />

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
