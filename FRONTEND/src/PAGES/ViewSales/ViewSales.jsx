import { useState } from 'react';
import SeeSalesMenuOption from './Components/SeeSalesMenuOption.jsx';
import ErrorModal from '../../GENERALCOMPONENTS/ErrorModal.jsx';
import TodaysSales from './Components/TodaysSales.jsx';
import AllSales from './Components/AllSales.jsx';
import SalesByDate from './Components/SalesByDate.jsx'; // Importa el nuevo componente
import { getAllSalesRequest, getSaleRequest, getTodaySalesRequest } from '../../api/sale.js';
import SaleView from './Components/SaleView.jsx'; // Asegúrate de que también importes SaleView si lo necesitas

const SeeSales = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState('');
  const [viewSale, setViewSale] = useState(null);

  const getTodaysSales = async () => {
    try {
      const res = await getTodaySalesRequest();
      console.log(res);
      return res;
    } catch (error) {
      setError("Error al obtener las ventas del día."); // Maneja el error adecuadamente
      console.error(error);
    }
  };

  const getAllSales = async () => {
    try {
      const res = await getAllSalesRequest();
      return res;
    } catch (error) {
      setError("Error al obtener todas las ventas."); // Maneja el error adecuadamente
      console.error(error);
    }
  };

  const getSale = async (saleID) => {
    try {
      const res = await getSaleRequest(saleID);
      setViewSale(res.data);
      return res;
    } catch (error) {
      setError("Error al obtener la venta."); // Maneja el error adecuadamente
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      {viewSale && <SaleView sale={viewSale} onClose={() => setViewSale(null)} />}
      <h1 className="text-2xl font-semibold mb-4">Vista de Ventas</h1>
      <SeeSalesMenuOption setSelectedOption={setSelectedOption} />
      {selectedOption === 'todaysSales' && (
        <TodaysSales 
          setError={setError} 
          getTodaysSales={getTodaysSales}
          setViewSale={getSale}
        />
      )}
      {selectedOption === 'allSales' && (
        <AllSales 
          setError={setError} 
          getAllSales={getAllSales}
          setViewSale={getSale}
        />
      )}
      {selectedOption === 'date' && (
        <SalesByDate setError={setError} setViewSale={setViewSale} />
      )}
      {error && <ErrorModal error={error} />}
    </div>
  );
};

export default SeeSales;
