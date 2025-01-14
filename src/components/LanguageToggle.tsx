'use client';
import React, { useState } from 'react';

const LanguageToggle = () => {
  const [language, setLanguage] = useState<'en' | 'zh'>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'zh' : 'en'));
  };

  return (
    <div>
      <h2>🌐 Language</h2>
      <button onClick={toggleLanguage}>
        {language === 'en' ? 'Switch to Traditional Chinese' : '切換到英文'}
      </button>
      <p>Current Language: {language === 'en' ? 'English' : '繁體中文'}</p>
    </div>
  );
};

export default LanguageToggle;
