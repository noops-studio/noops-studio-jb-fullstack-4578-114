import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import PostDraft from "../../../models/posts/PostDraft";
import Loading from "../../common/Loading";
import TinyEditor from "../../common/TinyEditor";

interface NewPostProps {
  onAddPost: (newPost: FormData) => Promise<void>;
}

const MIN_TITLE_LENGTH = 10;
const MIN_BODY_LENGTH = 20;

export default function NewPost({ onAddPost }: NewPostProps) {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<PostDraft>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bodyContent, setBodyContent] = useState("");
  const [bodyError, setBodyError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleEditorChange = (content: string) => {
    setBodyContent(content);
    setValue("body", content);
    setBodyError(null);
  };

  const validateBody = (content: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = content;
    const strippedBody = (tmp.textContent || tmp.innerText || "").trim();
    if (!strippedBody) {
      return "Body content is required";
    }
    if (strippedBody.length < MIN_BODY_LENGTH) {
      return `Body must be at least ${MIN_BODY_LENGTH} characters long (currently: ${strippedBody.length})`;
    }
    return null;
  };

  const onSubmit: SubmitHandler<PostDraft> = async (data) => {
    const bodyValidationError = validateBody(bodyContent);
    if (bodyValidationError) {
      setBodyError(bodyValidationError);
      return;
    }
    setLoading(true);
    setError(null);
    setBodyError(null);

    // Build FormData and append all fields
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("body", bodyContent);
    selectedFiles.forEach((file) => {
      formData.append("postImages", file);
    });

    try {
      await onAddPost(formData);
      reset();
      setBodyContent("");
      setSelectedFiles([]);
      setShowForm(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to add post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
      >
        <span className="text-lg font-semibold">
          {showForm ? "Close New Post" : "Create New Post"}
        </span>
        <span className="text-2xl">{showForm ? "−" : "+"}</span>
      </button>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 border-t">
          <Loading isLoading={loading} error={error} />

          {/* Title Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              className={`w-full p-2 border rounded-md ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              {...register("title", { 
                required: "Title is required",
                minLength: {
                  value: MIN_TITLE_LENGTH,
                  message: `Title must be at least ${MIN_TITLE_LENGTH} characters`
                }
              })}
              placeholder={`Enter a title (min ${MIN_TITLE_LENGTH} characters)`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* File Upload Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photos (optional)
            </label>
            <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Upload Images
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    setSelectedFiles(prev => [...prev, ...Array.from(e.target.files)]);
                  }
                }}
                className="hidden"
              />
            </label>
          </div>

          {/* Image Preview */}
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
                      setSelectedFiles(prev => prev.filter((_, i) => i !== index))
                    }
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Body Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Body *
            </label>
            <TinyEditor
              value={bodyContent}
              onChange={handleEditorChange}
              placeholder={`Write your post content (min ${MIN_BODY_LENGTH} characters)...`}
            />
            {bodyError && (
              <p className="mt-1 text-sm text-red-500">{bodyError}</p>
            )}
          </div>

          {/* Form Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                reset();
                setBodyContent("");
                setBodyError(null);
                setError(null);
                setShowForm(false);
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? "Creating..." : "Create Post"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
