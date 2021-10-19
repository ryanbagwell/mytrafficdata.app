import React, { useEffect, useState, useRef } from "react"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import SaveButton from "./SaveButton"
import slugify from "slugify"


import type {Location} from '../declarations'


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


interface LocationFormProps {
  onSubmit: (event) => void;
  locationData: Location;
}


export default (props: LocationFormProps) => {
  const formRef = useRef()
  const classes = useStyles()

  const parseFieldValues = () => {

    const form = new FormData(formRef.current)

    const data: Location = [...form].reduce((final, [key, value]) => {
      return {
        ...final,
        [key]: value,
      }
    }, {})

    data.slug = slugify(data.name, { lower: true })
    data.isPublic = form.has('isPublic');

    return data

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = parseFieldValues()
    props.onSubmit(data);
  }


  return (
    <form
      ref={formRef}
      noValidate
      className={classes.form}
      onSubmit={handleSubmit}
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
          defaultValue={props.locationData.name}
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
          defaultValue={props.locationData.address}
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
          defaultValue={props.locationData.city}
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
          defaultValue={props.locationData.state}
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
          defaultValue={props.locationData.zip}
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
          defaultValue={props.locationData.speedLimit}
      />
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked={props.locationData.isPublic}
            name="isPublic"
          />
        }
        label="Allow public access?" />
      <br />
      <SaveButton />
    </form>
  )
}
