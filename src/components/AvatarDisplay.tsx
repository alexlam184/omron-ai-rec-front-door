'use client';
import React from 'react';

// Accept the style prop
interface AvatarDisplayProps {
  style?: React.CSSProperties;
}

const AvatarDisplay: React.FC<AvatarDisplayProps> = ({ style }) => {
  return (
    <div
      style={{
        ...style,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Large Avatar at the bottom */}
      <div
        style={{
          flex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src="/image/Omron_Logo.png" // Updated avatar path
          alt="Avatar"
          style={{
            width: '100%', // Make it take almost full width of the parent
            height: '100%', // Adjust height to fill parent
            maxWidth: '400px', // Limit max size
            maxHeight: '400px', // Limit max size
            objectFit: 'contain', // Ensures it fits properly
          }}
        />
      </div>
    </div>
  );
};

export default AvatarDisplay;
