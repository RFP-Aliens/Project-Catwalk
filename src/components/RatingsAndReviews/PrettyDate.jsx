/* eslint-disable react/prop-types */
import React from 'react';

export const PrettyDate = (props) => {
  const date = props.date ? new Date(props.date) : null;
  const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  }

  return (
    <span>{months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</span>
  );
}

