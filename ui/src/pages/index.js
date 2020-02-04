import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import LiveSpeedDialog from '../components/LiveSpeedDialog';

import firebase from 'firebase';


const database = firebase.database();



class ReportList extends React.Component {

  state = {
    reports: [],
  }

  componentDidMount = () => {
    database.ref('speedreports').orderByKey().once('value').then((snapshot) => {
      this.setState({
        reports: Object.keys(snapshot.toJSON()).reverse(),
      })
    });
  }

  handleOnChange = (e) => {
    this.props.onChange && this.props.onChange(e.currentTarget.value);
  }

  render() {

    return (
      <form>
        <label>Select a count location:</label>
        <select onChange={this.handleOnChange}>
          <option value="">Please Select</option>
          {this.state.reports.map(name => (
            <option value={name}>{name}</option>
          ))}
        </select>
      </form>
    );
  }
}







export default class IndexPage extends React.Component {

  state = {
    location: null,
    liveSpeed: null,
  }

  database = database.ref('speedreports');

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.location !== prevState.location) {
      this.removeLiveListener(prevState.location);
      this.setLiveListener(this.state.location);
    }
  }

  handleLiveValueChange = (snapshot) => {
    this.setState({
      liveSpeed: snapshot.toJSON(),
    })
  }

  setLiveListener = (location) => {
    this.database.child(`${location}/live`).on('value', this.handleLiveValueChange);
  }

  removeLiveListener = (location) => {
    location && this.database.child(`${location}/live`).off('value', this.handleLiveValueChange);
  }


  updateLocation = (location) => {
    this.setState({
      location,
    });
  }

  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <div>
          <ReportList onChange={this.updateLocation} />
          {this.state.liveSpeed && <LiveSpeedDialog {...this.state.liveSpeed} /> }
        </div>
      </Layout>
    )
  }

}
