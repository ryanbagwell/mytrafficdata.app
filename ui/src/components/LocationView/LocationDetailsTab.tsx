import React, { useEffect, useState } from "react"
import Container from "@material-ui/core/Container"
import { observer } from "mobx-react"
import { useStore } from "../../stores/locationData"
import LocationForm from '../LocationForm';
import useFirebase from '../../hooks/useFirebase'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useFirestore from "../../hooks/useFirestore";

import type {Location} from '../../declarations'

export default observer((props) => {
    const {selectedLocation, setSelectedLocationById} = useStore()
    const firebase = useFirebase()
    const [isSnackbarOpen, setSnackbarOpen] = React.useState(false);
    const firestore = useFirestore();

    const save = async (data: Location) => {

      await firestore.collection("locations")
        .doc(selectedLocation.id)
        .update(data)
        .then(() => {
          setSnackbarOpen(true)
        })

      setSelectedLocationById(selectedLocation.id)
    }

    return (
      <Container>
        <LocationForm
          locationData={selectedLocation}
          onSubmit={save}
        />

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={isSnackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message="Details saved!"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setSnackbarOpen(false)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />

      </Container>
    )

})