import { useState } from "react";
import { BurgerMenu, Header, Logo } from "../index.js";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import userService from "../../api/userService.js";
import { logout } from "../../app/features/authSlice.js";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();



  return (
    <Header>
      
    </Header>
    
  );
};

export default Navbar;
