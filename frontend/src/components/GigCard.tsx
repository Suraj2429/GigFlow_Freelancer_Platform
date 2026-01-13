
import React from 'react';
import type { Gig } from '../types';
import { GigStatus } from '../types';


interface GigCardProps {
  gig: Gig;
  onClick: (id: string) => void;
}

const GigCard: React.FC<GigCardProps> = ({ gig, onClick }) => {
  const isAssigned = gig.status === GigStatus.ASSIGNED;

  return (
    <div 
      onClick={() => onClick(gig.id)}
      className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-indigo-200 transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition">
            {gig.title}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Posted by <span className="font-medium text-slate-700">{gig.ownerName}</span>
          </p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-slate-900">${gig.budget}</span>
          <p className="text-xs text-slate-400">Fixed Price</p>
        </div>
      </div>
      
      <p className="text-slate-600 line-clamp-3 mb-4 leading-relaxed">
        {gig.description}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
          isAssigned ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
        }`}>
          {gig.status}
        </span>
        <span className="text-xs text-slate-400">
          {new Date(gig.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default GigCard;
