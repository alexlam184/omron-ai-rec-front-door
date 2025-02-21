'use client';
import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // Import the UTC plugin
import timezone from 'dayjs/plugin/timezone'; // Import the timezone plugin

import AnalogClock from './AnalogClock';

// Extend dayjs with the plugins
dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  style?: React.CSSProperties;
}

const TimeDisplay: React.FC<Props> = ({ style }) => {
  const [hongKongTime, setHongKongTime] = useState('00:00:00');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const updateTimes = () => {
      const now = dayjs();
      let timeString = now.tz('Asia/Hong_Kong').format('HH:mm:ss');
      setHongKongTime(timeString);
      setCurrentTime(
        now
          .hour(Number(timeString.split(':')[0]))
          .minute(Number(timeString.split(':')[1]))
          .second(Number(timeString.split(':')[2]))
          .toDate()
      );
    };

    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        ...style,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '15px 30px',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <div className="mr-16">
          <p
            style={{
              fontSize: '80px',
              fontWeight: '600',
              fontFamily: "'Inter', sans-serif",
              color: '#333',
              margin: '5px 0',
              letterSpacing: '1px',
            }}
          >
            {hongKongTime}
          </p>
        </div>

        <AnalogClock time={hongKongTime} />
        {/* <Clock
          value={currentTime}
          size={150}
          className={'shadow-blue-900 text-white'}
        /> */}
        {/* {dayjs(dayjs(currentTime).tz('Asia/Hong_Kong').toDate()).format(
          'HH:mm:ss'
        )} */}
      </div>
    </div>
  );
};

export default TimeDisplay;
