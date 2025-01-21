import React, { useState } from 'react';

interface FeedPostProps {
  post: {
    id: string;
    title: string;
    body: string;
    createdAt: string;
    user: {
      id: string;
      name: string;
    };
    comments: Array<{
      id: string;
      body: string;
      createdAt: string;
      user: {
        id: string;
        name: string;
      };
    }>;
  };
  onAddComment: (postId: string, comment: string) => Promise<void>;
}

const FeedPost: React.FC<FeedPostProps> = ({ post, onAddComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 7) {
      return date.toLocaleDateString();
    } else if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    setIsAddingComment(true);
    setError(null);
    try {
      await onAddComment(post.id, newComment);
      setNewComment('');
    } catch (err) {
      setError('Failed to add comment. Please try again.');
    } finally {
      setIsAddingComment(false);
    }
  };

  // Sort comments by date (oldest first)
  const sortedComments = [...(post.comments || [])].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="mb-6 overflow-hidden bg-white rounded-lg shadow-lg">
      {/* Post Header */}
      <div className="flex items-start space-x-4 p-4 border-b border-gray-100">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-semibold shadow-lg">
            {post.user?.name?.[0]?.toUpperCase() || '?'}
          </div>
        </div>
        
        <div className="flex-grow">
          <div className="flex items-baseline justify-between">
            <h3 className="font-semibold text-gray-900">
              {post.user?.name || 'Anonymous'}
            </h3>
            <span className="text-sm text-gray-500">
              {formatDate(post.createdAt)}
            </span>
          </div>
          
          <h4 className="text-lg font-medium text-gray-900 mt-2">
            {post.title}
          </h4>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </div>

      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
        <button
          onClick={() => setShowComments(!showComments)}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span className="text-xl">💬</span>
          <span className="text-sm font-medium">
            {post.comments?.length || 0} Comments
          </span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100 bg-gray-50">
          {/* Existing Comments */}
          <div className="divide-y divide-gray-100">
            {sortedComments.map((comment) => (
              <div key={comment.id} className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {comment.user?.name?.[0]?.toUpperCase() || '?'}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        {comment.user?.name || 'Anonymous'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <div 
                      className="mt-1 text-gray-700 text-sm"
                      dangerouslySetInnerHTML={{ __html: comment.body }}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {sortedComments.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                No comments yet. Be the first to comment!
              </div>
            )}
          </div>

          {/* Add Comment Form */}
          <div className="p-4 bg-white border-t border-gray-100">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full min-h-[100px] p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
              maxLength={1000}
            />
            {error && (
              <div className="mt-2 text-sm text-red-500">
                {error}
              </div>
            )}
            <div className="mt-3 flex justify-between items-center">
              <span className="text-xs text-gray-500">
                {1000 - newComment.length} characters remaining
              </span>
              <button
                onClick={handleAddComment}
                disabled={isAddingComment || !newComment.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isAddingComment ? (
                  <span className="flex items-center space-x-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Posting...</span>
                  </span>
                ) : (
                  'Post Comment'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedPost;