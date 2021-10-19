import React, { useEffect, useState } from "react"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import { observer } from "mobx-react"
import { useStore, LocationDataStoreProvider } from "../../stores/locationData"
import getLiveLocationCountsByDay from "../../utils/getLiveLocationCountsByDay"
import memoizeOne from "memoize-one"
import CountReport from "../CountReport"
import CountStats from "../CountStats"
import { Box, LinearProgress } from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: 20,
    marginBottom: 20,
    display: 'inline-block',
  },
  loadingContainer: {
    height: '25px',
  }
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

export default observer(() => {
  const classes = useStyles()
  const { queryDate, setQueryDate, selectedLocation, setSelectedLocation } = useStore()
  const [location, setLocation] = useState({})
  const [counts, setCounts] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function getData() {
      if (!selectedLocation || !queryDate) return
      setIsLoading(true);
      try {
        const dailyCounts = await getLiveLocationCountsByDay(selectedLocation.id, queryDate);
        setCounts(dailyCounts)
      } catch (err) {
        setIsLoading(false);
        return
      }

      setIsLoading(false);
    })()
  }, [queryDate, selectedLocation])

  return (
    <LocationDataStoreProvider>
      <Box className={classes.loadingContainer}>
        {isLoading && <LinearProgress  />}
      </Box>
      <Container>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
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
        </Box>

        <Box>

          {counts.length > 0 && (
            <React.Fragment>
              <CountStats
                counts={counts}
                speedLimit={location && location.speedLimit}
              />
              <CountReport counts={counts} />
            </React.Fragment>
          )}
        </Box>
      </Container>
    </LocationDataStoreProvider>
  )
})