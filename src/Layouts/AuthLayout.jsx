import React from 'react'
import { Footer, Header } from '../components'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
      <Header />
        <main>
          <Outlet />
        </main>
      <Footer/>
    </>
  );
}

export default AuthLayout