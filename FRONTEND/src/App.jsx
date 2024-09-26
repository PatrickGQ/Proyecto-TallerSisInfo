import { BrowserRouter as Router } from 'react-router-dom';
import RegisterProduct from "./PAGES/RegisterProduct/RegisterProduct";
import RegisterSale from "./PAGES/RegisterSale/RegisterSale";
import Header from "./GENERALCOMPONENTS/header";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/productos/registrar/producto" element={<RegisterProduct />} />
        <Route path="/ventas/registrar/venta" element={<RegisterSale />} />
      </Routes>
    </Router>
  );
}

export default App;
