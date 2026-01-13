import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import type { Gig, User, Bid } from '../types';
import { GigStatus} from '../types';

interface GigDetailsProps {
  gigId: string;
  user: User | null;
  onBack: () => void;
  onHired: () => void;
}

const GigDetails: React.FC<GigDetailsProps> = ({ gigId, user, onBack, onHired }) => {
  const [gig, setGig] = useState<Gig | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [submittingBid, setSubmittingBid] = useState(false);
  const [bidForm, setBidForm] = useState({ message: '', price: 0 });
  const [hiringId, setHiringId] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);

    const g = await api.gigs.fetchById(gigId);
    setGig(g);

    if (g && user && g.ownerId === user.id) {
      const b = await api.bids.fetchByGig(gigId);
      setBids(b);
    }

    setLoading(false);
  }, [gigId, user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !gig) return;

    setSubmittingBid(true);
    try {
      await api.bids.submit(gigId, bidForm.message, bidForm.price);
      alert('Bid submitted successfully!');
      setBidForm({ message: '', price: 0 });
    } catch {
      alert('Error submitting bid');
    } finally {
      setSubmittingBid(false);
    }
  };

  const handleHire = async (bidId: string) => {
    if (!user) return;
    if (!window.confirm('Are you sure you want to hire this freelancer?')) return;

    setHiringId(bidId);
    try {
      await api.hiring.hire(bidId);
      onHired();
      await loadData();
    } catch {
      alert('Critical error during hiring process');
    } finally {
      setHiringId(null);
    }
  };

  if (loading) return <div className="max-w-4xl mx-auto p-12">Loading details...</div>;
  if (!gig) return <div className="max-w-4xl mx-auto p-12">Gig not found.</div>;

  const isOwner = user?.id === gig.ownerId;
  const isAssigned = gig.status === GigStatus.ASSIGNED;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button onClick={onBack} className="mb-6 text-indigo-600 font-medium">
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-4">{gig.title}</h1>
      <p className="mb-2 text-slate-600">{gig.description}</p>
      <p className="mb-6 font-semibold">Budget: ₹{gig.budget}</p>

      {isOwner && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Bids</h2>
          {bids.map(bid => (
            <div key={bid.id} className="border p-4 rounded">
              <p className="font-bold">{bid.freelancerName}</p>
              <p>{bid.message}</p>
              <p className="font-semibold">₹{bid.price}</p>

              {isAssigned ? (
                <span className="text-sm text-green-600">{bid.status}</span>
              ) : (
                <button
                  onClick={() => handleHire(bid.id)}
                  disabled={!!hiringId}
                  className="mt-2 px-4 py-1 bg-indigo-600 text-white rounded"
                >
                  {hiringId === bid.id ? 'Hiring...' : 'Hire'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {!isOwner && !isAssigned && user && (
        <form onSubmit={handleBidSubmit} className="mt-8 space-y-4">
          <textarea
            required
            value={bidForm.message}
            onChange={e => setBidForm({ ...bidForm, message: e.target.value })}
            placeholder="Your proposal"
            className="w-full border p-2 rounded"
          />
          <input
            required
            type="number"
            value={bidForm.price}
            onChange={e => setBidForm({ ...bidForm, price: Number(e.target.value) })}
            className="w-full border p-2 rounded"
            placeholder="Your price"
          />
          <button
            type="submit"
            disabled={submittingBid}
            className="px-6 py-2 bg-indigo-600 text-white rounded"
          >
            {submittingBid ? 'Submitting...' : 'Submit Bid'}
          </button>
        </form>
      )}
    </div>
  );
};

export default GigDetails;
