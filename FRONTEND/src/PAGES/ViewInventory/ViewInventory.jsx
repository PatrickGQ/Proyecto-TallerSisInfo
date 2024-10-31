import { useState } from 'react';
import SeeInventoryMenuOption from './Components/SeeInventoryMenuOption.jsx';
import ErrorModal from '../../GENERALCOMPONENTS/ErrorModal.jsx';
import TodaysInventory from './Components/TodaysInventory.jsx';
import AllInventories from './Components/AllInventories.jsx';
import InventoryByDate from './Components/InventoryByDate.jsx';
import InventoryView from './Components/InventoryView.jsx';

const ViewInventory = () => {
  const [selectedOption, setSelectedOption] = useState('allInventories');
  const [error, setError] = useState('');
  const [viewInventory, setViewInventory] = useState(null);

  return (
    <div className="p-4">
      {viewInventory && (
        <InventoryView 
          inventory={viewInventory} 
          onClose={() => setViewInventory(null)} 
        />
      )}
      <h1 className="text-2xl font-semibold mb-4">Vista de Inventarios</h1>
      <SeeInventoryMenuOption 
        setSelectedOption={setSelectedOption}
        initialOption="allInventories" // Añadido para mantener sincronizado el menú
      />
      {selectedOption === 'todaysInventory' && (
        <TodaysInventory setError={setError} />
      )}
      {selectedOption === 'allInventories' && (
        <AllInventories setError={setError} />
      )}
      {selectedOption === 'date' && (
        <InventoryByDate setError={setError} setViewInventory={setViewInventory} />
      )}
      {error && <ErrorModal error={error} />}
    </div>
  );
};

export default ViewInventory;