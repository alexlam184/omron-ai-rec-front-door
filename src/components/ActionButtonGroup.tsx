// src/components/ActionButtonGroup.tsx
'use client';
import React from 'react';

const ActionButtonGroup: React.FC = () => {
  return (
    <div>
      <h2>🔘 Actions</h2>
      <button style={{ marginRight: '10px' }}>🚶 Visitor</button>
      <button style={{ marginRight: '10px' }}>🧹 Cleaner Arrive</button>
      <button>📦 Delivery Arrive</button>
    </div>
  );
};

export default ActionButtonGroup;
