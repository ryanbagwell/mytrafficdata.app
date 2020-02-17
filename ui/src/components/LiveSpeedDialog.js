import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';


const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const H1 = styled.h1`
  text-align: center;
  font-size: 25px;

`

const Speed = styled.h2`
  text-align: center;
  font-size: 50px;
`


const Unit = styled.span`
  text-align: center;
  display: block;
  font-size: 20px;

`

const Data = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  font-size: 18px;
`

const DataPoint = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`

const Label = styled.span`
  display: block;
  text-align: center;
`

const Value = styled.span`
  display: block;
  text-align: center;
`




export default ({correctedSpeed, magnitude, measuredSpeed, time}) => (
  <Container>
    <H1>Live Speed</H1>

    <Speed>
      {Math.round(correctedSpeed)}
      <Unit>M.P.H.</Unit>
    </Speed>

    <Data>
      <DataPoint>
        <Label>Last Updated</Label>
        <Value>{moment.unix(Math.round(time)).format('LTS')}</Value>
      </DataPoint>

      <DataPoint>
        <Label>Magnitude</Label>
        <Value>{magnitude}</Value>
      </DataPoint>

      <DataPoint>
        <Label>Measured Speed</Label>
        <Value>{measuredSpeed}</Value>
      </DataPoint>

    </Data>

  </Container>
)