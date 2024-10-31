import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useBranch } from '../../../CONTEXTS/BranchContext';
import { getInventoryByDateAndBranchRequest } from '../../../api/branch';
import InventoryList from './InventoryList';

const InventoryByDate = ({ setError, setViewInventory }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [inventories, setInventories] = useState([]);
  const { selectedBranch } = useBranch();

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    if (date && selectedBranch) {
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      try {
        const response = await getInventoryByDateAndBranchRequest(selectedBranch, formattedDate);
        // Si la respuesta contiene un solo inventario, lo convertimos en array
        const inventoryData = response.data.inventory ? [response.data.inventory] : [];
        setInventories(inventoryData);
      } catch (error) {
        setError("Error al obtener el inventario por fecha");
        console.error("Error fetching inventory by date:", error);
      }
    }
  };

  return (
    <div className="p-4 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Buscar Inventario por Fecha</h2>
      <div className="mb-6">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          className="border rounded-md p-2 w-full max-w-xs"
          placeholderText="Seleccione una fecha"
          isClearable
        />
      </div>
      {inventories.length > 0 ? (
        <InventoryList 
          inventories={inventories}
          setViewInventory={setViewInventory}
        />
      ) : selectedDate ? (
        <div className="text-center text-gray-600">
          No se encontraron inventarios para esta fecha.
        </div>
      ) : (
        <div className="text-center text-gray-600">
          Seleccione una fecha para ver los inventarios.
        </div>
      )}
    </div>
  );
};

export default InventoryByDate;