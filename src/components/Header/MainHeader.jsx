import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Logo, MainButton } from '../index';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useSelector } from 'react-redux';
import { selectUser } from '../../app/selector/authSelector';
import { Bell, User, Plus } from 'lucide-react';
import userService from '@/api/userService';

const MainHeader = () => {
    const user = useSelector(selectUser)
    const navigate = useNavigate()

    const userData = user?.data?.data;
    console.log(userData);
    const username = userData?.name
    const useremail = userData?.email
    const useravtar = userData?.avatar;

    const handleEndSession = async () => {
      try {
        const session =await userService.logoutUser()
        if(session){
          navigate("/")
        }
      } catch (error) {
        throw new Error("Something went wrong while ending session", error)
      }
    }
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0a1628]/95 backdrop-blur-xl border-b w-full border-gray-800 shadow-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full py-3">
          <Link
            to="/main/all-events"
            className="flex items-center transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent rounded-md"
            aria-label="Go to all events"
          >
            <Logo />
          </Link>

          {/* User Menu */}
          <div className="flex gap-4 items-center">
          
            <Bell className="text-text" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 rounded-full w-10 p-0 border border-gray-500/60 hover:border-white/80 hover:bg-white/5 transition-all duration-200 focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent"
                  type="button"
                  aria-label={`User menu for ${username || "user"}`}
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={useravtar}
                      alt={`${username}'s profile picture`}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-gray-600 to-gray-700 text-white text-sm font-medium">
                      {username ? (
                        username.charAt(0).toUpperCase()
                      ) : (
                        <User size={16} />
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-[#0a1628] rounded-full" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={12}
                className="w-64 bg-[#0a1628]/95 backdrop-blur-xl text-white rounded shadow-2xl border border-white/10 p-0 overflow-hidden"
                forceMount={false}
              >
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage
                        src={useravtar}
                        alt={`${username}'s profile picture`}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-gray-600 to-gray-700 text-white text-sm font-medium">
                        {username ? (
                          username.charAt(0).toUpperCase()
                        ) : (
                          <User size={16} />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-semibold text-text truncate capitalize"
                        title={username}
                      >
                        {username || "User"}
                      </p>
                      <p
                        className="text-sm text-text truncate"
                        title={useremail}
                      >
                        {useremail || "user@example.com"}
                      </p>
                    </div>
                    <DropdownMenuItem
                      onClick={handleEndSession}
                      className="cursor-pointer text-sm hover:bg-white/10"
                    >
                      Sign out
                    </DropdownMenuItem>
                  </div>
                </div>
                <DropdownMenuSeparator className=" w-0" />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default MainHeader