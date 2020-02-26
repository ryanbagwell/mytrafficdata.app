import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getDB from '../utils/getDB';

const database = getDB();


export default ({location = null, handleChange = () => {}}) => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    if (!location) return;

    database.ref(`speedreports/${location}/counts`).orderByKey().once('value').then((snapshot) => {
      setDates(Object.keys(snapshot.toJSON()).reverse())
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