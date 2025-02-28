import React from 'react';
import { Target } from '../../../backend/models/Target';

interface GiftFilterProps {
  targets: Target[];
  selectedTarget: number;
  onChange: (targetId: number) => void;
}

const GiftFilter: React.FC<GiftFilterProps> = ({ targets, selectedTarget, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <label className="text-gray-700 font-medium mb-2 sm:mb-0 sm:mr-4">Choose Target Audience: </label>
        <select
          value={selectedTarget}
          onChange={(e) => onChange(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value={0}>All Targets</option>
          {targets.map((target) => (
            <option key={target.id} value={target.id}>{target.type}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GiftFilter;
