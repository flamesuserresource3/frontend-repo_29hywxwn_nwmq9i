import React from 'react';
import { Home, LayoutDashboard, User } from 'lucide-react';

export default function Navbar({ isAuthed, onNavigate, onLogout }) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          className="flex items-center gap-2 text-gray-900 font-semibold"
          onClick={() => onNavigate(isAuthed ? 'dashboard' : 'landing')}
        >
          <Home size={20} />
          TradeFlow
        </button>

        {isAuthed ? (
          <nav className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              <LayoutDashboard size={18} /> Dashboard
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              <User size={18} /> Profile
            </button>
            <button
              onClick={onLogout}
              className="ml-2 inline-flex items-center px-3 py-2 rounded-md text-sm font-semibold text-white bg-gray-900 hover:bg-black"
            >
              Logout
            </button>
          </nav>
        ) : (
          <div className="text-sm text-gray-500">Secure Trading Platform</div>
        )}
      </div>
    </header>
  );
}
