import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { observer } from "mobx-react"
import { useStore } from "../stores/global"

import LaunchIcon from "@material-ui/icons/Launch"
import PersonIcon from "@material-ui/icons/Person"
import AddIcon from "@material-ui/icons/Add"
import ExitIcon from "@material-ui/icons/ExitToApp"
import useAuthenticaton from "../hooks/useAuthenticaton"
import { Link } from "gatsby"
import useUserLocations from "../hooks/useUserLocations"
import usePublicLocations from "../hooks/usePublicLocations"

const useStyles = makeStyles({
  list: {
    width: 250,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "100%",
  },
  fullList: {
    width: "auto",
  },
  mainMenuLink: {
    color: "inherit",
    textDecoration: "none",
  },
  menuItemHeader: {
    fontWeight: "bold",
  },
})

const MenuItem = React.memo(
  ({
    icon,
    link,
    text,
    bold,
  }: {
    icon?: JSX.Element
    link?: string
    text: string
    bold?: boolean
  }) => {
    const classes = useStyles()
    const { isSidebarMenuOpen, setIsSidebarMenuOpen } = useStore()
    return (
      <ListItem button={Boolean(link)} key={text}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText
          classes={{
            root: classes.menuItemHeader,
          }}
          primaryTypographyProps={{
            style: {
              fontWeight: bold ? "bold" : "normal",
            },
          }}
        >
          {link ? (
            <Link
              className={classes.mainMenuLink}
              to={link}
              onClick={() => setIsSidebarMenuOpen(false)}
            >
              {text}
            </Link>
          ) : (
            text
          )}
        </ListItemText>
      </ListItem>
    )
  }
)

export default observer(() => {
  const { isSidebarMenuOpen, setIsSidebarMenuOpen, userProfile } = useStore()
  const userLocations = useUserLocations(userProfile.uid)
  const publicLocations = usePublicLocations();
  const classes = useStyles()

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <List>
        <MenuItem text="Home" link="/" />
        <MenuItem text="About" link="/about/" />
        <Divider />
        <MenuItem text="Count Locations" bold />
        {publicLocations.map((loc) => {
          return (<MenuItem
            text="Upham Street, Melrose, MA"
            link={`/locations/${loc.id}`}
          />)
        })}

      </List>
      {userProfile.uid && (
        <List>
          <Divider />
          <MenuItem text="My Count Locations" bold />
          {userLocations.map((loc) => (
            <MenuItem text={loc.name} link={`/locations/${loc.id}`} />
          ))}
          <MenuItem
            text="Add location"
            icon={<AddIcon />}
            link="/locations/create"
          />
        </List>
      )}
      <List>
        <Divider />
        {userProfile.uid && (
          <>
            <MenuItem text={`Welcome ${userProfile.displayName}`} />
            <MenuItem
              text="My Account"
              link="/account/"
              icon={<PersonIcon />}
            />
            <MenuItem text="Sign Out" link="/logout/" icon={<ExitIcon />} />
          </>
        )}
        {!userProfile.uid && (
          <ListItem button key="Sign In">
            <ListItemIcon>
              +
              <LaunchIcon />
            </ListItemIcon>
            <ListItemText>
              <Link to="/login/">Sign In</Link>
            </ListItemText>
          </ListItem>
        )}
      </List>
    </div>
  )

  return (
    <div>
      <Drawer
        anchor="left"
        open={isSidebarMenuOpen}
        onClose={() => setIsSidebarMenuOpen(false)}
      >
        {list("left")}
      </Drawer>
    </div>
  )
})
