import ErrorModal from "../../ErrorModal";

const Invoice = ({ cartItems, client, onResetSale, handleOnConfirmSale, confirmDialog, error, setError }) => {

  const handlePrint = () => {
    window.print(); 
    onResetSale(); // Restablecer los campos y carrito después de imprimir
  };

  const confirmSale = async () => {
    const sale = {
      client: client.client,
      ci: client.ci,
      products: cartItems.map(product => ({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity
      })),
      totalAmount: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2) // Total dinámico
    };
    handleOnConfirmSale(sale);
  };

  const handleCancel = () => {
    onResetSale();
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg h-full max-h-96 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Factura</h2>
      {cartItems.length > 0 ? (
        <>
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item, index) => (
              <li key={index} className="flex items-center justify-between py-2">
                <span className="w-1/3">{item.name}</span>
                <span className="w-1/3 text-center">{item.price.toFixed(2)} Bs.</span>
                <span className="w-1/6 text-center">{item.quantity}</span>
                <span className="w-1/6 text-center">{(item.price * item.quantity).toFixed(2)} Bs.</span>
              </li>
            ))}
            <li className="flex items-center justify-between py-2 font-bold">
              <span className="w-1/3">Total</span>
              <span className="w-1/3"></span>
              <span className="w-1/6"></span>
              <span className="w-1/6 text-center">
                {cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)} Bs.
              </span>
            </li>
          </ul>
          <div className="mt-4 text-center">
            <button
              onClick={confirmSale}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Confirmar Venta
            </button>
          </div>

          {confirmDialog && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <p className="mb-4 text-lg font-semibold">Venta confirmada. ¿Desea imprimir la factura?</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handlePrint}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Sí
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
          {error && <ErrorModal error={error} setError={setError}/> }
        </>
      ) : (
        <p className="text-gray-500 text-center">No hay productos para mostrar.</p>
      )}
    </div>
  );
};

export default Invoice;
