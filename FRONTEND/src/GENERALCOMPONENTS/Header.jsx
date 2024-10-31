import { FaBars, FaUser, FaChevronDown } from 'react-icons/fa'; 
import { useState, useRef, useEffect } from 'react';
import NavBar from './navBar';
import { useBranch } from '../CONTEXTS/BranchContext';
import { useAuth } from '../GENERALCOMPONENTS/AuthContext';

const Header = () => {
  const { selectedBranch, setSelectedBranch, branches } = useBranch();
  const { user } = useAuth(); // Accede al contexto de autenticación para obtener el usuario
  const [showNavBar, setShowNavBar] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showBranches, setShowBranches] = useState(false);
  
  const navBarRef = useRef(null);
  const branchesRef = useRef(null);
  const userRole = user ? user.role : null;
  const toggleNavBar = () => setShowNavBar(!showNavBar);
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);
  const toggleBranchesMenu = () => setShowBranches(!showBranches);

  const closeNavBar = () => setShowNavBar(false);

  console.log('Rol del usuario:', userRole);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navBarRef.current && !navBarRef.current.contains(event.target)) {
        setShowNavBar(false);
      }
      if (branchesRef.current && !branchesRef.current.contains(event.target)) {
        setShowBranches(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-red-600 text-white shadow-lg">
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleNavBar} 
            className="text-3xl hover:text-yellow-300 transition-colors">
            <FaBars />
          </button>
          <div className="flex flex-col">
            <span>Sistema de Administración</span>
            <span>{selectedBranch ? selectedBranch : 'Seleccione una sucursal'}</span>
          </div>
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
          <button 
            onClick={toggleUserMenu} 
            className="flex items-center space-x-2 bg-white text-red-600 py-1 px-3 mr-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <span className="text-lg font-medium">{user ? user.name : 'Usuario'}</span>
            <FaUser className="text-2xl" />
          </button>
        </div>
      </header>
      {showNavBar && (
        <div ref={navBarRef}>
          {/* Pasa el role a NavBar */}
          <NavBar closeNavBar={closeNavBar} userRole={user ? user.role : null} />
        </div>
      )}
    </>
  );
};

export default Header;
