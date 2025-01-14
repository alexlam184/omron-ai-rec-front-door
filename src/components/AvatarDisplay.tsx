'use client';
import React from 'react';

// Accept the style prop
interface AvatarDisplayProps {
  style?: React.CSSProperties;
}

const AvatarDisplay: React.FC<AvatarDisplayProps> = ({ style }) => {
  return (
    <div style={style}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start', // Change to flex-start to reduce the gap
          padding: '20px',
          textAlign: 'center',
        }}
      >
        {/* Logo at the top */}
        <div>
          <img
            src="/image/Omron_Logo.png" // Updated logo path
            alt="Logo"
            style={{
              height: '50px',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
          />
        </div>

        {/* Large Avatar at the bottom */}
        <div>
          <img
            src="/image/Avatar.png" // Updated avatar path
            alt="Avatar"
            style={{
              width: '300px', // Increased size for the avatar
              height: '300px', // Increased size for the avatar
              objectFit: 'cover', // Ensures the image fills the circular area without distortion
              marginTop: '20px', // Optional: Add a small margin for spacing
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AvatarDisplay;
