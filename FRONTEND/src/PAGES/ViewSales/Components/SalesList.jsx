import Sale from './Sale';
import { Link } from 'react-router-dom';

const SalesList = ({ sales, setViewSale }) => {
  return (
    <div className="overflow-y-auto h-96 border-t border-b">
      <div className="flex justify-between items-center p-2 bg-gray-200 font-bold">
        <span className="w-1/4">Cliente</span>
        <span className="w-1/4">CI</span>
        <span className="w-1/4">Monto Total</span>
        <span className="w-1/4">Fecha</span>
      </div>
      {sales.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No hay ventas disponibles</div>
      ) : (
        sales.map((sale) => (
          <Link key={sale._id} to={`/sales/seeSales/viewSale/${sale._id}`}>
            <Sale key={sale._id} sale={sale} setViewSale={setViewSale} />
          </Link>
        ))
      )}
    </div>
  );
};

export default SalesList;
