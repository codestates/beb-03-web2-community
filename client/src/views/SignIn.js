import React from 'react';

const SignIn = () => {
  return (
    <div>
      <span className="title">Sign In</span>
      <div className="form-signup-dig mt-10">
        <div className="w-full max-w-xs">
          <form className="max-w-md mb-4 form-input">
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
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-900 text-white font-bold w-full h-12 py-2 px-4  rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign In
              </button>
            </div>
            <div>
              <p>or sign up with</p>
              <button
                className="bg-gray-500 hover:bg-gray-900 text-white font-bold w-full h-12 py-2 px-4  rounded focus:outline-none focus:shadow-outline"
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

export default SignIn;
