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
    <div className="flex flex-wrap content-start border-l">
      <Navbar />
      {String(location.pathname) !== "/main/create-event" && (
        <div className="hidden sw:hidden md:hidden lg:block border-gray-100 bg-gray-600 p-4 w-64 h-">
          <EventSidebar />
        </div>
      )}
      <main className="grow">{isAuthenticated && <Outlet />}</main>
    </div>
  );
}

export default MainLayout