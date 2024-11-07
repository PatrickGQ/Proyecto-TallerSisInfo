const PrintInventory = ({ inventory, onClose }) => {
    return (
      <div className="bg-white p-8 print:p-4">
        {/* Implementar vista de impresión */}
        <div className="print:hidden mt-6 flex justify-end">
          <button
            onClick={() => {
              window.print();
              onClose();
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Imprimir
          </button>
        </div>
      </div>
    );
};

export default PrintInventory;