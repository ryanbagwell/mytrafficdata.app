import React from "react"
import { Router } from "@reach/router"
import LocationView from "../components/LocationView"
import LegacyLocationView from "../components/LegacyLocationView"
import CreateLocationView from "../components/CreateLocationView"

export default () => {
  return (
    <Router basepath="/locations">
      <CreateLocationView path="/create" />
      <LegacyLocationView path="/legacy/:locationSlug" />
      <LocationView path="/:locationId/daily-report" />
      <LocationView path="/:locationId" />
    </Router>
  )
}
