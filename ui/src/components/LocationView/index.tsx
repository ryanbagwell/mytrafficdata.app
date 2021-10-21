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
import LiveSpeedTab from './LiveSpeedTab'
import { navigate } from "@reach/router"

import type {LocationPageProps} from '../../declarations';


export default observer((props: LocationPageProps) => {
  const {selectedLocation, setSelectedLocationById } = useStore()
  const [selectedTab, setSelectedTab] = useState(props.tabName || 'daily-report')
  const [selectedTabTitle, setSelectedTabTitle] = useState(null)
  const {userProfile} = useGlobalStore()
  const [selectedTabComponent, setSelectedTabComponent] = useState(<DailyReportTab />);

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
    props.navigate(`../${selectedTab}`);
    if (selectedTab === 'daily-report') {
      setSelectedTabComponent(<DailyReportTab />);
      setSelectedTabTitle('Daily Report');
    }
    if (selectedTab === 'live-speed') {
      setSelectedTabComponent(<LiveSpeedTab />);
      setSelectedTabTitle('Live Speeds');
    }
    if (selectedTab === 'trends') {
      setSelectedTabComponent(<TrendsTab />);
      setSelectedTabTitle('Trends');
    }
    if (selectedTab === 'location-details') {
      setSelectedTabComponent(<LocationDetailsTab />);
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
              <Tab label="Daily Report" value="daily-report" />
              <Tab label="Live Speed" value="live-speed" />
              <Tab label="Trends" value="trends" />
              {userProfile.uid == (selectedLocation && selectedLocation.ownerId) && (
                <Tab label="Location Details" value="location-details" />
              )}
            </Tabs>
          </Paper>

          {selectedTabComponent}

        </Container>
      </Page>
    </LocationDataStoreProvider>
  )
})
