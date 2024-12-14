import React, { useState } from 'react'
import {UserProfile, Container, UserProfileFrom } from '../components/index.js';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate()
  const [isClose, setIsclosed] = useState(false)

  const handleOpenModel = (status) =>{
    setIsclosed(status)
    console.log(isClose);
  }
  React.useEffect(() => {
    console.log("isClose state updated:", isClose);
  }, [isClose]);

  return (
    <div className="relative bg-gray-800  min-h-screen py-24">
      <Container>
        <div className={`flex-1 `}>
          <div>
            <div className={` ${isClose && "blur-2xl"}`}>
              <UserProfile openIt={() => handleOpenModel(true)} />
            </div>
          </div>
        </div>
        {isClose && (
          <div className="fixed bg-black sm:bg-opacity-50 sm:flex sm:justify-center items-center z-50 inset-0 top-[5rem]">
            <div className="relative rounded-lg shadow-lg max-w-4xl p-6">
              <UserProfileFrom closeIt={() => handleOpenModel(false)} />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Dashboard