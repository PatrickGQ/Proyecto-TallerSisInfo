import { format } from 'date-fns';


const Sale = ({ sale, setViewSale }) => {
  const formattedDate = format(new Date(sale.date), 'dd/MM/yyyy HH:mm');

  return (
    <div 
      onClick={() => setViewSale(sale._id)} 
      className="flex justify-between items-center border-b p-2 cursor-pointer hover:bg-gray-100"
    >
      <span className="w-1/4 truncate">{sale.client}</span>
      <span className="w-1/4 truncate">{sale.ci}</span>
      <span className="w-1/4 truncate">{sale.totalAmount}</span>
      <span className="w-1/4 truncate">{formattedDate}</span>
    </div>
  );
};

export default Sale;




