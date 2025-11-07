import React, { useState } from 'react';

export default function Auth({ onAuthSuccess }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const switchMode = () => setMode(mode === 'login' ? 'register' : 'login');

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mock auth for this sandbox; replace with real API calls later
      await new Promise((res) => setTimeout(res, 800));
      const user = {
        name: form.name || 'Trader',
        email: form.email,
      };
      onAuthSuccess(user);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white/80 backdrop-blur rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-2xl font-semibold text-gray-900">
        {mode === 'login' ? 'Welcome back' : 'Create your account'}
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        {mode === 'login' ? 'Enter your credentials to access your dashboard.' : 'Join and start tracking your P&L effortlessly.'}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {mode === 'register' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Full name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              placeholder="Jane Trader"
              required
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex justify-center rounded-md bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-black disabled:opacity-60"
        >
          {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-4 text-center">
        {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button onClick={switchMode} className="font-semibold text-gray-900 hover:underline">
          {mode === 'login' ? 'Sign up' : 'Sign in'}
        </button>
      </p>
    </div>
  );
}
