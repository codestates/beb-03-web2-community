import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';

const Header = () => {
  return (
    <header className="bg-gray-900 w-full p-3 pl-10 pr-10 flex flex-wrap items-center justify-between">
      <h1 className="logo">
        <Link
          to="/"
          className=" text-gray-900
                hover:text-gray-900
                focus:text-gray-900
              "
        >
          <img src={Logo} alt="" className="w-24" />
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
                  className="text-white hover:text-gray-500 focus:text-gray-500 pl-3 pr-3"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/boardList"
                  className="text-white hover:text-gray-500 focus:text-gray-500 pl-3 pr-3"
                >
                  Board
                </Link>
              </li>
              <li className="bf-login">
                <Link
                  to="/signin"
                  className="text-white hover:text-gray-500 focus:text-gray-500 pl-3 pr-3"
                >
                  SignIn
                </Link>
              </li>
              <li className="bf-login">
                <Link
                  to="/signup"
                  className="text-white hover:text-gray-500 focus:text-gray-500 pl-3 pr-3"
                >
                  Signup
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="af-login flex items-center items-center list-style-none ml-7">
        <span className="text-white pr-3">{'000'}님 </span>
        <Link
          to="/signin"
          className="text-white hover:text-gray-500 focus:text-gray-500 pl-3 pr-3"
        >
          My Page
        </Link>
      </div>
    </header>
  );
};

export default Header;
