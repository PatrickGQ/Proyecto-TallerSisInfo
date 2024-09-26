const Sale = ({ sale, setViewSale }) => {
  const formattedTotalAmount = sale.totalAmount.toFixed(2); // Formatear el monto total con 2 decimales

  return (
    <div 
      onClick={() => setViewSale(sale._id)} 
      className="flex justify-between items-center border-b p-2 cursor-pointer hover:bg-gray-100"
    >
      <span className="w-1/3 truncate">{sale.client}</span>
      <span className="w-1/3 truncate">{sale.ci}</span>
      <span className="w-1/3 truncate">{formattedTotalAmount} Bs.</span> {/* Mostrar el monto total formateado */}
    </div>
  );
};

export default Sale;





