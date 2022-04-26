import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { Context } from '../../context/index';
import { SET_USER_INFO, CHANGE_LOGIN_STATUS } from '../../context/action';

const Header = () => {
  const { state, dispatch } = useContext(Context);

  const onLogout = () => {
    dispatch({
      type: SET_USER_INFO,
      payload: {},
    });
    dispatch({
      type: CHANGE_LOGIN_STATUS,
      payload: false,
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
          </span>
          <button
            type="button"
            className="bg-gray-100 ml-3 p-1 rounded"
            onClick={onLogout}
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
