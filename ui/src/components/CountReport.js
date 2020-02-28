import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReportDateChooser from './ReportDateChooser';
import getDB from '../utils/getDB';
import moment from 'moment';
import styled from 'styled-components';

const database = getDB();

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 20px;
`

const Title = styled.div`
  margin: 0 auto;
  display: inline-flex;
  align-items: center;
`




export default ({location = null}) => {
  const [date, setDate] = useState(null);
  const [chart, setChart] = useState(null);


  useEffect(() => {
    if (!date) return;

    database.ref(`speedreports/${location}/counts/${date}`).once('value').then((snapshot) => {
      const data = snapshot.toJSON();
      const counts = Object.values(data);

      const maxSpeed = Math.max(...counts.map(c => c.correctedSpeed))

      const columns = Math.ceil(Math.ceil(maxSpeed) / 5 + 2);

      console.log(`Found ${counts.length} vehicles`);

      const chart = counts.reduce((final, current) => {
        let hour = moment.unix(current.startTime).format('H');
        let range = Math.floor(current.correctedSpeed / 5);

        if (!final[hour]) {
          final[hour] = Array(columns).fill(0);
        }

        final[hour][range] = final[hour][range] + 1;

        return final;

      }, {});

      setChart(chart);

    });
  }, [date])

  const totals = [];

  return (
    <Container>
      <Title>
        <h3>Show Hourly Reports for</h3>&nbsp;

        <ReportDateChooser
          location={location}
          handleChange={(e) => {
            setDate(e.target.value);
          }}
        />

      </Title>

      {chart && (
        <table>

          <thead>
            <tr>
              <th>Hour</th>
              {Object.values(chart)[0].map((val, i) => {
                return <th key={i}>{i * 5} - {i * 5 + 4} mph</th>
              })}
            </tr>
          </thead>

          <tbody>
            {
              Object.keys(chart).map((hour, i) => {
                return (
                  <tr key={i}>
                    <td><strong>{hour}</strong></td>
                    {
                      chart[hour].map((cars, i) => {
                        if (!totals[i]) {
                          totals[i] = 0;
                        }
                        totals[i] = totals[i] + cars;

                        return <td key={i}>{cars}</td>
                      })
                    }
                  </tr>
                )
              })
            }

            <tr>
              <td>Totals:</td>
              {
                totals.map((val, i) => <td key={i}>{val}</td>)
              }
            </tr>

          </tbody>

        </table>
      )}

    </Container>

  )
}

