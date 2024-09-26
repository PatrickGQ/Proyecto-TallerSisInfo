import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaUsers, FaReceipt } from 'react-icons/fa';

const NavBar = ({closeNavBar}) => {
  const [ventasOpen, setVentasOpen] = useState(false);
  const [productosOpen, setProductosOpen] = useState(false);

  const toggleVentas = () => {
    setVentasOpen(!ventasOpen);
  };

  const toggleProductos = () => {
    setProductosOpen(!productosOpen);
  };

  return (
    <nav className="absolute z-10 left-0 w-64 bg-red-700 text-white shadow-lg overflow-y-auto">
      <ul className="space-y-4 p-4">
        <li>
          <button
            onClick={toggleVentas}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-600 transition-colors w-full text-left">
            <FaReceipt className="text-xl" />
            <span className="font-medium">Ventas</span>
          </button>
          {ventasOpen && (
            <ul className="pl-8 space-y-2">
              <li>
                <Link
                  to="/sales/newSale"
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-600 transition-colors"
                  onClick={closeNavBar}>
                  <span>Registrar Venta</span>
                </Link>
              </li>

            </ul>
          )}
        </li>
        <li>
          <button
            onClick={toggleProductos}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-600 transition-colors w-full text-left">
            <FaBox className="text-xl" />
            <span className="font-medium">Productos</span>
          </button>
          {productosOpen && (
            <ul className="pl-8 space-y-2">
                <li>
                    <Link
                        to="/productos/registrar/producto"
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-600 transition-colors"
                        onClick={closeNavBar}>
                        <span>Registrar Producto</span>
                    </Link>
                </li>
                <li>
                    <Link
                    to="/productos/menu"
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-600 transition-colors"
                    onClick={closeNavBar}>
                    <span>Ver Productos</span>
                    </Link>
                </li>
            </ul>
          )}
        </li>
        <li>
          <Link
            to="/empleados"
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-600 transition-colors">
            <FaUsers className="text-xl" />
            <span className="font-medium">Empleados</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
