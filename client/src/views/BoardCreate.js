import React from 'react';

const BoardCreate = () => {
  return (
    <div>
      <span className="title"> BoardCreate</span>
      <div className="editor mx-auto mt-10 w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
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
          <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
            Cancel
          </div>
          <div className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">
            Post
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardCreate;
