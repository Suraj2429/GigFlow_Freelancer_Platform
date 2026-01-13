import React, { useState } from 'react';
import { api } from '../services/api';


interface PostGigProps {
  onSuccess: () => void;
}

const PostGig: React.FC<PostGigProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: 0
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.gigs.create(
        formData.title,
        formData.description,
        formData.budget
      );
      onSuccess();
    } catch {
      alert('Failed to post gig');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-8 border shadow-sm">
        <h1 className="text-3xl font-black mb-6">Post a New Gig</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            placeholder="Title"
            className="w-full p-3 border rounded"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />

          <textarea
            required
            placeholder="Description"
            className="w-full p-3 border rounded"
            value={formData.description}
            onChange={e =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <input
            required
            type="number"
            placeholder="Budget"
            className="w-full p-3 border rounded"
            value={formData.budget}
            onChange={e =>
              setFormData({ ...formData, budget: Number(e.target.value) })
            }
          />

          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded"
          >
            {loading ? 'Posting...' : 'Post Gig'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostGig;
