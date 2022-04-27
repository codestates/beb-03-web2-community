import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Context } from '../context/index';
import axios from 'axios';

const BoardCreate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { state } = useContext(Context);

  const navigation = useNavigate();

  const onSubmit = async () => {
    try {
      let result = await axios({
        method: 'post',
        url: 'http://localhost:8080/board/insert',
        data: {
          title: title,
          content: description,
          username: state.userInfo.userName,
          useremail: state.userInfo.userEmail,
        },
      });
      console.log(result.data);
      navigation(`/boardList`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col  max-w-2xl mx-auto">
      <span className="title"> BoardCreate</span>
      <div className="editor flex flex-col text-gray-800 p-4 mt-8  text-gray-700 text-white border border-gray-500 px-5 pt-10 rounded-lg">
        <input
          className="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
          placeholder="Describe everything about this post here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="buttons flex mt-10">
          <Link
            to="/boardList"
            className="btn border border-gray-300 text-gray-100 rounded p-1 px-4 font-semibold cursor-pointer ml-auto"
          >
            Cancel
          </Link>
          <button
            type="button"
            className="btn rounded p-1 px-4 font-semibold cursor-pointer text-gray-100 ml-2 bg-gray-900"
            onClick={onSubmit}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardCreate;
