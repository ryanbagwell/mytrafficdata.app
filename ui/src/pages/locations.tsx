import React from "react"
import { Router } from "@reach/router"
import LocationView from "../components/LocationView"
import CreateLocationView from "../components/CreateLocationView"

export default () => {
  return (
    <Router basepath="/locations">
      <CreateLocationView path="/create" />
      <LocationView path="/:locationId/daily-report" />
      <LocationView path="/:locationId/status" />
      <LocationView path="/:locationId" />
    </Router>
  )
}
