import { Routes, Route } from "react-router-dom";

import Header from "./GENERALCOMPONENTS/header";
import { BrowserRouter as Router } from 'react-router-dom';
import RegisterProduct from "./PAGES/RegisterProduct/RegisterProduct";
import ViewProducts from './PAGES/ViewProducts/ViewProducts';

import RegisterSale from "./PAGES/RegisterSale/RegisterSale";

import RegisterEmployee from './PAGES/RegisterEmployee/RegisterEmployee';
import ViewEmployees from './PAGES/ViewEmployees/components/ViewEmployees';
import ViewSales from './PAGES/ViewSales/ViewSales';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/productos/registrar/producto" element={<RegisterProduct />} />
        <Route path="/productos/menu" element={<ViewProducts />} />
        <Route path="/sales/newSale" element={<RegisterSale />} />
        <Route path="/sales/seeSales" element={<ViewSales />} />
        <Route path="/empleados/registrar/empleado" element={<RegisterEmployee />} />
        <Route path="/empleados/ver/empleados" element={<ViewEmployees/>} />
      </Routes>
    </Router>
  );
}

export default App;
