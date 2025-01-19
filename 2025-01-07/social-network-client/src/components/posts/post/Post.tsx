import React, { useState } from 'react';
import CommentDraft from '../../../models/comment/CommentDraft';
import PostModel from '../../../models/posts/Post';
import InsertComment from '../../../services/addComment';
import updatePost from '../../../services/updatePost';
import './Post.css';
import PostsUi from './PostUi';
import Loading from '../../common/Loading';

interface PostProps {
  post: PostModel;
  onDelete: (postId: string) => Promise<boolean>;
  onUpdatePost: (postId: string) => Promise<void>;
  setPosts: React.Dispatch<React.SetStateAction<PostModel[]>>; // Accept setPosts as a prop
}

export default function Post(props: PostProps): JSX.Element {
  const { post, onDelete, onUpdatePost, setPosts } = props;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddComment = async (postId: string, comment: string): Promise<void> => {
    const commentData: CommentDraft = { postId, body: comment };
    setLoading(true);
    setError(null);
    try {
      const response = await InsertComment(commentData);
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === postId ? { ...p, comments: [...p.comments, response] } : p
        )
      );
    } catch (e: any) {
      setError(e.message || 'Failed to add comment.');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePost = async (updatedPost: { title: string; body: string }) => {
    setLoading(true);
    setError(null);
    try {
      await updatePost(post.id, updatedPost);
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p.id === post.id ? { ...p, ...updatedPost } : p))
      );
    } catch (error: any) {
      setError(error.message || 'Failed to update post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loading isLoading={loading} error={error} onRetry={() => {}} />
      <PostsUi
        post={post}
        onDelete={onDelete}
        onAddComment={handleAddComment}
        onSavePost={handleSavePost}
      />
    </>
  );
}
