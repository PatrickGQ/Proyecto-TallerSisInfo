// src/pages/Header.jsx
import React, { useState, useRef, useEffect, useContext } from 'react';
import { FaBars, FaUser, FaChevronDown, FaShoppingCart } from 'react-icons/fa';
import NavBar from './navBar';
import { useBranch } from '../CONTEXTS/BranchContext';
import { useAuth } from '../GENERALCOMPONENTS/AuthContext';
import { Link } from 'react-router-dom';
import { CartContext } from '../PAGES/cart/cartContext';

const Header = () => {
  const { selectedBranch, setSelectedBranch, branches } = useBranch();
  const { user } = useAuth();
  const [showNavBar, setShowNavBar] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showBranches, setShowBranches] = useState(false);
  const navBarRef = useRef(null);
  const branchesRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const userRole = user ? user.role : null;

  const toggleNavBar = () => setShowNavBar((prev) => !prev);
  const toggleUserMenu = () => setShowUserMenu((prev) => !prev);
  const toggleBranchesMenu = () => setShowBranches((prev) => !prev);
  const closeNavBar = () => setShowNavBar(false);

  // Usa el contexto del carrito para el contador en tiempo real
  const { cartCount } = useContext(CartContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navBarRef.current && 
        !navBarRef.current.contains(event.target) &&
        toggleButtonRef.current && 
        !toggleButtonRef.current.contains(event.target)
      ) {
        setShowNavBar(false);
      }
      if (branchesRef.current && !branchesRef.current.contains(event.target)) {
        setShowBranches(false);
      }
      if (!event.target.closest(".user-menu")) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="w-full flex items-center justify-between p-4 bg-red-600 text-white shadow-lg z-50">
        <div className="flex items-center space-x-4">
          <button 
            ref={toggleButtonRef} 
            onClick={toggleNavBar} 
            className="text-3xl hover:text-yellow-300 transition-colors">
            <FaBars />
          </button>
          <Link to="/inicio" className="flex flex-col hover:text-yellow-300 transition-colors">
            <span>Sistema de Administración</span>
            <span>{selectedBranch ? selectedBranch : 'Seleccione una sucursal'}</span>
          </Link>
          <div className="relative" ref={branchesRef}>
            <button onClick={toggleBranchesMenu} className="ml-4">
              <FaChevronDown className="text-2xl hover:text-yellow-300 transition-colors" />
            </button>
            {showBranches && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg z-10">
                {branches.length > 0 ? (
                  <ul className="max-h-48 overflow-y-auto custom-scrollbar">
                    {branches.map(branch => (
                      <li 
                        key={branch._id} 
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                        onClick={() => {
                          setSelectedBranch(branch.nameBranch);
                          window.location.reload();
                        }}
                      >
                        {branch.nameBranch}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-2 text-gray-500">No hay sucursales disponibles</div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="relative flex items-center space-x-4">
          {/* Ícono de carrito con enlace a la página del carrito */}
          <Link to="/cart" className="relative text-white hover:text-yellow-300 transition-colors">
            <FaShoppingCart className="text-2xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <button 
            onClick={toggleUserMenu} 
            className="flex items-center space-x-2 bg-white text-red-600 py-1 px-3 mr-2 rounded-full shadow-md hover:bg-gray-100 transition-colors user-menu">
            <span className="text-lg font-medium">{user ? user.name : 'Usuario'}</span>
            <FaUser className="text-2xl" />
          </button>
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg z-10">
              {/* Opciones de menú de usuario */}
            </div>
          )}
        </div>
      </header>

      {showNavBar && (
        <div ref={navBarRef}>
          <NavBar closeNavBar={closeNavBar} userRole={userRole} />
        </div>
      )}
    </>
  );
};

export default Header;
