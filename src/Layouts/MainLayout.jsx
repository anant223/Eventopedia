import React from 'react'
import { Outlet, useLocation, useNavigate} from 'react-router-dom';
import {Navbar, EventSidebar } from '../components/index.js';
import {useDispatch, useSelector} from "react-redux"
import {selectAuthLoading, selectIsAuthenticated } from "../app/selector/authSelector.js"
import useAuth from '../hooks/useAuth.jsx';

const MainLayout = () => {
  const location = useLocation();
  const  {loading} = useAuth() 
  const isAuthenticated = useSelector(selectIsAuthenticated);
console.log(location.pathname);
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? (
    <>
      <Navbar />
      <main className="flex pt-16 min-h-screen">
        {location.pathname !== "/main/create-event" ||
          (location.pathname !== "/main/user-profile" && <EventSidebar />)}
        <Outlet />
      </main>
    </>
  ) : null;
};


export default MainLayout