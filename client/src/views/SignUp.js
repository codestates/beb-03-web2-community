import React from 'react';
import axios from 'axios';

const SignUp = () => {
  const onSubmit = () => {};

  return (
    <div>
      <span className="title">Sign Up</span>
      <div className="mx-auto mt-10 w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
        <div className="w-full">
          <form className="max-w-md mb-4 mx-auto">
            <div className="mb-4">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border border rounded h-12 w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="email"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="pw"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border border rounded w-full h-12 py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="pw"
                type="password"
                placeholder="******************"
              />
            </div>
            <div className="w-full text-center">
              <button
                className="bg-blue-500 hover:bg-blue-900 text-white font-bold h-12 py-2 px-4  rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
