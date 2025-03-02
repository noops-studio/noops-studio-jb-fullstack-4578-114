import React from "react";
import GiftCard from "./GiftCard";
import { Gift } from "../../../backend/models/Gift";

interface GiftListProps {
  gifts: Gift[];
  refreshGifts: () => void;
}

const GiftList: React.FC<GiftListProps> = ({ gifts, refreshGifts }) => {
  const handleDelete = (_: number) => {
    refreshGifts();
  };

  if (gifts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow text-center">
        <svg
          className="w-16 h-16 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          ></path>
        </svg>
        <h3 className="text-xl font-medium text-gray-700 mb-2">
          No gifts found
        </h3>
        <p className="text-gray-500">
          Select a different target or add some gifts to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {gifts.map((gift) => (
        <GiftCard key={gift.id} gift={gift} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default GiftList;

