import { Routes, Route, BrowserRouter, useLocation, Navigate } from "react-router-dom";
import Header from "./GENERALCOMPONENTS/Header";
import RegisterProduct from "./PAGES/RegisterProduct/RegisterProduct";
import ViewProducts from './PAGES/ViewProducts/ViewProducts';
import RegisterSale from "./PAGES/RegisterSale/RegisterSale";
import RegisterEmployee from './PAGES/RegisterEmployee/RegisterEmployee';
import ViewEmployees from './PAGES/ViewEmployees/components/ViewEmployees';
import ViewSales from './PAGES/ViewSales/ViewSales';
import { BranchProvider } from "./CONTEXTS/BranchContext";
import Login from "./PAGES/Login";
import { AuthProvider } from "./GENERALCOMPONENTS/AuthContext";

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
  return (
    <>
      {location.pathname !== '/login' && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/productos/registrar/producto" element={<RegisterProduct />} />
        <Route path="/productos/menu" element={<ViewProducts />} />
        <Route path="/sales/newSale" element={<RegisterSale />} />
        <Route path="/sales/seeSales" element={<ViewSales />} />
        <Route path="/empleados/registrar/empleado" element={<RegisterEmployee />} />
        <Route path="/empleados/ver/empleados" element={<ViewEmployees />} />
        {/* Redirigir a la página de login si la ruta no coincide */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
