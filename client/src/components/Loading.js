import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-80">
      <span className="h-6 w-6 block rounded-full border-t-4  border-blue-300 animate-spin"></span>
      <span className="text-gray-500 ml-5">loading...</span>
    </div>
  );
};

export default Loading;
