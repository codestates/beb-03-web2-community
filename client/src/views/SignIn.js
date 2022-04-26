import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context/index';
import { SET_USER_INFO, CHANGE_LOGIN_STATUS } from '../context/action';

const SignIn = () => {
  const { state, dispatch } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      let result = await axios({
        method: 'post',
        url: 'http://localhost:8080/users/signin',
        data: {
          userEmail: email,
          password: password,
        },
      });
      console.log('result : ', result.data.result);
      dispatch({
        type: SET_USER_INFO,
        payload: result.data.result,
      });
      dispatch({
        type: CHANGE_LOGIN_STATUS,
        payload: true,
      });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  console.log('userInfo  :', state.userInfo);

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-900 text-white font-bold w-full h-12 py-2 px-4  rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={onSubmit}
              >
                Sign In
              </button>
            </div>
            <div>
              <p>or sign up with</p>
              <Link
                to="/signup"
                className="bg-gray-500 hover:bg-gray-900 text-white font-bold w-full h-12 py-2 px-4  rounded focus:outline-none focus:shadow-outline"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
