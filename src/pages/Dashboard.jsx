import React, { useState } from 'react'
import {UserProfile,  UserProfileFrom } from '../components/index.js';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser} from "../app/selector/authSelector.js"
import Modal from '../components/modal/Modal.jsx';

const Dashboard = () => {
  const [isClose, setIsclosed] = useState(false)
  const location = useLocation()
  const isAuthenticated = useSelector(selectUser)
  const handleOpenModel = (status) =>{
    setIsclosed(status)
  }
  return (
    <div className="relative bg-background min-h-screen pt-16 ml-64">
      <div className="mx-auto px-4 md:px-8 lg:px-12 max-w-5xl">
        <div className="flex-1">
          <div>
            <div className={` ${isClose && "blur-2xl"}`}>
              <UserProfile openIt={() => handleOpenModel(true)} />
            </div>
          </div>
        </div>
        {isClose && (
          <Modal>
            <UserProfileFrom closeIt={() => handleOpenModel(false)} />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Dashboard