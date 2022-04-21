import React from 'react';
import { Link } from 'react-router-dom';

const BoardList = () => {
  return (
    <div>
      <span className="title">BoardList</span>
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <Link to="/boardCreate">Create Post</Link>
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Num
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Writer
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created at
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer">
                      <p className="text-gray-900 whitespace-no-wrap">1</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer">
                      <p className="text-gray-900 whitespace-no-wrap">
                        [Notice] This is the board list for anything
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer">
                      <p className="text-gray-900 whitespace-no-wrap">Admin</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer">
                      <p className="text-gray-900 whitespace-no-wrap">
                        Jan 21, 2020
                      </p>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <div className="w-full text-right">
            <button
              className="bg-gray-500 hover:bg-gray-900 text-white font-bold w-40 h-12 py-2 px-4  rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              More...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardList;
