import { Routes, Route } from "react-router-dom";

import Header from "./GENERALCOMPONENTS/Header";
import { BrowserRouter as Router } from 'react-router-dom';
import RegisterProduct from "./PAGES/RegisterProduct/RegisterProduct";
import ViewProducts from './PAGES/ViewProducts/ViewProducts';
import RegisterSale from "./PAGES/RegisterSale/RegisterSale";
import RegisterEmployee from './PAGES/RegisterEmployee/RegisterEmployee';
import ViewEmployees from './PAGES/ViewEmployees/components/ViewEmployees';
import ViewSales from './PAGES/ViewSales/ViewSales';
import RegisterInventory from './PAGES/RegisterInventory/RegisterInventory';
import ViewInventory from './PAGES/ViewInventory/ViewInventory';
import { BranchProvider } from "./CONTEXTS/BranchContext";

function App() {
  return (
    <Router>
      <BranchProvider>
        <Header />
        <Routes>
          <Route path="/productos/registrar/producto" element={<RegisterProduct />} />
          <Route path="/productos/menu" element={<ViewProducts />} />
          <Route path="/sales/newSale" element={<RegisterSale />} />
          <Route path="/sales/seeSales" element={<ViewSales />} />
          <Route path="/empleados/registrar/empleado" element={<RegisterEmployee />} />
          <Route path="/empleados/ver/empleados" element={<ViewEmployees />} />
          {/* Nuevas rutas de inventario */}
          <Route path="/inventario/registrar" element={<RegisterInventory />} />
          <Route path="/inventario/ver" element={<ViewInventory />} />
        </Routes>
      </BranchProvider>
    </Router>
  );
}

export default App;