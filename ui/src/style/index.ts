import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles({
  root: {},
  mainMenuLink: {
    color: "inherit",
    textDecoration: "none",
  },
  mainMenuUserName: {
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
})
