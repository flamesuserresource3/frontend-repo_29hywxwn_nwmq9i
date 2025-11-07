import React from 'react';

export default function Profile({ user }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
        <p className="text-sm text-gray-500">Manage your account information</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600">Full name</label>
            <input
              className="mt-1 w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              defaultValue={user?.name || ''}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input
              className="mt-1 w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              defaultValue={user?.email || ''}
              readOnly
            />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button className="inline-flex items-center px-4 py-2 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-black">Save changes</button>
          <button className="inline-flex items-center px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">Reset</button>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-medium text-gray-900 mb-2">Security</h3>
        <p className="text-sm text-gray-600">Change your password and manage active sessions.</p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <input type="password" placeholder="New password" className="w-full sm:w-64 rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900" />
          <button className="inline-flex items-center px-4 py-2 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-black">Update password</button>
        </div>
      </div>
    </div>
  );
}
