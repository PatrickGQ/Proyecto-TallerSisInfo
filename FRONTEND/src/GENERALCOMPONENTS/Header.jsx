import { FaBars, FaUser, FaChevronDown } from 'react-icons/fa'; 
import { useState, useRef } from 'react';
import NavBar from './navBar';
import { useBranch } from '../CONTEXTS/BranchContext';

const Header = () => {
  const { selectedBranch, setSelectedBranch, branches } = useBranch(); // Accede al contexto de sucursales
  const [showNavBar, setShowNavBar] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showBranches, setShowBranches] = useState(false);
  
  const navBarRef = useRef(null);
  const branchesRef = useRef(null);
  
  const toggleNavBar = () => setShowNavBar(!showNavBar);
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);
  const toggleBranchesMenu = () => setShowBranches(!showBranches);

  const closeNavBar = () => setShowNavBar(false);

  useState(() => {
    const handleClickOutside = (event) => {
      if (navBarRef.current && !navBarRef.current.contains(event.target)) {
        setShowNavBar(false);
      }
      if (branchesRef.current && !branchesRef.current.contains(event.target)) {
        setShowBranches(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    // Limpiar el event listener al desmontar el componente
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
            <span>{selectedBranch ? selectedBranch : 'Seleccione una sucursal'}</span> {/* Mostrar la sucursal seleccionada */}
          </div>
          <div className="relative" ref={branchesRef}>
            <button onClick={toggleBranchesMenu} className="ml-4">
              <FaChevronDown className="text-2xl hover:text-yellow-300 transition-colors" />
            </button>
            {showBranches && (
              <div className="absolute left-0 mt-1 bg-white text-black shadow-md rounded-md z-10">
                {branches.length > 0 ? (
                  <ul className="max-h-40 overflow-auto">
                    {branches.map(branch => (
                      <li 
                        key={branch._id} 
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
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
                  <div className="px-4 py-2">No hay sucursales disponibles</div>
                )}
              </div>
            )}
          </div>
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
      {showNavBar && (
        <div ref={navBarRef}>
          <NavBar closeNavBar={closeNavBar} />
        </div>
      )}
    </>
  );
};

export default Header;
