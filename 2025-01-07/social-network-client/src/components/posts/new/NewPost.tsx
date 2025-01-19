// components/posts/new/NewPost.tsx
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import PostDraft from "../../../models/posts/PostDraft";
import TinyEditor from "../../common/TinyEditor";
import Loading from "../../common/Loading";

interface NewPostProps {
  onAddPost: (newPost: PostDraft) => void;
}

const MIN_TITLE_LENGTH = 10;
const MIN_BODY_LENGTH = 20;

export default function NewPost({ onAddPost }: NewPostProps) {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<PostDraft>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bodyContent, setBodyContent] = useState("");
  const [bodyError, setBodyError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleEditorChange = (content: string) => {
    setBodyContent(content);
    setValue("body", content);
    // Clear body error when user starts typing
    setBodyError(null);
  };

  const validateBody = (content: string) => {
    // Strip HTML tags for length validation
    const stripHtml = (html: string) => {
      const tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    };

    const strippedBody = stripHtml(content).trim();
    
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

    try {
      await onAddPost({ ...data, body: bodyContent });
      reset();
      setBodyContent("");
      setShowForm(false);
    } catch (error: any) {
      setError(error.message || "Failed to add post.");
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
              placeholder={`Enter a title (minimum ${MIN_TITLE_LENGTH} characters)`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Body *
            </label>
            <TinyEditor
              value={bodyContent}
              onChange={handleEditorChange}
              placeholder={`Write your post content (minimum ${MIN_BODY_LENGTH} characters)...`}
            />
            {bodyError && (
              <p className="mt-1 text-sm text-red-500">{bodyError}</p>
            )}
          </div>

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