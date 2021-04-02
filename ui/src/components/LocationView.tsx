import React, { useEffect, useState } from "react"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import { observer } from "mobx-react"
import { useStore, LocationDataStoreProvider } from "../stores/locationData"
import CountReport from "./CountReport"
import CountStats from "./CountStats"
import Page from "./Page"
import firebase from "gatsby-plugin-firebase"

interface LocationDataProps {
  locationTitle: string
  locationSlug: string
}

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: 20,
    marginBottom: 20,
  },
}))

const getDateStringFromTimestamp = seconds => {
  const d = new Date(seconds * 1000)
  return `${d.getFullYear()}-${`0${d.getMonth() + 1}`.slice(
    -2
  )}-${`0${d.getDate()}`.slice(-2)}`
}

export default observer((props: LocationDataProps) => {
  const classes = useStyles()
  const { queryDate, setQueryDate } = useStore()
  const [counts, setCounts] = useState(null)
  const { locationSlug } = props

  const queryDateString = getDateStringFromTimestamp(queryDate)

  useEffect(() => {
    if (!queryDate) return

    const queryDateString = getDateStringFromTimestamp(queryDate)

    const ref = firebase
      .database()
      .ref(`speedreports/${locationSlug}/counts/${queryDateString}`)

    ref
      .once("value")
      .then(snapshot => {
        const data = snapshot.toJSON()
        const counts = Object.values(data)
        setCounts(counts)
      })
      .catch(err => {
        console.log(err)
      })
  }, [queryDate, locationSlug])

  return (
    <LocationDataStoreProvider>
      <Page title={`Locations > ${props.locationSlug.replace(/-/g, " ")}`}>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form noValidate className={classes.form}>
            <TextField
              id="datetime-local"
              label="Choose a date"
              type="date"
              defaultValue={queryDateString}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: getDateStringFromTimestamp(Date.now() / 1000),
              }}
              onChange={e => setQueryDate(e.target.value)}
            />
          </form>

          <CountStats counts={counts} />
          <CountReport counts={counts} />
        </Container>
      </Page>
    </LocationDataStoreProvider>
  )
})
