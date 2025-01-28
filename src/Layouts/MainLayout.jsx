import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import {Navbar, EventSidebar } from '../components/index.js';
import { userService } from '../api/auth.js';
import {useDispatch, useSelector} from "react-redux"
import {login, logout} from "../features/Authentication/authSlice.js"
import {selectAuthLoading, selectIsAuthenticated } from "../features/Authentication/authSelector.js"

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated)

  React.useEffect((()=>{
    userService.getCurrentUser().then((userData) => {
      if(userData){
         dispatch(login(userData));
      } else{
        dispatch(logout());
        navigate("/auth");
      }
     
    })
  }),[dispatch, navigate])

  return (
    <>
      <Navbar />
      <main className="flex flex-row">
        {String(location.pathname) !== "/main/create-event" && (
          <div className="hidden sw:hidden md:hidden lg:block bg-gray-100 border-r border-gray-300 p-4 w-64">
            <EventSidebar />
          </div>
        )}
        {isAuthenticated && (
          <div className=" bg-white flex-1">
            <Outlet />
          </div>
        )}
      </main>
    </>
  );
}

export default MainLayout