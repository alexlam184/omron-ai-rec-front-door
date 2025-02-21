'use client';

import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Thermometer } from 'lucide-react';
import { useBodyTemperatureQuery } from '@/service/apiService';
import { useGeneralStateStore } from '@/store/GeneralStateStore';
import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc'; // Import the UTC plugin
import timezone from 'dayjs/plugin/timezone'; // Import the timezone plugin

// Extend dayjs with the plugins
dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  style?: React.CSSProperties;
}

const TemperatureChart: React.FC<Props> = ({ style }) => {
  const { data: bodyTemperatureData } = useBodyTemperatureQuery();
  const { bodyTemperatureInTimeState, appendBodyTemperatureInTimeState } =
    useGeneralStateStore();

  useEffect(() => {
    if (bodyTemperatureData) {
      // Get the current time in the 'Asia/Hong_Kong' timezone and convert it to a valid Date object
      const timeFormat = 'YYYY-MM-DD HH:mm:ss';
      const currentTime = dayjs(
        dayjs().tz('Asia/Hong_Kong').format(timeFormat),
        timeFormat
      ).toDate();

      appendBodyTemperatureInTimeState(bodyTemperatureData, currentTime);
    }
  }, [bodyTemperatureData]);

  return (
    <div
      style={{
        ...style,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%', // Fits parent height
        maxWidth: '900px',
        margin: '0 auto',
        padding: '20px',
        // backgroundColor: '#fff',
        borderRadius: '12px',
        // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      <div className="flex flex-row">
        <Thermometer />
        <h2
          style={{
            margin: 0,
            fontSize: '20px',
            color: '#333',
            fontWeight: '600',
          }}
        >
          Body Temperature
        </h2>
      </div>
      <p
        style={{
          fontSize: '40px',
          fontWeight: 'bold',
          color:
            bodyTemperatureData?.ambient && bodyTemperatureData?.ambient >= 37.5
              ? '#FF5733'
              : '#3780C6',
          margin: '10px 0 20px',
        }}
      >
        {bodyTemperatureData?.ambient ?? 'N/A '}°C
      </p>

      {/* Responsive container that dynamically adjusts height */}
      <div style={{ flexGrow: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={bodyTemperatureInTimeState}>
            <XAxis dataKey="time" tick={false} stroke="#B0BEC5" />
            <YAxis
              domain={['dataMin - 0.5', 'dataMax + 0.5']}
              tick={false}
              stroke="#B0BEC5"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '1px solid #ddd',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                padding: '8px',
              }}
              labelStyle={{ color: '#3780C6', fontWeight: 'bold' }}
              itemStyle={{ fontSize: '14px' }}
            />
            <Line
              type="monotone"
              dataKey="ambient"
              stroke="#3780C6"
              strokeWidth={3}
              dot={{ r: 0, fill: '#3780C6' }}
              activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TemperatureChart;
