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
import InventoryDetails from './PAGES/InventoryDetails/InventoryDetails';
import RegisterIngredient from "./PAGES/RegisterIngredient/RegisterIngredient";
import ViewIngredients from './PAGES/ViewIngredients/ViewIngredients';
import EditRecipeProduct from './PAGES/EditRecipeProduct/EditRecipeProduct';
import { BranchProvider } from "./CONTEXTS/BranchContext";
import BranchesPage from "./PAGES/Branches/BranchesPage";


function App() {
  return (
    <Router>
      <BranchProvider>
        <Header />
        <Routes>
          <Route path="/productos/registrar/producto" element={<RegisterProduct />} />
          <Route path="/productos/menu" element={<ViewProducts />} />
          <Route path="/productos/editar-receta" element={<EditRecipeProduct />} />
          <Route path="/sales/newSale" element={<RegisterSale />} />
          <Route path="/sales/seeSales" element={<ViewSales />} />
          <Route path="/empleados/registrar/empleado" element={<RegisterEmployee />} />
          <Route path="/empleados/ver/empleados" element={<ViewEmployees />} />
          <Route path="/sucursales" element={<BranchesPage />} />
          {/* Nuevas rutas de inventario */}
          <Route path="/inventario/registrar" element={<RegisterInventory />} />
          <Route path="/inventario/ver" element={<ViewInventory />} />
          <Route path="/inventario/detalles/:id" element={<InventoryDetails />} />
          <Route path="/insumos/registrar" element={<RegisterIngredient />} />
          <Route path="/insumos/ver" element={<ViewIngredients />} />
        </Routes>
      </BranchProvider>
    </Router>
  );
}

export default App;