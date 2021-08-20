import React, { useEffect, useState } from "react"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"
import { observer } from "mobx-react"
import { useStore, GlobalStoreProvider } from "../stores/global"
import Page from "./Page"
import TextField from "@material-ui/core/TextField"
import SaveButton from "./SaveButton"
import firebase from "gatsby-plugin-firebase"
import "firebase/firestore"
import slugify from "slugify"

interface CountLocation {
  name: string
  address: string
  city: string
  state: string
  zip: string
  slug: string
  ownerId: string
  owner: string // a firebase reference field
}

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: 20,
    marginBottom: 20,
  },
}))

export default observer((props) => {
  const classes = useStyles()
  const { userProfile } = useStore()

  useEffect(() => {}, [])

  const createCountLocation = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    const fs = firebase.firestore()
    const data: CountLocation = [...form].reduce((final, [key, value]) => {
      return {
        ...final,
        [key]: value,
      }
    }, {})

    data.slug = slugify(data.name, { lower: true })
    data.ownerId = userProfile.uid
    data.owner = fs.doc("users/" + userProfile.uid)
    await fs.collection("locations").add(data)
  }

  return (
    <GlobalStoreProvider>
      <Page title={`Create new count location`}>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form
            noValidate
            className={classes.form}
            onSubmit={createCountLocation}
          >
            <TextField
              id="outlined-full-width"
              label="Name"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="name"
            />
            <TextField
              id="outlined-full-width"
              label="Address"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="address"
            />
            <TextField
              id="outlined-full-width"
              label="City"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="city"
            />
            <TextField
              id="outlined-full-width"
              label="State"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="state"
            />
            <TextField
              id="outlined-full-width"
              label="ZIP"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="zip"
            />
            <TextField
              id="outlined-full-width"
              label="Speed limit"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="speedLimit"
            />
            <SaveButton />
          </form>
        </Container>
      </Page>
    </GlobalStoreProvider>
  )
})
