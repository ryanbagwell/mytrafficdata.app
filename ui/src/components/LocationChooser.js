import React from "react"
import PropTypes from 'prop-types';
import getDB from '../utils/getDB';

const database = getDB();


export default class LocationChooser extends React.Component {

  defaultProps = {
    onChange: PropTypes.func,
  }

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