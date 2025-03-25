/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import TinyEditor from "../../common/TinyEditor";

interface EditPostUiProps {
  title: string;
  body: string;
  postId: string;
  onSave: (updatedPost: FormData) => Promise<void>;
}

export default function EditPostUi({
  title,
  body,
  onSave,
}: EditPostUiProps) {
  const [postTitle, setPostTitle] = useState(title);
  const [postBody, setPostBody] = useState(body);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleConfirmUpdate = async () => {
    setIsModalOpen(false);
    // Build FormData with updated fields and files
    const formData = new FormData();
    formData.append("title", postTitle);
    formData.append("body", postBody);
    selectedFiles.forEach((file) => {
      formData.append("postImages", file);
    });
    await onSave(formData);
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
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Edit Post
            </h2>

            {/* Title Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Upload Images Button */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Update Photo (optional)
              </label>
              <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Upload Images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      setSelectedFiles(Array.from(e.target.files));
                    }
                  }}
                  className="hidden"
                />
              </label>
            </div>

            {/* Image Previews */}
            {selectedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedFiles((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Body Editor */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Body
              </label>
              <TinyEditor value={postBody} onChange={setPostBody} />
            </div>

            {/* Action Buttons */}
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
