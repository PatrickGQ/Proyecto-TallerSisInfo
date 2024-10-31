import { FaPrint, FaEdit, FaTrashAlt } from "react-icons/fa";

const InventoryView = ({ inventory, onClose }) => {
  if (!inventory) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-6">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold mb-2">Detalles del Inventario</h2>
          <p className="text-md font-semibold text-gray-700">
            Fecha: {new Date(inventory.date).toLocaleDateString()} - 
            Hora: {new Date(inventory.date).toLocaleTimeString()}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Empleados Presentes:</h3>
          <div className="flex flex-wrap gap-2">
            {inventory.employees.map((emp, index) => (
              <span key={index} className="bg-gray-100 px-3 py-1 rounded-full">
                {emp.name}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 mt-4">
          <h3 className="text-lg font-semibold mt-4 mb-2">Items del Inventario:</h3>
          <div className="grid grid-cols-4 gap-4 font-semibold text-gray-600">
            <span>Categoría</span>
            <span>Stock Inicial</span>
            <span>Ventas</span>
            <span>Stock Final</span>
          </div>
          {inventory.inventoryItems.map((item, index) => (
            <div key={index} className={`grid grid-cols-4 gap-4 py-2 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <span>{item.category}</span>
              <span>{item.details.initialStock} kg</span>
              <span>{item.details.sales} kg</span>
              <span>{item.details.finalStock} kg</span>
            </div>
          ))}
        </div>

        {inventory.observations && (
          <div className="border-t border-gray-200 mt-4 pt-4">
            <h3 className="font-semibold mb-2">Observaciones:</h3>
            <p className="text-gray-700">{inventory.observations}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-4">
          <button className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center space-x-2">
            <FaPrint />
            <span>Imprimir</span>
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded flex items-center space-x-2">
            <FaEdit />
            <span>Editar</span>
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center space-x-2">
            <FaTrashAlt />
            <span>Eliminar</span>
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryView;