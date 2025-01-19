// components/posts/profile/Profile.tsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchProfilePosts, addProfilePost } from "../../../redux/profileSlice";
import NewPost from "../new/NewPost";
import Post from "../post/Post";
import Loading from "../../common/Loading";
import useTitle from "../../../hooks/useTitle";
import "./Profile.css";

export default function Profile() {
  useTitle("Profile");
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => {
    console.log("Current Redux State:", state); // Debug log
    return state.profile;
  });

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const resultAction = await dispatch(fetchProfilePosts()).unwrap();
        console.log("Fetched posts:", resultAction); // Debug log
      } catch (err) {
        console.error("Failed to fetch posts:", err); // Debug log
      }
    };
    loadPosts();
  }, [dispatch]);

  const handleAddPost = async (newPost) => {
    try {
      const resultAction = await dispatch(addProfilePost(newPost)).unwrap();
      console.log("Added new post:", resultAction); // Debug log
    } catch (err) {
      console.error("Failed to add post:", err); // Debug log
    }
  };

  // Debug log for render
  console.log("Current posts:", posts);

  if (loading) {
    return <Loading isLoading={true} />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 p-4">
      <NewPost onAddPost={handleAddPost} />
      <div className="posts-container flex-grow mt-6">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <Post key={post.id} post={post} />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-4">
            No posts found. Create your first post above!
          </div>
        )}
      </div>
    </div>
  );
}