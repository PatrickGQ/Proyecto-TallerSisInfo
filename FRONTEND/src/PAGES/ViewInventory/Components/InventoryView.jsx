import { useState } from "react";
import { FaPrint, FaEdit, FaSave } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

const InventoryView = ({ inventory, onClose, onSaveChanges }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItems, setEditedItems] = useState(inventory?.inventoryItems || []);
  const [errorMessages, setErrorMessages] = useState([]);

  if (!inventory) return null;

  const handleEditClick = () => setIsEditing(true);

  const handleInputChange = (index, field, value) => {
    const newItems = [...editedItems];
    newItems[index].details[field] = value;
    setEditedItems(newItems);
  };

  const validateAndSave = () => {
    const errors = [];

    editedItems.forEach((item) => {
      if (item.details.initialStock < 0 || item.details.sales < 0 || item.details.finalStock < 0) {
        errors.push(`Valores negativos no permitidos en el item ${item.category}.`);
      }
      if (item.details.finalStock > item.details.initialStock) {
        errors.push(`Stock final no puede ser mayor que el inicial en el item ${item.category}.`);
      }
      if (item.details.sales > item.details.initialStock) {
        errors.push(`Ventas no pueden ser mayores al stock inicial en el item ${item.category}.`);
      }
    });

    setErrorMessages(errors);

    if (errors.length === 0) {
      onSaveChanges(editedItems);
      setIsEditing(false);
      alert("Cambios guardados");
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Control de Inventario", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Pollos Don Patty", 20, 10);
    doc.text("El mejor pollo de la ciudad", 20, 16);

    // Agregar tabla de inventario sin la columna 'Detalle'
    doc.autoTable({
      startY: 40,
      head: [["Fecha", "Categoría", "Stock Inicial", "Ventas", "Stock Final"]],
      body: editedItems.map((item) => [
        new Date(inventory.date).toLocaleDateString(),
        item.category,
        `${item.details.initialStock} kg`,
        `${item.details.sales} kg`,
        `${item.details.finalStock} kg`,
      ]),
    });

    doc.save("control_de_inventario.pdf");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-6">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold mb-2">Detalles del Inventario</h2>
          <p className="text-md font-semibold text-gray-700">
            Fecha: {new Date(inventory.date).toLocaleDateString()}
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
          <div className="grid grid-cols-5 gap-4 font-semibold text-gray-600">
            <span>Fecha</span>
            <span>Categoría</span>
            <span>Stock Inicial</span>
            <span>Ventas</span>
            <span>Stock Final</span>
          </div>
          {editedItems.map((item, index) => (
            <div key={index} className={`grid grid-cols-5 gap-4 py-2 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <span>{new Date(inventory.date).toLocaleDateString()}</span>
              <span>{item.category}</span>
              {isEditing ? (
                <>
                  <input
                    type="number"
                    value={item.details.initialStock}
                    onChange={(e) => handleInputChange(index, 'initialStock', Number(e.target.value))}
                    className="px-2 border rounded"
                  />
                  <input
                    type="number"
                    value={item.details.sales}
                    onChange={(e) => handleInputChange(index, 'sales', Number(e.target.value))}
                    className="px-2 border rounded"
                  />
                  <input
                    type="number"
                    value={item.details.finalStock}
                    onChange={(e) => handleInputChange(index, 'finalStock', Number(e.target.value))}
                    className="px-2 border rounded"
                  />
                </>
              ) : (
                <>
                  <span>{item.details.initialStock} kg</span>
                  <span>{item.details.sales} kg</span>
                  <span>{item.details.finalStock} kg</span>
                </>
              )}
            </div>
          ))}
        </div>

        {errorMessages.length > 0 && (
          <div className="text-red-500 mt-4">
            {errorMessages.map((error, idx) => (
              <p key={idx}>{error}</p>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center space-x-2"
            onClick={handleDownloadPDF}
          >
            <FaPrint />
            <span>Descargar PDF</span>
          </button>
          {isEditing ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center space-x-2"
              onClick={validateAndSave}
            >
              <FaSave />
              <span>Guardar Cambios</span>
            </button>
          ) : (
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded flex items-center space-x-2"
              onClick={handleEditClick}
            >
              <FaEdit />
              <span>Editar</span>
            </button>
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
