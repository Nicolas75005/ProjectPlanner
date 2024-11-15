import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe2, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm fixed w-full z-50 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Globe2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="font-bold text-xl text-slate-900 dark:text-white">IntegrationPro</span>
            </Link>
          </div>

          <div>
            <button
              onClick={toggleTheme}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white p-2 rounded-md"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}