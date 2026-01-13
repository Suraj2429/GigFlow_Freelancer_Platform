import React from 'react';
import type { User, Notification } from '../types';

interface ProfileProps {
  user: User;
  notifications: Notification[];
}

const Profile: React.FC<ProfileProps> = ({ user, notifications }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-8 flex items-center gap-6">
        <div className="w-24 h-24 bg-indigo-100 text-indigo-600 text-4xl font-black rounded-full flex items-center justify-center">
          {user.name[0].toUpperCase()}
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900">{user.name}</h1>
          <p className="text-slate-500">{user.email}</p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Notifications</h2>
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map(n => (
              <div
                key={n.id}
                className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-start gap-4"
              >
                <div className="mt-1 p-2 rounded-lg bg-indigo-100 text-indigo-600">
                  📩
                </div>
                <div className="flex-grow">
                  <p className="text-slate-800 font-medium">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400">
            No notifications yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
