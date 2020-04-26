import React from "react"
import PropTypes from 'prop-types';
import getDB from '../utils/getDB';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  margin-right: 5px;
  display: inline-block;
`

const Select = styled.select`


`



const database = getDB();


export default class LocationChooser extends React.Component {

  static defaultProps = {
    onChange: PropTypes.func,
  }

  state = {
    reports: [],
  }

  componentDidMount = () => {

    const locations = window.localStorage.getItem('LOCATIONS');

    if (locations) {
      this.setState({
        reports: JSON.parse(locations),
      });
    }

    database.ref('speedreports').orderByKey().once('value').then((snapshot) => {

      const reports = Object.keys(snapshot.toJSON()).reverse();

      window.localStorage.setItem('LOCATIONS', JSON.stringify(reports));

      this.setState({
        reports,
      })
    });
  }

  handleOnChange = (e) => {
    this.props.onChange && this.props.onChange(e.currentTarget.value);
  }

  render() {

    return (
      <Form>
        <Label>Select a count location:</Label>
        <Select onChange={this.handleOnChange}>
          <option value="">Please Select</option>
          {this.state.reports.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </Select>
      </Form>
    );
  }
}