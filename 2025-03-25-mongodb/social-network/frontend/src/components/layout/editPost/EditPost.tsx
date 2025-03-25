import PostModel from "../../../models/posts/Post";
import EditPostUi from "./EditPostUi";

interface EditPostProps {
  post: PostModel;
  onDelete: (id: string) => Promise<boolean>;
  onSavePost: (updatedPost: FormData) => Promise<void>;
}

export default function EditPost({ post, onDelete, onSavePost }: EditPostProps) {
  const { id, title, body, createdAt } = post;

  const handleSavePost = async (updatedPost: FormData) => {
    await onSavePost(updatedPost);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      await onDelete(id);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mb-6">
      {/* Post Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">
            Created at {new Date(createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex space-x-2">
          <EditPostUi 
            title={title} 
            body={body} 
            postId={id} 
            onSave={handleSavePost} 
          />
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Post Body */}
      <div className="prose">
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </div>
  );
}
