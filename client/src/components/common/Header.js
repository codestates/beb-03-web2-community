import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/logo.png';
import { Context } from '../../context/index';
import {
  SET_USER_INFO,
  DELETE_USER_INFO,
  CHANGE_LOGIN_STATUS,
} from '../../context/action';

axios.defaults.withCredentials = true;
library.add(faRotate);

const Header = () => {
  const { state, dispatch } = useContext(Context);
  const navigate = useNavigate();

  const onSignOut = async () => {
    try {
      let result = await axios({
        method: 'post',
        url: 'http://localhost:8080/users/signout',
      });

      alert(result.data.message);
      dispatch({
        type: DELETE_USER_INFO,
        payload: {},
      });
      dispatch({
        type: CHANGE_LOGIN_STATUS,
        payload: false,
      });
      navigate('/signin');
    } catch (err) {
      console.error(err);
    }
  };

  const onFresh = async () => {
    let result = await axios({
      method: 'get',
      url: 'http://localhost:8080/users/userInfo',
    });
    console.log(result);

    dispatch({
      type: SET_USER_INFO,
      payload: result.data.userInfo,
    });
  };

  return (
    <header className="header bg-gray-900 w-full p-3 pl-10 pr-10 flex flex-wrap items-center justify-right">
      <h1 className="logo mr-auto">
        <Link
          to="/"
          className=" text-gray-900 hover:text-gray-900 focus:text-gray-900"
        >
          <img src={Logo} alt="KDY logo" className="w-24" />
        </Link>
      </h1>
      <nav className="relative flex flex-wrap items-center justify-between text-white">
        <div className="w-full flex flex-wrap items-center justify-between">
          <div
            className="flex items-center items-center"
            id="navbarSupportedContent"
          >
            <ul className="flex items-center items-center list-style-none ml-7">
              <li>
                <Link
                  to="/"
                  className="text-white font-bold text-lg hover:text-gray-500 focus:text-gray-500 pl-3 pr-3"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/boardList"
                  className="text-white font-bold text-lg hover:text-gray-500 focus:text-gray-500 pl-3 pr-3"
                >
                  Board
                </Link>
              </li>
              {state.isLogin ? (
                ''
              ) : (
                <>
                  <li className="bf-login">
                    <Link
                      to="/signin"
                      className="text-white font-bold text-lg hover:text-gray-500 focus:text-gray-500 pl-3 pr-3"
                    >
                      SignIn
                    </Link>
                  </li>
                  <li className="bf-login">
                    <Link
                      to="/signup"
                      className="text-white font-bold text-lg hover:text-gray-500 focus:text-gray-500 pl-3 pr-3"
                    >
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {state.isLogin ? (
        <div className="header-util af-login flex items-center items-center list-style-none ml-7">
          <span className="text-white pr-3">
            {state.userInfo.userName || '---'}님
          </span>
          <span className="text-white pr-3">
            Balance : {state.userInfo.balance || 0}
            <button type="button" className="btn sync" onClick={onFresh}>
              <FontAwesomeIcon icon="fa-solid fa-rotate" />
            </button>
          </span>
          <button
            type="button"
            className="bg-gray-100 ml-3 p-1 rounded"
            onClick={onSignOut}
          >
            Logout
          </button>
        </div>
      ) : (
        ''
      )}
    </header>
  );
};

export default Header;
