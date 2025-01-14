'use client';

import React from 'react';
import CameraFeed from '@/components/CameraFeed';
import Weather from '@/components/Weather';
import TimeDisplay from '@/components/TimeDisplay';
import LanguageToggle from '@/components/LanguageToggle';
import AvatarDisplay from '@/components/AvatarDisplay';
import ActionButtonGroup from '@/components/ActionButtonGroup';
import Modal from '@/components/Modal';

export default function Dashboard() {
  return (
    <main style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div
        style={{
          display: 'grid',
          gap: '20px',
          gridTemplateColumns: '1fr 1fr', // Two columns
          gridTemplateRows: '1fr 1fr', // Two rows
          gridTemplateAreas: `
            "avatar camera"
            "weather actions"
          `,
        }}
      >
        {/* Avatar Display (top-left) */}
        <AvatarDisplay style={{ gridArea: 'avatar' }} />

        {/* Camera Feed (top-right) */}
        <CameraFeed style={{ gridArea: 'camera' }} />

        {/* Weather (bottom-left) */}
        <Weather style={{ gridArea: 'weather' }} />

        {/* Actions, Time Display, and Language Toggle (bottom-right) */}
        <div style={{ gridArea: 'actions' }}>
          <div style={{ marginBottom: '20px' }}>
            <TimeDisplay />
            <ActionButtonGroup />
            <LanguageToggle />
          </div>
        </div>
      </div>
      <Modal />
    </main>
  );
}
