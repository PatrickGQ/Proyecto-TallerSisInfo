import { useState } from "react";
import { FaPrint, FaEdit, FaSave } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

const InventoryView = ({ inventory, onClose, onSaveChanges }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItems, setEditedItems] = useState(inventory?.inventoryItems || []);
  const [errorMessages, setErrorMessages] = useState([]);

  if (!inventory) return null;

  const calculateMovementsSummary = (ingredients) => {
    return ingredients.reduce((acc, curr) => {
      const sales = curr.movements.reduce((total, movement) => {
        if (movement.type === 'sale') {
          return total + movement.quantity;
        }
        return total;
      }, 0);
      
      return {
        ...acc,
        [curr.name]: {
          initial: curr.initialStock,
          final: curr.finalStock,
          sales,
        }
      };
    }, {});
  };

  const movementsSummary = calculateMovementsSummary(inventory.ingredients);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl p-6 my-8">
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Detalles del Inventario</h2>
            <span className={`px-3 py-1 rounded-full text-sm ${
              inventory.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {inventory.status === 'open' ? 'Abierto' : 'Cerrado'}
            </span>
          </div>
          <p className="text-md text-gray-700 mt-2">
            Fecha: {new Date(inventory.date).toLocaleDateString()} - 
            Hora: {new Date(inventory.date).toLocaleTimeString()}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Empleado Representante:</h3>
          <div className="flex flex-wrap gap-2">
            {inventory.employees.map((emp, index) => (
              <span key={index} className="bg-gray-100 px-3 py-1 rounded-full">
                {emp.name}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 mt-4">
          <h3 className="text-lg font-semibold mt-4 mb-2">Insumos del Inventario:</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ingrediente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock Inicial
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock Final
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ventas
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inventory.ingredients.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.initialStock} kg</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.finalStock} kg</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {(item.initialStock - item.finalStock).toFixed(2)} kg
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {inventory.observations && (
          <div className="border-t border-gray-200 mt-4 pt-4">
            <h3 className="font-semibold mb-2">Observaciones:</h3>
            <p className="text-gray-700 bg-gray-50 p-3 rounded">{inventory.observations}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-4">
          <button 
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center space-x-2"
            onClick={() => window.print()}
          >
            <FaPrint />
            <span>Descargar PDF</span>
          </button>
          {inventory.status === 'open' && (
            <>
              <button className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded flex items-center space-x-2">
                <FaEdit />
                <span>Editar</span>
              </button>
            </>
          )}
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
