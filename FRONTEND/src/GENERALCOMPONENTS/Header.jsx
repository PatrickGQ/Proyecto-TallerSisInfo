import { FaBars, FaUser, FaChevronDown, FaShoppingCart } from 'react-icons/fa';
import { useContext, useState, useRef, useEffect } from 'react';
import NavBar from './NavBar';
import { useAuth } from '../GENERALCOMPONENTS/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useBranch } from '../CONTEXTS/BranchContext';
import { CartContext } from '../PAGES/cart/cartContext';

const Header = () => {
  const [showNavBar, setShowNavBar] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showBranches, setShowBranches] = useState(false);

  const { user, logOut, isLoading } = useAuth();
  const { selectedBranch, setSelectedBranch, branches } = useBranch();
  const navigate = useNavigate();
  const { cartCount } = useContext(CartContext);

  const toggleNavBar = () => {
    setShowNavBar(prevState => !prevState);
  };

  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);
  const toggleBranchesMenu = () => setShowBranches(!showBranches);

  const closeNavBar = () => setShowNavBar(false);

  const handleLogoutClick = async () => {
    try {
      await logOut();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch.nameBranch);
    setShowBranches(false); 
  };

  const userRole = user ? user.role : null;

  if (isLoading) return <div>Cargando...</div>;



  return (
    <>
      {(userRole === "admin" || userRole === "client" || userRole === "worker") && (
        <header className="flex items-center justify-between p-4 bg-red-600 text-white shadow-lg">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleNavBar} 
              className="text-3xl hover:text-yellow-300 transition-colors"
            >
              <FaBars />
            </button>
            <Link to="/inicio" className="text-2xl font-semibold hover:text-yellow-300 transition-colors">
              Sistema de Administración
            </Link>
            <div className="relative">
              <button onClick={toggleBranchesMenu} className="ml-4">
                <FaChevronDown className="text-2xl hover:text-yellow-300 transition-colors" />
              </button>
              {showBranches && (
                <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg z-10">
                  {branches.length > 0 ? (
                    <ul className="max-h-48 overflow-y-auto custom-scrollbar">
                      {branches.map((branch) => (
                        <li key={branch._id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors" onClick={() => handleBranchSelect(branch)}>
                          {branch.nameBranch}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-2 text-gray-500">
                      No hay sucursales disponibles
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="relative flex items-center space-x-4">
            {userRole === "client" && (
              <Link to="/cart" className="relative text-white hover:text-yellow-300 transition-colors">
                <FaShoppingCart className="text-2xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            <button onClick={toggleUserMenu} className="flex items-center space-x-2 bg-white text-red-600 py-1 px-3 mr-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
              <span className="text-lg font-medium">{user.name}</span>
              <FaUser className="text-2xl" />
            </button>
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white text-red-600 shadow-lg rounded-lg z-10">
                <ul>
                  <li className="px-4 py-2 hover:bg-red-100 cursor-pointer rounded-t-lg">
                    <Link to="/profile">Ver Usuario</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-red-100 cursor-pointer rounded-b-lg" onClick={handleLogoutClick}>
                    Cerrar Sesión
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
      )}
      {showNavBar && (
        <NavBar closeNavBar={closeNavBar} userRole={userRole} />
      )}
    </>
  );
};

export default Header;
