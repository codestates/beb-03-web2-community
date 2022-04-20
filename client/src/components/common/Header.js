import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav
      className="
  relative
  w-full
  flex 
  flex-wrap
  items-center
  justify-between
  p-3
  pl-10
  pr-10
  bg-gray-900
  text-white
  "
    >
      <div className="w-full flex flex-wrap items-center justify-between">
        <div
          className="flex items-center items-center"
          id="navbarSupportedContent"
        >
          <Link
            to="/"
            className=" text-gray-900
              hover:text-gray-900
              focus:text-gray-900
            "
            href="#"
          >
            <img
              src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png"
              alt=""
            />
          </Link>
          {/* <!-- Left links --> */}
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
                to="/signup"
                className="text-white hover:text-gray-500 focus:text-gray-500 pl-3 pr-3"
              >
                Signup
              </Link>
            </li>
            <li>
              <Link
                to="/board"
                className="text-white hover:text-gray-500 focus:text-gray-500 pl-3 pr-3"
              >
                Board
              </Link>
            </li>
          </ul>
          {/* <!-- Left links --> */}
        </div>
        {/* <!-- Collapsible wrapper --> */}
      </div>
    </nav>
  );
};

export default Header;
