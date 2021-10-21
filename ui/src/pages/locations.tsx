import React from "react"
import { Router, Redirect } from "@reach/router"
import LocationView from "../components/LocationView"
import CreateLocationView from "../components/CreateLocationView"


const RedirectToDailyReport = (props) => {
  return <Redirect to={`${props.uri}/daily-report`} />
}


export default () => {
  return (
    <Router basepath="/locations">
      <CreateLocationView path="/create" />
      <LocationView path="/:locationId/:tabName" />
      <RedirectToDailyReport path="/:locationId" />
    </Router>
  )
}
