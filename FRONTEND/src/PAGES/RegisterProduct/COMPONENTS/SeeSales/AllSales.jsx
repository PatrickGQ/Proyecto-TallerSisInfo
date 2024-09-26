import { useState, useEffect } from 'react';
import { FaSync } from 'react-icons/fa';
import SearchSaleBar from './SearchBarSale';
import SalesList from './SalesList';
import LoadingMessage from '../../LoandingMessage';

const TodaysSales = ({ setError, getAllSales, setViewSale }) => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllSales = async () => {
    try {
      const res = await getAllSales();
      console.log(res);
      setSales(res.data);
      setFilteredSales(res.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSales();
  }, []);

  const handleSearch = (query) => {
    const filtered = sales.filter((sale) => {
      const lowerCaseQuery = query.toLowerCase();
      const matchesClient = sale.client.toLowerCase().includes(lowerCaseQuery);
      const matchesCI = sale.ci.toLowerCase().includes(lowerCaseQuery);
      const matchesTotalAmount = sale.totalAmount.toString().includes(lowerCaseQuery);
  
      return matchesClient || matchesCI || matchesTotalAmount;
    });
  
    setFilteredSales(filtered);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    fetchAllSales();
  };

  if (isLoading) {
    return <LoadingMessage />;
  }

  return (
    <div className="p-4 shadow-lg rounded-lg bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">
          Todas las ventas
        </h2>
        <button onClick={handleRefresh} className="text-blue-500 hover:text-blue-700">
          <FaSync className="text-2xl" />
        </button>
      </div>
      <SearchSaleBar onSearch={handleSearch} />
      <SalesList sales={filteredSales} setViewSale={setViewSale} />
    </div>
  );
};

export default TodaysSales;
