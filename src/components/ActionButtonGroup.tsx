'use client';
import React from 'react';
import { User, Paintbrush, Package } from 'lucide-react'; // Import icons

const ButtonStyles: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px', // Space between icon and text
  padding: '16px',
  fontSize: '16px',
  fontWeight: 'bold',
  borderRadius: '12px',
  border: '1px solid rgba(200, 200, 200, 0.5)',
  cursor: 'pointer',
  background: 'rgba(255, 255, 255, 0.9)',
  color: '#333',
  margin: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease-in-out',
  backdropFilter: 'blur(10px)', // Glass effect
};

// Hover effect
const ButtonHoverStyles: React.CSSProperties = {
  background: 'rgba(240, 240, 240, 1)',
  transform: 'scale(1.05)',
};

const ActionButtonGroup: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        background: 'transparent',
        padding: '10px',
      }}
    >
      <button
        style={{ ...ButtonStyles }}
        onMouseEnter={(e) =>
          Object.assign(e.currentTarget.style, ButtonHoverStyles)
        }
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, ButtonStyles)}
      >
        <User size={20} /> Visitor 訪客
      </button>
      <button
        style={{ ...ButtonStyles }}
        onMouseEnter={(e) =>
          Object.assign(e.currentTarget.style, ButtonHoverStyles)
        }
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, ButtonStyles)}
      >
        <Paintbrush size={20} />
        Cleaner 清潔
      </button>
      <button
        style={{ ...ButtonStyles }}
        onMouseEnter={(e) =>
          Object.assign(e.currentTarget.style, ButtonHoverStyles)
        }
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, ButtonStyles)}
      >
        <Package size={20} /> Delivery 送貨
      </button>
    </div>
  );
};

export default ActionButtonGroup;
