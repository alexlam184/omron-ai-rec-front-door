'use client';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Set the initial time and start the interval after the component is mounted
    setCurrentTime(dayjs().format('HH:mm:ss'));

    const timer = setInterval(() => {
      setCurrentTime(dayjs().format('HH:mm:ss'));
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h2>🕒 Current Time</h2>
      <p>{currentTime || 'Loading...'}</p>
    </div>
  );
};

export default TimeDisplay;
