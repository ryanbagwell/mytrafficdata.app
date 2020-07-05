import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import shallowQuery from "../utils/shallowQuery"

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Label = styled.label`
  margin-right: 5px;
  display: inline-block;
`

const Select = styled.select``

export default class LocationChooser extends React.Component {
  static defaultProps = {
    onChange: PropTypes.func,
  }

  state = {
    locations: [],
  }

  componentDidMount = () => {
    const locations = window.localStorage.getItem("LOCATIONS")

    if (locations) {
      this.setState({
        locations: JSON.parse(locations),
      })
    }

    shallowQuery(`speedreports`).then(data => {
      const locations = Object.keys(data)
      window.localStorage.setItem("LOCATIONS", JSON.stringify(locations))

      this.setState({
        locations,
      })
    })
  }

  handleOnChange = e => {
    this.props.onChange && this.props.onChange(e.currentTarget.value)
  }

  render() {
    return (
      <Form>
        <Label>Select a count location:</Label>
        <Select onChange={this.handleOnChange}>
          <option value="">Please Select</option>
          {this.state.locations.map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Select>
      </Form>
    )
  }
}
