import React, { useEffect, useState } from "react"
import Container from "@material-ui/core/Container"
import { observer } from "mobx-react"
import { useStore, LocationDataStoreProvider } from "../../stores/locationData"
import { useStore as useGlobalStore } from "../../stores/global"
import Page from "../Page"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Paper from "@material-ui/core/Paper"
import DailyReportTab from "./DailyReportTab"
import LocationDetailsTab from "./LocationDetailsTab"
import TrendsTab from './TrendsTab'

import type {LocationPageProps} from '../../declarations';

const TabPanelChooser = ({selectedTab}: {selectedTab: number}) => {
  if (selectedTab === 0) {
    return <DailyReportTab />
  }
  if (selectedTab === 1) {
    return <TrendsTab />
  }
  if (selectedTab === 2) {
    return <LocationDetailsTab />
  }
  return null
}


export default observer((props: LocationPageProps) => {
  const {selectedLocation, setSelectedLocationById } = useStore()
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedTabTitle, setSelectedTabTitle] = useState(null)
  const {userProfile} = useGlobalStore()

  useEffect(() => {
    try {
      setSelectedLocationById(props.locationId).catch((err) => {
        console.log(err)
      })
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    if (selectedTab === 0) {
      setSelectedTabTitle('Daily Report');
    }
    if (selectedTab === 1) {
      setSelectedTabTitle('Trends');
    }
    if (selectedTab === 2) {
      setSelectedTabTitle('Location Details');
    }
  }, [selectedTab])

  return (
    <LocationDataStoreProvider>
      <Page title={`Locations > ${(selectedLocation && selectedLocation.name) || "..."} > ${selectedTabTitle}`}>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "left",
            padding: 0,
            maxWidth: '100%',
          }}
        >
          <Paper square>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              aria-label="disabled tabs example"
              onChange={(e, newValue) => {
                setSelectedTab(newValue)
              }}
              value={selectedTab}
            >
              <Tab label="Daily Report" />
              <Tab label="Trends" />
              {userProfile.uid == (selectedLocation && selectedLocation.ownerId) && (
                <Tab label="Location Details" />
              )}
            </Tabs>
          </Paper>

          <TabPanelChooser selectedTab={selectedTab} />

        </Container>
      </Page>
    </LocationDataStoreProvider>
  )
})
