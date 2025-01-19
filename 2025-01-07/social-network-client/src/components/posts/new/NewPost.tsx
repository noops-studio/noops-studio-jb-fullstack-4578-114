import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import PostDraft from '../../../models/posts/PostDraft';
import InsertPost from '../../../services/InsertPost';
import TinyEditor from '../../common/TinyEditor';
import Loading from '../../common/Loading';

interface NewPostProps {
  onAddPost: (newPost: PostDraft) => void;
}

export default function NewPost({ onAddPost }: NewPostProps) {
  const { register, handleSubmit, reset, setValue } = useForm<PostDraft>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bodyContent, setBodyContent] = useState('');

  const handleEditorChange = (content: string) => {
    setBodyContent(content);
    setValue('body', content);
  };

  const onSubmit: SubmitHandler<PostDraft> = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const newPost = await InsertPost(data);
      onAddPost(newPost);
      reset();
      setBodyContent('');
    } catch (error: any) {
      setError(error.message || 'Failed to add post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg shadow-md p-6 space-y-4"
    >
      <Loading isLoading={loading} error={error} onRetry={() => handleSubmit(onSubmit)()} />
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          {...register('title', { required: 'Title is required' })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Body</label>
        <TinyEditor value={bodyContent} onChange={handleEditorChange} />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded-md text-white ${
          loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
