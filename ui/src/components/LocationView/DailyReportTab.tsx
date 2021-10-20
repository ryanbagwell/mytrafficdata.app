import React, { useEffect, useState } from "react"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import { observer } from "mobx-react"
import { useStore, LocationDataStoreProvider } from "../../stores/locationData"
import getLiveLocationCountsByDay from "../../utils/getLiveLocationCountsByDay"
import CountReport from "../CountReport"
import CountStats from "../CountStats"
import { Box, LinearProgress } from "@material-ui/core"
import getDailySummary from "../../utils/getDailySummary"
import serializeSummaryToChart from "../../utils/serializeSummaryToChart";
import serializeToChart from "../../utils/serializeToChart"


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

export default observer(() => {
  const classes = useStyles()
  const { queryDate, setQueryDate, selectedLocation, setSelectedLocation } = useStore()
  const [allSpeeds, setAllSpeeds] = useState([])
  const [table, setTable] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function getData() {
      if (!selectedLocation || !queryDate) return
      setIsLoading(true);

      const summary = await getDailySummary(queryDate, selectedLocation.id);

      if (summary) {
        const serializedChart = serializeSummaryToChart(summary);

        setTable(serializedChart);
        setAllSpeeds(Object.values(summary.speedsByHour).reduce((f, c) =>  [...f, ...c] , []))
      } else {
        try {
          const dailyCounts = await getLiveLocationCountsByDay(selectedLocation.id, queryDate);
          setTable(serializeToChart(dailyCounts))
          setAllSpeeds(dailyCounts.map((c) => c.correctedSpeed))
        } catch (err) {
          setIsLoading(false);
        }
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

          {table && (
            <React.Fragment>
              <CountStats
                allSpeeds={allSpeeds}
                speedLimit={selectedLocation && selectedLocation.speedLimit}
              />
              <CountReport chart={table} />
            </React.Fragment>
          )}
        </Box>
      </Container>
    </LocationDataStoreProvider>
  )
})