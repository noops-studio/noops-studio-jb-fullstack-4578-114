// FollowersUi.tsx
import React from "react";
import followerService from "../../../services/FollowersService";

interface FollowersProps {
  followers: { id: string; name: string; isFollowing: boolean }[];
  onUpdate: () => void; // Callback to refresh the list
}

const Followers: React.FC<FollowersProps> = ({ followers, onUpdate }) => {
  return (
    <div className="flex flex-col p-4 bg-gray-50 rounded-md shadow-md max-h-80 overflow-y-auto">
      {followers.map(({ id, name, isFollowing }) => (
        <div
          key={id}
          className="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-lg shadow-sm mb-2"
        >
          {/* Avatar */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-purple-500 text-white flex items-center justify-center rounded-full text-lg font-semibold">
              {name[0].toUpperCase()}
            </div>
            <span className="text-gray-800 font-medium text-sm">{name}</span>
          </div>

          {/* Follow/Unfollow Button */}
          <button
            onClick={async () => {
              if (isFollowing) {
                await followerService.unfollowUser(id);
              } else {
                await followerService.followUser(id);
              }
              onUpdate();
            }}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 focus:outline-none shadow-md
              ${isFollowing ? "bg-red-500 text-white hover:bg-red-600" : "bg-blue-500 text-white hover:bg-blue-600"}`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
      ))}

      {followers.length === 0 && (
        <p className="text-gray-500 text-center">No followers to display.</p>
      )}
    </div>
  );
};

export default Followers;
