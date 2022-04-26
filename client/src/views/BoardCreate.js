import React from 'react';

const BoardCreate = () => {
  return (
    <div className="flex flex-col  max-w-2xl mx-auto">
      <span className="title"> BoardCreate</span>
      <div className="editor flex flex-col text-gray-800 p-4 mt-8  text-gray-700 text-white border border-gray-500 px-5 pt-10 rounded-lg">
        <input
          className="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          placeholder="Title"
          type="text"
        />
        <textarea
          className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
          placeholder="Describe everything about this post here"
        ></textarea>
        <div className="buttons flex mt-10">
          <button
            type="button"
            className="btn border border-gray-300 text-gray-100 rounded p-1 px-4 font-semibold cursor-pointer ml-auto"
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn rounded p-1 px-4 font-semibold cursor-pointer text-gray-100 ml-2 bg-gray-900"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardCreate;
