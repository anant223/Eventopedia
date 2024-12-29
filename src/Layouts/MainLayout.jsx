import React from 'react'
import { Outlet,useLocation } from 'react-router-dom';
import {Navbar, EventSidebar } from '../components/index.js';



const MainLayout = () => {
  const location = useLocation()
console.log(location.pathname);
  return (
    <>
      <Navbar />
      <main className="flex text-lg">
        {String(location.pathname) !== "/main/create-event" && (
          <div className={`w-64 hidden sw:hidden md:hidden lg:block`}>
            <EventSidebar />
          </div>
        )}
        <div className=' flex-grow'>
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default MainLayout