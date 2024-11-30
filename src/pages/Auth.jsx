import React from 'react'
import { Signup, Footer, Container } from '../components/index.js'

const Auth = () => {
  return (
    <div className=" bg-gray-800 w-full h-screen font-roboto  ">
      <div className="w-full flex h-full flex-col items-center justify-center py-6">
        <Signup/>
      </div>
    </div>
  );
}

export default Auth