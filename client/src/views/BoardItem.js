import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Context } from '../context/index';

const BoardItem = () => {
  const { id } = useParams();
  const { state } = useContext(Context);
  const [item, setItem] = useState({});

  const getData = () => {
    console.log(state.boardList);
    let data =
      state.boardList.length === 0
        ? [{}]
        : state.boardList.filter((item) => item.board_id.toString() === id);
    setItem(data[0]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <span className="title">BoardItem</span>
      {JSON.stringify(item) === '{}' ? (
        <div>
          <p>
            Missing Contents. Please{' '}
            <Link to="/boardList" className="text-blue-500">
              go back to BoardList
            </Link>
          </p>
        </div>
      ) : (
        <div className="bg-white border shadow-sm px-4 py-3 rounded-lg max-w-lg">
          <div className="flex items-center  border-b border-gray-200">
            <div className="ml-2">
              <p className="post-tit">{item.title}</p>
              <div className="text-sm ">
                <span className="font-semibold">
                  {item.userName ? item.userName : 'unknown'}
                </span>
                <span className="inline-block">
                  {item.createdAt ? item.createdAt.split('T')[0] : ''}
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-800 text-sm mt-2 leading-normal md:leading-relaxed">
            {item.content}
          </p>
        </div>
      )}
    </div>
  );
};

export default BoardItem;
