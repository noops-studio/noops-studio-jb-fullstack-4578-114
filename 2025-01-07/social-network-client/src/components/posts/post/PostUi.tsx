// components/posts/post/PostUi.tsx
import React, { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { addCommentToPost } from "../../../redux/profileSlice";
import TinyEditor from "../../common/TinyEditor";
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
  const dispatch = useAppDispatch();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState<string | null>(null);

  const validateComment = (comment: string) => {
    // Strip HTML tags for length validation
    const stripHtml = (html: string) => {
      const tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    };

    const strippedComment = stripHtml(comment);
    return strippedComment.length >= MIN_COMMENT_LENGTH;
  };

  const handleAddComment = async () => {
    setCommentError(null);

    if (!validateComment(newComment)) {
      setCommentError(`Comment must be at least ${MIN_COMMENT_LENGTH} characters long`);
      return;
    }

    try {
      await dispatch(addCommentToPost({
        postId: post.id,
        body: newComment
      })).unwrap();
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
      setCommentError("Failed to add comment. Please try again.");
    }
  };

  const handleUpdate = async () => {
    try {
      await onUpdate();
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  return (
    <div className="border rounded-lg shadow-lg bg-white p-6 mb-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={profilePictureUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <h2 className="text-lg font-semibold">{post.user?.name || "Anonymous"}</h2>
            <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowComments(true)}
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
            title="Edit"
          >
            ✏️
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
          <h3 className="text-xl font-bold">{post.title}</h3>
          <div
            className="mt-2 text-gray-700"
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
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md"
            >
              Cancel
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
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-2">
                      {comment.user?.name?.[0] || 'A'}
                    </div>
                    <div>
                      <p className="font-semibold">{comment.user?.name || "Anonymous"}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleString()}
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
                  onClick={() => setShowComments(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddComment}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                  disabled={!newComment.trim()}
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Delete Post</h3>
            <p className="mb-4">Are you sure you want to delete this post?</p>
            <div className="flex justify-end space-x-4">
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}