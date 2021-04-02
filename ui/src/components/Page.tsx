import React, { useState } from "react"
import Header from "./Header"
import HeadMeta from "./HeadMeta"
import SidebarMenu from "./SidebarMenu"
import { makeStyles, ThemeProvider } from "@material-ui/core/styles"
import theme from "../style/theme"

const useStyles = makeStyles({
  main: {
    padding: 0,
  },
})

interface PageProps {
  title: string
  children: JSX.Element | JSX.Element[]
}

export default ({ children, title }: PageProps) => {
  const styles = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <div>
        <HeadMeta title={title} />
        <Header displayTitle={title} />
        <SidebarMenu />
        <main className={styles.main}>{children}</main>
      </div>
    </ThemeProvider>
  )
}
