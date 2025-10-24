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
    <div>
      <UserProfile openIt={() => handleOpenModel(true)} />
    </div>
  );
}

export default Dashboard