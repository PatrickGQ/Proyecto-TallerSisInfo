import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaUsers, FaReceipt, FaBuilding, FaClipboardList } from 'react-icons/fa';

const NavBar = ({ closeNavBar, userRole }) => {
  const [ventasOpen, setVentasOpen] = useState(false);
  const [productosOpen, setProductosOpen] = useState(false);
  const [empleadosOpen, setEmpleadosOpen] = useState(false);
  const [sucursalesOpen, setSucursalesOpen] = useState(false);
  const [inventarioOpen, setInventarioOpen] = useState(false);

  const toggleVentas = () => setVentasOpen(!ventasOpen);
  const toggleProductos = () => setProductosOpen(!productosOpen);
  const toggleEmpleados = () => setEmpleadosOpen(!empleadosOpen);
  const toggleSucursales = () => setSucursalesOpen(!sucursalesOpen);
  const toggleInventario = () => setInventarioOpen(!inventarioOpen);

  return (
    <nav className="absolute z-40 left-0 w-64 bg-red-700 text-white shadow-lg overflow-y-auto">
      <ul className="space-y-4 p-4">

        {/* Ventas visible solo para admin y worker */}
        {(userRole === 'admin' || userRole === 'worker') && (
          <li>
            <button onClick={toggleVentas} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-600 transition-colors w-full text-left">
              <FaReceipt className="text-xl" />
              <span className="font-medium">Ventas</span>
            </button>
            {ventasOpen && (
              <ul className="pl-8 space-y-2">
                <li>
                  <Link to="/sales/newSale" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-600 transition-colors" onClick={closeNavBar}>
                    <span>Registrar Venta</span>
                  </Link>
                </li>
                <li>
                  <Link to="/sales/seeSales" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-600 transition-colors" onClick={closeNavBar}>
                    <span>Ver Ventas</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        )}

        {/* Inventario visible solo para admin y worker */}
        {(userRole === 'admin' || userRole === 'worker') && (
          <li>
            <button onClick={toggleInventario} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-600 transition-colors w-full text-left">
              <FaClipboardList className="text-xl" />
              <span className="font-medium">Inventario</span>
            </button>
            {inventarioOpen && (
              <ul className="pl-8 space-y-2">
                <li>
                  <Link to="/inventario/registrar" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-600 transition-colors" onClick={closeNavBar}>
                    <span>Registrar Inventario</span>
                  </Link>
                </li>
                <li>
                  <Link to="/inventario/ver" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-600 transition-colors" onClick={closeNavBar}>
                    <span>Ver Inventarios</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        )}

        {/* Productos visibles para todos los roles, pero registrar solo para admin y worker */}
        <li>
          <button onClick={toggleProductos} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-600 transition-colors w-full text-left">
            <FaBox className="text-xl" />
            <span className="font-medium">Productos</span>
          </button>
          {productosOpen && (
            <ul className="pl-8 space-y-2">
              {userRole === 'admin' || userRole === 'worker' ? ( // Mostrar opciones de registrar solo para admin y worker
                <>
                  <li>
                    <Link to="/productos/registrar/producto" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-600 transition-colors" onClick={closeNavBar}>
                      <span>Registrar Producto</span>
                    </Link>
                  </li>
                </>
              ) : null} 
              <li>
                <Link to="/productos/menu" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-600 transition-colors" onClick={closeNavBar}>
                  <span>Ver Productos</span>
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Empleados visible solo para admin */}
        {userRole === 'admin' && (
          <li>
            <button onClick={toggleEmpleados} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-600 transition-colors w-full text-left">
              <FaUsers className="text-xl" />
              <span className="font-medium">Empleados</span>
            </button>
            {empleadosOpen && (
              <ul className="pl-8 space-y-2">
                <li>
                  <Link to="/empleados/registrar/empleado" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-600 transition-colors" onClick={closeNavBar}>
                    <span>Registrar Empleado</span>
                  </Link>
                </li>
                <li>
                  <Link to="/empleados/ver/empleados" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-600 transition-colors" onClick={closeNavBar}>
                    <span>Ver Empleados</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        )}

        {/* Sucursales visible solo para admin */}
        {userRole === 'admin' && (
          <li>
            <button onClick={toggleSucursales} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-600 transition-colors w-full text-left">
              <FaBuilding className="text-xl" />
              <span className="font-medium">Sucursales</span>
            </button>
            {sucursalesOpen && (
              <ul className="pl-8 space-y-2">
                <li>
                  <Link to="/sucursales" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-600 transition-colors" onClick={closeNavBar}>
                    <span>Ver Sucursales</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
