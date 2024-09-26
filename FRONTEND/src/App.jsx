import { BrowserRouter as Router } from 'react-router-dom';
import RegisterProduct from "./PAGES/RegisterProduct/RegisterProduct";
import Header from "./GENERALCOMPONENTS/header";
import { Routes, Route } from "react-router-dom";
import Products from './PAGES/Products';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/productos/registrar/producto" element={<RegisterProduct />} />
        <Route path="/productos/menu" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
