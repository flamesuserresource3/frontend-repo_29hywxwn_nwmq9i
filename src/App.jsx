import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';

export default function App() {
  const [route, setRoute] = useState('landing');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cached = localStorage.getItem('tf_user');
    if (cached) {
      setUser(JSON.parse(cached));
      setRoute('dashboard');
    }
  }, []);

  const handleAuthSuccess = (u) => {
    setUser(u);
    localStorage.setItem('tf_user', JSON.stringify(u));
    setRoute('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('tf_user');
    setRoute('landing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <Navbar isAuthed={!!user} onNavigate={setRoute} onLogout={handleLogout} />

      {(!user && route === 'landing') && (
        <main className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Trade smarter with a clean, powerful dashboard</h1>
              <p className="mt-4 text-gray-600">Sign in to track month-wise profits and losses across the financial year, analyze performance, and manage your profile.</p>
              <div className="mt-6">
                <Auth onAuthSuccess={handleAuthSuccess} />
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold mb-3">What you get</h3>
              <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                <li>Month-wise P&L breakdown aligned to the financial year</li>
                <li>Intuitive dashboard for recent trades and summaries</li>
                <li>Simple profile management</li>
                <li>Secure, modern UI</li>
              </ul>
            </div>
          </div>
        </main>
      )}

      {(user && route === 'dashboard') && (
        <Dashboard />
      )}

      {(user && route === 'profile') && (
        <Profile user={user} />
      )}

      <footer className="mt-16 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TradeFlow. All rights reserved.
      </footer>
    </div>
  );
}
