import { FaBars, FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './navBar';

const Header = () => {
  const [showNavBar, setShowNavBar] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const toggleNavBar = () => setShowNavBar(!showNavBar);
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);


  const closeNavBar = () => setShowNavBar(false)

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-red-600 text-white shadow-lg">
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleNavBar} 
            className="text-3xl hover:text-yellow-300 transition-colors">
            <FaBars />
          </button>
          <Link to="/home" className="text-2xl font-semibold hover:text-yellow-300 transition-colors">
              Sistema de Administración
          </Link>
        </div>
        <div className="relative flex items-center space-x-4">
          <button 
            onClick={toggleUserMenu} 
            className="flex items-center space-x-2 bg-white text-red-600 py-1 px-3 mr-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <span className="text-lg font-medium">Usuario X</span>
            <FaUser className="text-2xl" />
          </button>
        </div>
      </header>
      {showNavBar && <NavBar closeNavBar={closeNavBar}/>}
    </>
  );
};

export default Header;
