import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"

const Inner = styled.div`
  max-width: 960px;
  margin: 0 auto;
`

const SecondPage = () => (
  <Layout>
    <SEO title="Speed Reports | About" />
    <Inner>
      <h1>About this project</h1>
      <p>
        This goal of this project is to create a low-cost traffic data
        collection device that can be deployed by community members looking to
        quantify vehicle speed and volume data on thier streets.
      </p>
      <p>
        Professional traffic counting devices usually cost thousands of dollars
        and must be deployed in travel lanes (i.e. road tubes) or mounted on
        utility poles, normally requiring the permission of municipal officials.
      </p>
      <h2>How does it work?</h2>
      <p>
        The system uses the{" "}
        <a href="https://omnipresense.com/product/ops241-a-short-range-radar-sensor/">
          Omni Presense OPS241-A radar device ($169)
        </a>
        to report the speeds of passing vehicles.{" "}
        <a
          target="_blank"
          href="https://github.com/ryanbagwell/lidar-speed-camera"
        >
          Software
        </a>{" "}
        running on a Raspberry PI device connected to the radar device crunches
        the raw data and sends it to the cloud for further analysis.
      </p>
      <h2>How accurate is this system?</h2>
      <p>
        The device appears to report vehicle speeds accurately (within 1 mph of
        the vehicle's spedeometer) as measured by my personal vehicle's speed.
        The accuracy of vehicle counts, however, can only be measured against
        the results of other traffic data collection devices (i.e. road-tube
        systems, video or radar). Each type of device has its own limitations
        and margin of error, and no two devices will report the same results
        over the same period of time.
      </p>
      <p>
        I've noticed that the device seems to miss some cars when there are
        several following close to each other at higher speeds. I haven't
        noticed this happening at lower speeds. A device with a narrower beam
        width might be able improve the count accuracy.
      </p>
      <p>
        With that said, the device appears to be counting cars with a meaningful
        degree of accuracy. At the time of this writing, the device is reporting
        approximately 7,000 vehicles per day inbound on my street. That's
        comparable traffic data collected on my street in 2018 about 1/4 of a
        mile away with a road-tube device.
      </p>
      <h2>Limitations</h2>
      <p>The system currently has the following limitations:</p>
      <ul>
        <li>
          <strong>No vehicle classifications</strong> like professional devices,
          which are normally able to determine the type of vehicle as specified
          by the{" "}
          <a href="https://www.fhwa.dot.gov/policyinformation/tmguide/tmg_2013/vehicle-types.cfm">
            FHWA
          </a>
          .
        </li>

        <li>
          <strong>Only inbound vehicles are measured</strong>. Two-way traffic
          can be counted but it's unclear if outbound vehicles can be counted
          with any degree of accuracy.
        </li>

        <li>
          <strong>The device has a limited range</strong> which means it must be
          mounted and powered close to the road.
        </li>
      </ul>

      <h2>So what is this good for?</h2>

      <p>
        The device is unseful for identifying trends and patterns regarding
        vehicle volume and speed on local roads. That data can be used by
        community members and local officials to address traffic complaints.
      </p>

      <p>
        Since the device counts vehicles continuously, it can also be used to
        instantly report the results of any mitigation strageties on local
        roads, like increased speed enforcement or other traffic calming
        infrastructure.
      </p>
    </Inner>
  </Layout>
)

export default SecondPage
