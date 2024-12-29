import React from 'react'
import { Login, Signup } from '../features';

const Auth = () => {
  
  return (
    <div className=" bg-gray-900 w-full h-screen font-roboto py-24 ">
      <div className="flex flex-col h-full justify-center items-center lg:mt-12">
        <Login/>
      </div>
    </div>
  );
}

export default Auth