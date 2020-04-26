import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getDB from '../utils/getDB';

const database = getDB();


export default ({location = null, handleChange = () => {}}) => {

  const cachedDates = window.localStorage.getItem('CACHED_DATES') || '[]';

  const [dates, setDates] = useState(JSON.parse(cachedDates));

  useEffect(() => {
    if (!location) return;

    database.ref(`speedreports/${location}/counts`).orderByKey().once('value').then((snapshot) => {
      const dates = Object.keys(snapshot.toJSON()).reverse();
      window.localStorage.setItem('CACHED_DATES', JSON.stringify(dates));
      setDates(dates)
    });

  }, [location]);

  return (
    <form>
      <select onChange={handleChange}>
        <option value="">Select a date</option>
        {dates.map((name, i) => (
          <option value={name} key={i}>{name}</option>
        ))}
      </select>
    </form>
  );

}