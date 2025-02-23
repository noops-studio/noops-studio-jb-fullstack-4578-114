import { useState } from 'react';
import TinyEditor from '../../common/TinyEditor';

interface EditPostUiProps {
  title: string;
  body: string;
  postId: string;
  onSave: (updatedPost: { title: string; body: string; postId: string }) => Promise<void>;
}

export default function EditPostUi({ title, body, postId, onSave }: EditPostUiProps) {
  const [postTitle, setPostTitle] = useState(title);
  const [postBody, setPostBody] = useState(body);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleConfirmUpdate = async () => {
    setIsModalOpen(false);
    await onSave({ title: postTitle, body: postBody, postId });
  };

  return (
    <div className="text-center">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        onClick={handleOpenModal}
      >
        Edit Post
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Edit Post</h2>

            <div className="mb-6">
              <label
                htmlFor="post-title"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Title
              </label>
              <input
                id="post-title"
                type="text"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="Enter a title for your post"
                className="block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-2 text-base focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200 placeholder-gray-400 hover:shadow-md"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="post-body"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Body
              </label>
              <TinyEditor value={postBody} onChange={setPostBody} />
            </div>

            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleConfirmUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
