import React from 'react';
import type { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: 'home' | 'post' | 'profile' | 'auth') => void;
  notificationCount: number;
}

const Navbar: React.FC<NavbarProps> = ({
  user,
  onLogout,
  onNavigate,
  notificationCount
}) => {
  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
        <div className="w-9 h-9 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-black">
          G
        </div>
        <span className="text-xl font-black text-indigo-600">GigFlow</span>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <button onClick={() => onNavigate('post')} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold">
              Post a Gig
            </button>

            <button onClick={() => onNavigate('profile')} className="relative w-9 h-9 rounded-full bg-slate-200 font-bold">
              {user.name[0].toUpperCase()}
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                  {notificationCount}
                </span>
              )}
            </button>

            <button onClick={onLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold">
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => onNavigate('auth')} className="px-4 py-2 border rounded-lg font-bold">
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
