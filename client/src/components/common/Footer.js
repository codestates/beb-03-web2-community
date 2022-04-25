import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center bg-gray-900 text-white">
      <div
        className="text-center p-4"
        // style={'background-color: rgba(0, 0, 0, 0.2);'}
      >
        © 2021 Copyright:
        <a
          className="text-white"
          href="https://github.com/codestates/beb-03-web2-community"
        >
          KDY Project
        </a>
      </div>
    </footer>
  );
};

export default Footer;
