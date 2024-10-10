import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importa el estilo CSS del datepicker
import { getSalesByDateRequest } from '../../../api/sale.js'; // Asegúrate de que esta función esté definida en tu API
import SalesList from './SalesList'; // Asegúrate de que la ruta sea correcta

const SalesByDate = ({ setError, setViewSale }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [sales, setSales] = useState([]);

  const handleDateChange = async (saleDate) => {
    setSelectedDate(saleDate);
    if (saleDate) {
      const formattedDate = `${saleDate.getFullYear()}-${(saleDate.getMonth() + 1).toString().padStart(2, '0')}-${saleDate.getDate().toString().padStart(2, '0')}`;
      try {
        const response = await getSalesByDateRequest(formattedDate);
        setSales(response.data);
      } catch (error) {
        setError("Error al obtener las ventas por fecha");
        console.error("Error fetching sales by date:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Seleccionar Fecha</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        className="border rounded-md p-2 mb-4"
      />
      {sales.length > 0 ? (
        <SalesList sales={sales} setViewSale={setViewSale} />
      ) : (
        <p>No hay ventas para esta fecha.</p>
      )}
    </div>
  );
};

export default SalesByDate;
