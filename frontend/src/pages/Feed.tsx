import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Gig } from '../types';

interface FeedProps {
  onSelectGig: (id: string) => void;
}

const Feed: React.FC<FeedProps> = ({ onSelectGig }) => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGigs = async () => {
      try {
        const data = await api.gigs.fetchAll();
        setGigs(data);
      } catch (error) {
        console.error('Failed to load gigs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGigs();
  }, []);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {gigs.map(gig => (
        <div
          key={gig.id}
          onClick={() => onSelectGig(gig.id)}
          className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 className="text-xl font-bold">{gig.title}</h3>
          <p className="text-slate-500 mt-2 line-clamp-3">
            {gig.description}
          </p>
          <p className="mt-4 font-bold">₹ {gig.budget}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
