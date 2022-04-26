import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Context } from '../context/index';

const BoardItem = () => {
  const { id } = useParams();
  const { state } = useContext(Context);
  const [item, setItem] = useState({});
  const navigate = useNavigate();

  const getData = () => {
    console.log(state.boardList.list);
    let data =
      state.boardList.list.length === 0
        ? [{}]
        : state.boardList.list.filter(
            (item) => item.board_id.toString() === id
          );
    setItem(data[0]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col  max-w-2xl mx-auto">
      {JSON.stringify(item) === '{}' ? (
        navigate('/boardList')
      ) : (
        <>
          <span className="title">BoardItem</span>
          <div className="mt-8 text-gray-700 bg-gray-100 text-white border-2 border-gray-500 p-5 rounded-lg">
            <div className="flex items-center  border-b border-gray-200">
              <div className="ml-2">
                <p className="post-tit text-2xl font-bold">{item.title}</p>
                <div className="mt-2 text-sm text-gray-500">
                  <span>
                    Writer :
                    <em className="pl-2 font-bold not-italic">
                      {item.userName ? item.userName : 'unknown'}
                    </em>
                  </span>
                  <span className="inline-block ml-5">
                    Date : {item.createdAt ? item.createdAt.split('T')[0] : ''}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-800 text-sm mt-3 leading-normal md:leading-relaxed">
              {item.content}
            </p>
          </div>
          <Link
            to="/boardList"
            className="btn border border-gray-300 text-gray-100 rounded mt-5 p-1 px-4 font-semibold cursor-pointer ml-auto"
          >
            Back
          </Link>
        </>
      )}
    </div>
  );
};

export default BoardItem;
