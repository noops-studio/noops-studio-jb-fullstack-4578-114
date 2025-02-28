import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      <span className="ml-3 text-indigo-600 font-medium">Loading...</span>
    </div>
  );
};

export default Loading;
