import { format } from 'date-fns';

const InventoryList = ({ inventories, setViewInventory }) => {
  return (
    <div className="overflow-y-auto h-96 border-t border-b">
      <div className="flex justify-between items-center p-2 bg-gray-200 font-bold">
        <span className="w-1/4">Fecha</span>
        <span className="w-1/4">Empleados</span>
        <span className="w-1/4">Pollo (kg)</span>
        <span className="w-1/4">Papas (kg)</span>
      </div>
      {inventories.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No hay inventarios disponibles</div>
      ) : (
        inventories.map((inventory) => (
          <div
            key={inventory._id}
            onClick={() => setViewInventory(inventory)}
            className="flex justify-between items-center border-b p-2 cursor-pointer hover:bg-gray-100"
          >
            <span className="w-1/4">
              {format(new Date(inventory.date), 'dd/MM/yyyy HH:mm')}
            </span>
            <span className="w-1/4">
              {inventory.employees.map(emp => emp.name).join(', ')}
            </span>
            <span className="w-1/4">
              {inventory.inventoryItems.find(item => item.category === 'Pollo(kg)')?.details.finalStock || 0}
            </span>
            <span className="w-1/4">
              {inventory.inventoryItems.find(item => item.category === 'Papas(kg)')?.details.finalStock || 0}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default InventoryList;