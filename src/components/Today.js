import React, { useEffect, useState } from 'react';
import { Header2 } from '../styles/Headers';

function Today() {
  const [today, setToday] = useState('');

  function getMonth(index) {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    for (let i = 0; i < months.length; i++) {
      if (i === index) {
        return months[i];
      }
    }
    console.error('THAT MONTH DOES NOT EXIST!');
    return;
  }

  useEffect(() => {
    let d = new Date();
    let monthNumber = d.getMonth();
    let day = d.getDate();
    let year = d.getFullYear();
    setToday(getMonth(monthNumber) + ' ' + day + ' ' + year);

    const interval = setInterval(() => {
      d = new Date();
      monthNumber = d.getMonth();
      day = d.getDate();
      year = d.getFullYear();
      setToday(getMonth(monthNumber) + ' ' + day + ' ' + year);
    }, 30000); // Done every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return <Header2>{today}</Header2>;
}

export default Today;
