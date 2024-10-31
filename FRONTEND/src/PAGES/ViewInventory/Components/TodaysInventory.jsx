import { useState, useEffect } from 'react';
import { FaSync } from 'react-icons/fa';
import SearchBarInventory from './SearchBarInventory';
import InventoryList from './InventoryList';
import LoadingMessage from '../../../GENERALCOMPONENTS/LoandingMessage';
import { useBranch } from '../../../CONTEXTS/BranchContext';
import { getCurrentDayInventoryByBranchRequest } from '../../../api/branch';

const TodaysInventory = ({ setError, setViewInventory }) => {
  const [inventory, setInventory] = useState(null);
  const [filteredInventory, setFilteredInventory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedBranch } = useBranch();

  const fetchTodaysInventory = async () => {
    try {
      if (!selectedBranch) {
        setError('Por favor seleccione una sucursal');
        return;
      }
      const res = await getCurrentDayInventoryByBranchRequest(selectedBranch);
      setInventory(res.data.inventory ? [res.data.inventory] : []);
      setFilteredInventory(res.data.inventory ? [res.data.inventory] : []);
    } catch (error) {
      console.error(error);
      setError('Error al cargar el inventario del día');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodaysInventory();
  }, [selectedBranch]);

  const handleSearch = (query) => {
    if (!inventory) return;
    
    const searchLower = query.toLowerCase();
    if (!query) {
      setFilteredInventory(inventory);
      return;
    }

    const filtered = inventory.filter(inv => {
      const employeeMatch = inv.employees.some(emp => 
        emp.name.toLowerCase().includes(searchLower)
      );
      const dateMatch = new Date(inv.date)
        .toLocaleDateString()
        .includes(searchLower);
      
      return employeeMatch || dateMatch;
    });

    setFilteredInventory(filtered);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    fetchTodaysInventory();
  };

  if (isLoading) {
    return <LoadingMessage />;
  }

  const today = new Date();
  const formattedDate = today.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="p-4 shadow-lg rounded-lg bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">
          Inventario de Hoy
          <span className="ml-2 text-lg text-gray-600">({formattedDate})</span>
        </h2>
        <button onClick={handleRefresh} className="text-blue-500 hover:text-blue-700">
          <FaSync className="text-2xl" />
        </button>
      </div>
      <SearchBarInventory onSearch={handleSearch} />
      {filteredInventory && filteredInventory.length > 0 ? (
        <InventoryList 
          inventories={filteredInventory} 
          setViewInventory={setViewInventory}
        />
      ) : (
        <p className="text-center text-gray-500">No hay inventario registrado para hoy</p>
      )}
    </div>
  );
};

export default TodaysInventory;