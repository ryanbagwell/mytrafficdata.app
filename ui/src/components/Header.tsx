import React, { useState } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import { observer } from "mobx-react"
import { useStore } from "../stores/global"
import useMediaQuery from '@material-ui/core/useMediaQuery'

interface HeaderProps {
  displayTitle?: string
}

export default observer(({ displayTitle }: HeaderProps) => {
  const store = useStore()
  const isMobile = useMediaQuery('(max-width:600px)')

  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon
              onClick={event =>
                store.setIsSidebarMenuOpen(!store.isSidebarMenuOpen)
              }
            />
          </IconButton>
          {!isMobile && (
            <Typography variant="h6">{displayTitle}</Typography>
          )}
        </Toolbar>
      </AppBar>
    </header>
  )
})
