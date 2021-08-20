import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import SaveButton from "./SaveButton"
import Paper from "@material-ui/core/Paper"
import { observer } from "mobx-react"
import { useStore } from "../stores/global"

const useStyles = makeStyles({
  paper: {
    padding: 20,
    maxWidth: "calc(100% - 40px)",
    margin: "20px auto",
  },
  form: {
    maxWidth: "90%",
  },
})

interface UserProfileProps {
  firstName?: string
  lastName?: string
  email: string
  displayName: string
  phoneNumber: string
}

export default observer(() => {
  const classes = useStyles()
  const { userProfile, updateUserProfile } = useStore()

  if (!userProfile.uid) return null

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        className={classes.form}
        onSubmit={(e) => {
          e.preventDefault()
          const form: UserProfileProps = new FormData(e.currentTarget)
          const data = [...form].reduce((final, [key, value]) => {
            return {
              ...final,
              [key]: value,
            }
          }, {})
          updateUserProfile(data)
        }}
      >
        <TextField
          id="outlined-full-width"
          label="First Name"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          name="firstName"
          defaultValue={userProfile.firstName}
        />

        <TextField
          id="outlined-full-width"
          label="Last Name"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          name="lastName"
          defaultValue={userProfile.lastName}
        />

        <TextField
          id="outlined-full-width"
          label="Display Name"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          defaultValue={userProfile.displayName}
          name="displayName"
        />

        <TextField
          id="outlined-full-width"
          label="Email"
          type="email"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          name="email"
          variant="outlined"
          defaultValue={userProfile.email}
        />

        <TextField
          id="outlined-full-width"
          label="Address"
          type="text"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          name="address"
          variant="outlined"
          defaultValue={userProfile.address}
        />

        <TextField
          id="outlined-full-width"
          label="City"
          type="text"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          name="city"
          variant="outlined"
          defaultValue={userProfile.city}
        />

        <TextField
          id="outlined-full-width"
          label="State"
          type="text"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          name="state"
          variant="outlined"
          defaultValue={userProfile.state}
        />

        <TextField
          id="outlined-full-width"
          label="ZIP"
          type="text"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          name="zip"
          variant="outlined"
          defaultValue={userProfile.zip}
        />

        <TextField
          name="phoneNumber"
          id="outlined-full-width"
          label="Phone Number"
          type="phone"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          defaultValue={userProfile.phoneNumber}
        />

        <SaveButton />
      </form>
    </Paper>
  )
})
