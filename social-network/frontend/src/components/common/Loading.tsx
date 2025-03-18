import { useState } from 'react';

interface LoadingProps {
  isLoading: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export default function Loading({ isLoading, error, onRetry }: LoadingProps) {
  const [showError, setShowError] = useState(!!error);

  const handleCloseError = () => setShowError(false);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-t-4 border-gray-200 rounded-full animate-spin"></div>
        </div>
      )}

      {showError && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
            <h2 className="text-2xl font-semibold text-red-600 mb-4 text-center">
              Error
            </h2>
            <p className="text-gray-700 text-center mb-6">{error}</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                onClick={handleCloseError}
              >
                Close
              </button>
              {onRetry && (
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={onRetry}
                >
                  Retry
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
