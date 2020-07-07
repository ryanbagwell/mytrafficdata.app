import React from "react"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import LiveSpeedDialog from "../components/LiveSpeedDialog"
import getDB from "../utils/getDB"
import LocationChooser from "../components/LocationChooser"
import CountReport from "../components/CountReport"

const database = getDB()

export default class IndexPage extends React.Component {
  state = {
    location: null,
    liveSpeed: null,
  }

  database = database.ref("speedreports")

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.location !== prevState.location) {
      this.removeLiveListener(prevState.location)
      this.setLiveListener(this.state.location)
    }
  }

  handleLiveValueChange = snapshot => {
    this.setState({
      liveSpeed: snapshot.toJSON(),
    })
  }

  setLiveListener = location => {
    this.database
      .child(`${location}/live`)
      .on("value", this.handleLiveValueChange)
  }

  removeLiveListener = location => {
    location &&
      this.database
        .child(`${location}/live`)
        .off("value", this.handleLiveValueChange)
  }

  updateLocation = location => {
    this.setState({
      location,
    })
  }

  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <div>
          <LocationChooser onChange={this.updateLocation} />
          {this.state.liveSpeed && (
            <LiveSpeedDialog {...this.state.liveSpeed} />
          )}
        </div>

        {this.state.location && <CountReport location={this.state.location} />}
      </Layout>
    )
  }
}
