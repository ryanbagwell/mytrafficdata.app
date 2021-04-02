import React from "react"
import Page from "../components/Page"
import { Router } from "@reach/router"
import LocationView from "../components/LocationView"

export default () => {
  return (
    <Router basepath="/locations">
      <LocationView path=":locationSlug" />
    </Router>
  )
}
