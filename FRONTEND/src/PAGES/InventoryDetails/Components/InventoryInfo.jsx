const InventoryInfo = ({ inventory }) => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Detalles del Inventario</h1>
            <span className={`px-3 py-1 rounded-full text-sm ${
              inventory.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {inventory.status === 'open' ? 'Abierto' : 'Cerrado'}
            </span>
          </div>
          
          <p className="text-gray-600 mt-2">
            Fecha: {new Date(inventory.date).toLocaleDateString()} - 
            Hora: {new Date(inventory.date).toLocaleTimeString()}
          </p>
        </div>
  
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Empleado Representante:</h2>
          <div className="flex flex-wrap gap-2">
            {inventory.employees.map((emp) => (
              <span 
                key={emp.employeeCi}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                {emp.name}
              </span>
            ))}
          </div>
        </div>
  
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Insumos del Inventario:</h2>
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
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Observaciones:</h2>
            <p className="text-gray-700 bg-gray-50 p-4 rounded">{inventory.observations}</p>
          </div>
        )}
      </div>
    );
};
  
export default InventoryInfo;