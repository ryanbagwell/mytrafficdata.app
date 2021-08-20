import React from "react"
import Button from "@material-ui/core/Button"
import SaveIcon from "@material-ui/icons/Save"

export default (props, children) => {
  return (
    <Button
      type="submit"
      component="button"
      variant="contained"
      color="primary"
      size="large"
      startIcon={<SaveIcon />}
      {...props}
    >
      Save
    </Button>
  )
}
