import React from "react";

interface FollowingProps {
  following: { id: string; name: string; isFollowing: boolean }[];
  onUnfollow: (userId: string) => void; // Callback to handle unfollow
}

const FollowingUi: React.FC<FollowingProps> = ({ following, onUnfollow }) => {
  return (
    <div className="flex flex-col p-4 bg-gray-50 rounded-md shadow-md max-h-80 overflow-y-auto">
      {following.map(({ id, name }) => (
        <div
          key={id}
          className="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-lg shadow-sm mb-2"
        >
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-semibold">
              {name[0].toUpperCase()}
            </div>
            <span className="text-gray-800 font-medium text-sm">{name}</span>
          </div>
          <button
            onClick={() => onUnfollow(id)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Unfollow
          </button>
        </div>
      ))}
      {following.length === 0 && (
        <p className="text-gray-500 text-center">No users being followed.</p>
      )}
    </div>
  );
};

export default FollowingUi;
