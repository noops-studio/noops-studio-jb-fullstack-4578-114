// components/posts/post/PostUi.tsx
import React, { useState } from "react";
import { useComments } from '../../../hooks/useComments';
import TinyEditor from '../../common/TinyEditor';
import PostModel from "../../../models/posts/Post";

interface PostsUiProps {
  post: PostModel;
  profilePictureUrl: string;
  isEditing: boolean;
  isDeleteDialogOpen: boolean;
  setIsEditing: (value: boolean) => void;
  setIsDeleteDialogOpen: (value: boolean) => void;
  newTitle: string;
  newBody: string;
  setNewTitle: (value: string) => void;
  setNewBody: (value: string) => void;
  onDelete: () => Promise<void>;
  onUpdate: () => Promise<void>;
}

const MIN_COMMENT_LENGTH = 20;

export default function PostsUi({
  post,
  profilePictureUrl,
  isEditing,
  isDeleteDialogOpen,
  setIsEditing,
  setIsDeleteDialogOpen,
  newTitle,
  newBody,
  setNewTitle,
  setNewBody,
  onDelete,
  onUpdate,
}: PostsUiProps): JSX.Element {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState<string | null>(null);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { addComment } = useComments();

  const validateComment = (comment: string) => {
    const stripHtml = (html: string) => {
      const tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    };

    const strippedComment = stripHtml(comment);
    return strippedComment.length >= MIN_COMMENT_LENGTH;
  };

  const handleAddComment = async () => {
    if (!validateComment(newComment)) {
      setCommentError(`Comment must be at least ${MIN_COMMENT_LENGTH} characters long`);
      return;
    }

    setCommentError(null);
    setIsAddingComment(true);

    try {
      await addComment(post.id, newComment);
      setNewComment("");
    } catch (error) {
      setCommentError("Failed to add comment. Please try again.");
    } finally {
      setIsAddingComment(false);
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await onUpdate();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update post:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
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

  return (
    <div className="border rounded-lg shadow-lg bg-white p-6 mb-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={profilePictureUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <h2 className="text-lg font-semibold">{post.user?.name || "Anonymous"}</h2>
            <p className="text-sm text-gray-500">{formatTimeAgo(post.createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowComments(!showComments)}
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
            title="Comments"
          >
            💬 {post.comments?.length || 0}
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`p-2 rounded-full ${
              isEditing ? "bg-gray-400 hover:bg-gray-500" : "bg-green-500 hover:bg-green-600"
            } text-white`}
            title={isEditing ? "Cancel Edit" : "Edit"}
          >
            {isEditing ? "✕" : "✏️"}
          </button>
          <button
            onClick={() => setIsDeleteDialogOpen(true)}
            className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Content Section */}
      {!isEditing ? (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </div>
      ) : (
        <div className="mt-4">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
            placeholder="Enter title"
            minLength={10}
          />
          <TinyEditor
            value={newBody}
            onChange={setNewBody}
            placeholder="Enter content..."
          />
          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md"
              disabled={isUpdating}
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:bg-blue-300"
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {showComments && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 md:max-w-2xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-screen">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Comments ({post.comments?.length || 0})</h3>
              <button
                onClick={() => setShowComments(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {post.comments?.map((comment) => (
                <div key={comment.id} className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm mr-2">
                      {comment.user?.name?.[0] || 'A'}
                    </div>
                    <div>
                      <p className="font-semibold">{comment.user?.name || "Anonymous"}</p>
                      <p className="text-xs text-gray-500">
                        {formatTimeAgo(comment.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div
                    className="text-gray-700 pl-10"
                    dangerouslySetInnerHTML={{ __html: comment.body }}
                  />
                </div>
              ))}
              {post.comments?.length === 0 && (
                <p className="text-gray-500 text-center">No comments yet</p>
              )}
            </div>

            <div className="border-t pt-4">
              <div className="mb-4">
                <TinyEditor
                  value={newComment}
                  onChange={setNewComment}
                  placeholder="Add a comment..."
                  height={150}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Minimum {MIN_COMMENT_LENGTH} characters required
                </p>
                {commentError && (
                  <p className="mt-1 text-sm text-red-500">{commentError}</p>
                )}
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => {
                    setNewComment("");
                    setCommentError(null);
                    setShowComments(false);
                  }}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddComment}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:bg-blue-300"
                  disabled={isAddingComment || !newComment.trim()}
                >
                  {isAddingComment ? "Adding Comment..." : "Add Comment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Delete Post</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={onDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                Delete Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}