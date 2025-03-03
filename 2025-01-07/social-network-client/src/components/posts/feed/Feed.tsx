// Feed.tsx
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import PostModel from '../../../models/posts/Post';
import feed from '../../../services/Feed';
import profileService from '../../../services/Profile';
import Loading from '../../common/Loading';
import { handleError } from '../../utils/errors';
import FeedPost from './FeedPost';

export default function Feed() {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get the following list from Redux store
  const following = useAppSelector((state) => state.following.following);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await feed.getFeed();
      // Filter posts to only show those from users we're following
      const filteredPosts = data.filter(post => 
        following.some(user => user.id === post.userId)
      );
      // Sort filtered posts by date (newest first)
      const sortedPosts = filteredPosts.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setPosts(sortedPosts);
    } catch (error) {
      console.error('Error fetching posts:', handleError(error));
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts whenever the following list changes
  useEffect(() => {
    fetchData();
  }, [following]); // Add following as a dependency

  const handleAddComment = async (postId: string, comment: string) => {
    try {
      const newComment = await profileService.addComment(postId, comment);
      setPosts(currentPosts => 
        currentPosts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [...(post.comments || []), newComment].sort(
                (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
              )
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error('Failed to add comment:', error);
      throw error;
    }
  };

  if (loading) {
    return <Loading isLoading={true} />;
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Your Feed</h1>
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map(post => (
            <FeedPost
              key={post.id}
              post={post}
              onAddComment={handleAddComment}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            No posts to show. Follow some users to see their posts here!
          </div>
        )}
      </div>
    </div>
  );
}