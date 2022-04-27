import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context/index';
import { SET_USER_INFO, CHANGE_LOGIN_STATUS } from '../context/action';

axios.defaults.withCredentials = true;
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

      if (result.data.loginSuccess) {
        let result = await axios({
          method: 'get',
          url: 'http://localhost:8080/users/userInfo',
        });
        console.log(result);
        dispatch({
          type: SET_USER_INFO,
          payload: result.data.userInfo,
        });
        dispatch({
          type: CHANGE_LOGIN_STATUS,
          payload: true,
        });
        navigate('/');
      } else {
        alert(result.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col  max-w-2xl mx-auto">
      <span className="title">Sign In</span>
      <div className="mt-8  text-gray-700 text-white border-2 border-gray-500 px-5 pt-10 rounded-lg">
        <div className="w-full">
          <form className="mb-4 mx-auto">
            <div className="mb-4">
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
              <input
                className="shadow appearance-none border border rounded w-full h-12 py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="pw"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full text-center">
              <button
                className="bg-transparent hover:bg-gray-800 border-gray-400 border-2 text-white font-bold py-3  w-72 rounded focus:outline-none focus:shadow-outline leading-5"
                type="button"
                onClick={onSubmit}
              >
                Sign In
              </button>
            </div>
            <div className="mt-10 pt-4 border-t-2 border-gray-500 border-dotted text-center">
              <p className="text-base text-gray-400">or sign up with</p>
              <Link
                to="/signup"
                className="block bg-gray-900 hover:bg-transparent border-gray-400 border-2 text-white font-bold w-72 py-3 m-auto mt-6 rounded focus:outline-none focus:shadow-outline leading-5"
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
