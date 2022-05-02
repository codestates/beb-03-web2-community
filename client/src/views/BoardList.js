import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import { Context } from '../context/index';
import { SET_BOARDLIST, SET_PAGINATION } from '../context/action';

const BoardList = () => {
  const navigate = useNavigate();
  const { dispatch, state } = useContext(Context);
  const [boardList, setBoardList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('page');
  const [btnActive, setBtnActive] = useState(true);

  const onLinkItem = (pageNum) => navigate(`/board/${pageNum}`);

  const getList = async () => {
    try {
      let result = await axios({
        method: 'get',
        url: `http://localhost:8080/board/list?count=15`,
      });
      setBoardList(result.data.data);
      dispatch({
        type: SET_BOARDLIST,
        payload: { page: 1, list: result.data.data },
      });
      console.log('boardList-List : ', state.boardList);
      setType('page');
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onSearch = async () => {
    try {
      setLoading(true);
      let result = await axios({
        method: 'get',
        url: `http://localhost:8080/board/list?count=15&title=${search}`,
      });
      console.log('result ', result);
      setBoardList(result.data.data);
      dispatch({
        type: SET_BOARDLIST,
        payload: { page: 1, list: result.data.data },
      });
      setType('search');
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onPaging = async () => {
    try {
      if (boardList.length > 14) {
        let page = state.boardList.page + 1;
        let urlAddress =
          type === 'page'
            ? `http://localhost:8080/board/list?page=${page}&count=15`
            : `http://localhost:8080/board/list?page=${page}&count=15&title=${search}`;
        setLoading(true);
        let result = await axios({
          method: 'get',
          url: urlAddress,
        });
        let list = state.boardList.list.concat(result.data.data);
        console.log('state.bordList', state.bordList);
        setBoardList(list);
        dispatch({
          type: SET_PAGINATION,
          payload: { page: page, list: result.data.data },
        });
        setBtnActive(true);
        setLoading(false);
        // } else {
        setBtnActive(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="relative">
      <span className="title">BoardList</span>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto min-w-min">
          <div className="absolute top-2 right-0 board-util flex items-center justify-end">
            <div className="relative text-gray-600">
              <input
                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                type="search"
                name="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <a
                href="#"
                className="btn-search absolute right-0 top-0 w-16 h-10 bg-gray-300 text-sm text-center leading-10 rounded-lg"
                onClick={onSearch}
              >
                Search
              </a>
            </div>
            <Link
              to="/boardCreate"
              className="bg-transparent hover:bg-gray-700 border-gray-300 border-2 text-white font-bold w- h-10 py-2 px-4 ml-4 rounded focus:outline-none focus:shadow-outline leading-5 "
            >
              Create Post
            </Link>
          </div>
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Num
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Writer
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created at
                  </th>
                </tr>
              </thead>
              <tbody>
                {boardList.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-5 py-5 bg-gray-100 text-lg text-center font-bold"
                    >
                      <p className="text-gray-500 whitespace-no-wrap ">
                        No List Item
                      </p>
                    </td>
                  </tr>
                ) : (
                  boardList.map((item, index) => (
                    <tr key={index}>
                      <td
                        className="px-5 py-5 w-1/12 border-b border-gray-200 bg-white text-sm cursor-pointer"
                        onClick={() => onLinkItem(item.board_id)}
                      >
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.board_id}
                        </p>
                      </td>
                      <td
                        className="px-5 py-5 w-7/12 border-b border-gray-200 bg-white text-sm cursor-pointer"
                        onClick={() => onLinkItem(item.board_id)}
                      >
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.title}
                        </p>
                      </td>
                      <td
                        className="px-5 py-5 w-2/12 border-b border-gray-200 bg-white text-sm cursor-pointer"
                        onClick={() => onLinkItem(item.board_id)}
                      >
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.userName}
                        </p>
                      </td>
                      <td
                        className="px-5 py-5 w-2/12 border-b border-gray-200 bg-white text-sm cursor-pointer"
                        onClick={() => onLinkItem(item.board_id)}
                      >
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.createdAt.split('T')[0]}
                        </p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="w-full mt-4 text-center">
            <button
              className={` font-bold py-2 px-24 ml-4 rounded focus:outline-none focus:shadow-outline leading-5 ${
                boardList.length > 14
                  ? 'bg-transparent hover:bg-gray-700 border-gray-300 border-2 text-white'
                  : 'bg-gray-700 text-gray-500'
              }`}
              type="button"
              onClick={onPaging}
            >
              + More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardList;
