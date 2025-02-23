// # components/layout/folowers/FolowersUi.tsx
interface FollowersProps {
  followers: { id: string; name: string; isFollowing: boolean }[];
  onFollowUnfollow: (userId: string, isFollowing: boolean) => Promise<void>;
}

const FollowersUi: React.FC<FollowersProps> = ({ followers, onFollowUnfollow }) => {
  return (
    <div className="flex flex-col p-4 bg-gray-50 rounded-md shadow-md max-h-80 overflow-y-auto">
      {followers.map(({ id, name, isFollowing }) => (
        <div
          key={id}
          className="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-lg shadow-sm mb-2"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-semibold shadow-lg">
              {name ? name[0].toUpperCase() : "?"}
            </div>
            <span className="text-gray-800 font-medium text-sm">{name || "Unknown"}</span>
          </div>
          <button
            onClick={async () => {
              try {
                await onFollowUnfollow(id, isFollowing);
              } catch (error) {
                console.error("Error following/unfollowing user:", error);
              }
            }}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 focus:outline-none shadow-md ${
              isFollowing
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
      ))}
      {followers.length === 0 && (
        <p className="text-gray-500 text-center">No followers yet.</p>
      )}
    </div>
  );
};

export default FollowersUi;