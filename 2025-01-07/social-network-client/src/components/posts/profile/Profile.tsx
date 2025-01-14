import { useEffect, useState } from 'react';
import Post from '../post/Post';
import NewPost from '../new/NewPost';
import profileService from '../../../services/Profile';
import PostModel from '../../../models/posts/Post';
import useTitle from '../../../hooks/useTitle';

export default function Profile() {
  const [posts, setPosts] = useState<PostModel[]>([]);


  useTitle('Profile');

  useEffect(() => {
    profileService.getProfile().then(setPosts).catch(console.error);
  }, []);

  const handleAddPost = (newPost: PostModel) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <NewPost onAddPost={handleAddPost} />
        <div className="mt-6 grid gap-4">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
