import React from 'react';
import { useParams } from 'react-router-dom';

const BoardItem = () => {
  const { id } = useParams();

  return (
    <div>
      <span className="title">BoardItem</span>
      <div class="bg-white border shadow-sm px-4 py-3 rounded-lg max-w-lg">
        <div class="flex items-center">
          <div class="ml-2">
            <p class="post-tit">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
            <div class="text-sm ">
              <span class="font-semibold">Dallin Baumbach</span>
              <span class="inline-block">3d • Edited • </span>
            </div>
          </div>
        </div>
        <p class="text-gray-800 text-sm mt-2 leading-normal md:leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
};

export default BoardItem;
