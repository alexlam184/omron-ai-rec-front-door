'use client';
import React, { useState } from 'react';
import { Globe } from 'lucide-react';

const LanguageToggle = () => {
  const [language, setLanguage] = useState<'en' | 'zh'>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'zh' : 'en'));
  };

  return (
    <div>
      {/* <h2>🌐 Language</h2> */}
      <button
        onClick={toggleLanguage}
        className="min-w-96 min-h-16 flex justify-center items-center bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full"
      >
        <Globe className="mr-4" />
        <p>
          {language === 'en'
            ? 'Switch to Traditional Chinese中文'
            : '切換到English英文'}{' '}
        </p>
      </button>

      <p className="text-2xl flex justify-center items-center my-4">
        <p> Language 語言:</p>
        <p>{language === 'en' ? 'English' : '繁體中文'}</p>
      </p>
    </div>
  );
};

export default LanguageToggle;
