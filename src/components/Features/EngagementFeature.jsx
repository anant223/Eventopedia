import React from 'react'

const EngagmentFeature = () => {
  return (
    <div className=" bg-primary text-gray-900 rounded shadow-lg w-full  mt-8">
      <div className=" space-y-2 p-4 rounded-md bg-blue-600 m-4 shadow-2xl">
        <div>Quick Poll</div>
        <div>
          <div className=" bg-gray-700 w-full h-4 rounded-full"></div>
        </div>
        <div>
          <div className=" bg-gray-700 w-full h-4 rounded-full"></div>
        </div>
        <div>
          <div className=" bg-gray-700 w-full h-4 rounded-full"></div>
        </div>
      </div>
      <div>
        <div className=" space-y-2  rounded bg-white text-text p-4 m-4">
          <div>
            <div className=" bg-blue-700 w-full rounded-full px-2 py-4">
              Great Session!
            </div>
          </div>
          <div>
            <div className=" bg-gray-700 w-full  rounded-full px-2 py-4">
              Thanks for sharing!
            </div>
          </div>
          <div>
            <div className=" bg-blue-700 w-full rounded-full px-2 py-4">
              Very helpful 👍
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EngagmentFeature