import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      let result = await axios({
        method: 'post',
        url: 'http://localhost:8080/users/signup',
        data: {
          userEmail: email,
          userName: username,
          password: password,
        },
      });
      console.log(result);
      alert('회원가입이 완료되었습니다 축하합니다!!');
      navigate('/signin');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col  max-w-2xl mx-auto">
      <span className="title">Sign Up</span>
      <div className="mt-8  text-gray-700 text-white border-2 border-gray-500 px-5 pt-10 rounded-lg">
        <div className="w-full">
          <form className="mb-4 mx-auto">
            <div className="mb-4">
              <input
                className="shadow appearance-none border border rounded h-12 w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="User Name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
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
                className="bg-transparent hover:bg-gray-800 border-gray-400 border-2 text-white font-bold py-3 px-24 ml-4 rounded focus:outline-none focus:shadow-outline leading-5"
                type="button"
                onClick={onSubmit}
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
