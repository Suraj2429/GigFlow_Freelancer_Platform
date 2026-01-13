import React, { useState, useEffect, useCallback } from 'react';
import type { User, Notification } from './types';
import { api } from './services/api';

import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import Auth from './pages/Auth';
import PostGig from './pages/PostGig';
import GigDetails from './pages/GigDetails';
import Profile from './pages/Profile';

type Page = 'home' | 'post' | 'profile' | 'auth' | 'details';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedGigId, setSelectedGigId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = useCallback(async () => {
    try {
      const data = await api.notifications.fetch();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  }, []);

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const currentUser = await api.auth.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          fetchNotifications();
        }
      } catch (error) {
        console.error('Session restore failed:', error);
      }
    };

    restoreUser();
  }, [fetchNotifications]);

  useEffect(() => {
    if (!user) return;

    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, [user, fetchNotifications]);

  const handleLogin = (u: User) => {
    setUser(u);
    setCurrentPage('home');
  };

  const handleLogout = async () => {
    try {
      await api.auth.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      setNotifications([]);
      setCurrentPage('home');
    }
  };

  const navigateToDetails = (id: string) => {
    setSelectedGigId(id);
    setCurrentPage('details');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Feed onSelectGig={navigateToDetails} />;

      case 'auth':
        return <Auth onAuthSuccess={handleLogin} />;

      case 'post':
        return user ? (
          <PostGig onSuccess={() => setCurrentPage('home')} />
        ) : (
          <Auth onAuthSuccess={handleLogin} />
        );

      case 'details':
        return selectedGigId ? (
          <GigDetails
            gigId={selectedGigId}
            user={user}
            onBack={() => setCurrentPage('home')}
            onHired={fetchNotifications}
          />
        ) : (
          <Feed onSelectGig={navigateToDetails} />
        );

      case 'profile':
        return user ? (
          <Profile user={user} notifications={notifications} />
        ) : (
          <Auth onAuthSuccess={handleLogin} />
        );

      default:
        return <Feed onSelectGig={navigateToDetails} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
    
      <Navbar
        user={user}
        onLogout={handleLogout}
        onNavigate={setCurrentPage}
        notificationCount={notifications.filter(n => !n.read).length}
      />

      <main className="flex-grow">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
