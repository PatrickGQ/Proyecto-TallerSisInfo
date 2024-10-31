import { Routes, Route, BrowserRouter, useLocation, Navigate } from "react-router-dom";
import Header from "./GENERALCOMPONENTS/Header";
import RegisterProduct from "./PAGES/RegisterProduct/RegisterProduct";
import ViewProducts from './PAGES/ViewProducts/ViewProducts';
import RegisterSale from "./PAGES/RegisterSale/RegisterSale";
import RegisterEmployee from './PAGES/RegisterEmployee/RegisterEmployee';
import ViewEmployees from './PAGES/ViewEmployees/components/ViewEmployees';
import ViewSales from './PAGES/ViewSales/ViewSales';
import RegisterInventory from './PAGES/RegisterInventory/RegisterInventory';
import ViewInventory from './PAGES/ViewInventory/ViewInventory';
import { BranchProvider } from "./CONTEXTS/BranchContext";
import Login from "./PAGES/Login";
import { AuthProvider, useAuth } from "./GENERALCOMPONENTS/AuthContext"; // Asegúrate de importar useAuth
import BranchesPage from "./PAGES/Branches/BranchesPage";

// Componente que verifica si el usuario está autenticado
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth(); // Obteniendo el estado de autenticación

  if (loading) return <div>Cargando...</div>; // Muestra un loader mientras se verifica la autenticación

  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BranchProvider>
          <Main />
        </BranchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

function Main() {
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth(); // Aquí también puedes obtener el estado de autenticación

  if (loading) return <div>Cargando...</div>; // Muestra un loader mientras se verifica la autenticación

  // Si el usuario no está autenticado y está accediendo a una página diferente de /login, redirige a /login
  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {location.pathname !== '/login' && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Rutas protegidas */}
        <Route path="/productos/registrar/producto" element={<PrivateRoute><RegisterProduct /></PrivateRoute>} />
        <Route path="/productos/menu" element={<PrivateRoute><ViewProducts /></PrivateRoute>} />
        <Route path="/sales/newSale" element={<PrivateRoute><RegisterSale /></PrivateRoute>} />
        <Route path="/sales/seeSales" element={<PrivateRoute><ViewSales /></PrivateRoute>} />
        <Route path="/empleados/registrar/empleado" element={<PrivateRoute><RegisterEmployee /></PrivateRoute>} />
        <Route path="/empleados/ver/empleados" element={<PrivateRoute><ViewEmployees /></PrivateRoute>} />
        <Route path="/sucursales" element={<PrivateRoute><BranchesPage /></PrivateRoute>} />
        {/* Nuevas rutas de inventario */}
        <Route path="/inventario/registrar" element={<PrivateRoute><RegisterInventory /></PrivateRoute>} />
        <Route path="/inventario/ver" element={<PrivateRoute><ViewInventory /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
