import React from "react"
import Page from "../components/Page"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"

export default () => {
  return (
    <Page title="Home">
      <Container
        style={{
          height: "calc(100vh - 70px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          style={{
            textAlign: "center",
          }}
        >
          Welcome to My Traffic Data
        </Typography>

        <Typography
          variant="body1"
          component="p"
          style={{
            textAlign: "center",
          }}
        >
          Open the menu to get started
        </Typography>
      </Container>
    </Page>
  )
}
