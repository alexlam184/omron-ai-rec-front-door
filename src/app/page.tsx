'use client';

import React, { useEffect, useState } from 'react';
import CameraFeed from '@/components/CameraFeed';
import Weather from '@/components/Weather';
import TimeDisplay from '@/components/Time/TimeDisplay';
import LanguageToggle from '@/components/LanguageToggle';
import AvatarDisplay from '@/components/AvatarDisplay';
import ActionButtonGroup from '@/components/ActionButtonGroup';
import Modal from '@/components/Modal';
import TemperatureChart from '@/components/TemperatureChart';
import { useGeneralStateStore } from '@/store/GeneralStateStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function Dashboard() {
  const [queryClient] = useState(() => new QueryClient());
  const { setGeneral_ModalIsOpenedState, setGeneral_ModalContentState } =
    useGeneralStateStore();

  // useEffect(() => {
  //   setGeneral_ModalIsOpenedState(true); //TODO:  for testing modal
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <main
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr', // Two equal halves
          gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr', // Three equal rows
          gridTemplateAreas: `
          "avatar camera"
          "avatar camera"
          "avatar camera"
          "time camera"
          "weather camera"
          "weather camera"
          "weather actions"
          "weather actions"
          "weather actions"
          "weather actions"
        `,
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          fontFamily: 'Arial, sans-serif',
          backgroundImage: 'url("/image/white-tech-bg.jpg")', // Set JPG as background
          backgroundSize: 'cover', // Cover the entire area
          backgroundPosition: 'center', // Center the background image
          backgroundRepeat: 'no-repeat', // Prevent repeating
        }}
      >
        {/* Avatar Display (top-left) */}
        <AvatarDisplay
          style={{ gridArea: 'avatar', width: '100%', height: '100%' }}
        />
        <TimeDisplay style={{ gridArea: 'time' }} />
        {/* <OpenWeather
        style={{ gridArea: 'weather', width: '100%', height: '100%' }}
      /> */}
        <div
          style={{ gridArea: 'weather', width: '100%', height: '100%' }}
          className="grid grid-cols-3 grid-rows-1 gap-2"
        >
          <Weather />
          <div className="col-span-2">
            <TemperatureChart />
          </div>
        </div>
        <div
          style={{
            gridArea: 'camera',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CameraFeed
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '10px',
              objectFit: 'cover',
            }}
          />
        </div>

        <div style={{ gridArea: 'actions' }}>
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActionButtonGroup />

            <LanguageToggle />
          </div>
        </div>

        <Modal />
      </main>
    </QueryClientProvider>
  );
}
