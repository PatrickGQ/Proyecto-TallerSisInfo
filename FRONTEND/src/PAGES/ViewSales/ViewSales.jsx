import { useState } from 'react';
import SeeSalesMenuOption from './Components/SeeSalesMenuOption.jsx';
import ErrorModal from '../../GENERALCOMPONENTS/ErrorModal.jsx';
import TodaysSales from './Components/TodaysSales.jsx';
import AllSales from './Components/AllSales.jsx';
import { getAllSalesRequest, getSaleRequest, getTodaySalesRequest } from '../../api/sale.js'

const SeeSales = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState('');
  const [ viewSale, setViewSale ] = useState(null);

  const getTodaysSales = async() =>{
    try {
        const res = await getTodaySalesRequest();
        console.log(res)
        return res;
    } catch (error) {
        return error;
    }
  }

  const getAllSales = async () => {
    try {
      const res = await getAllSalesRequest();
      return res;
    } catch (error) {
      return error;
    }
  }

  const getSale = async(saleID) => {
    try {
        const res = await getSaleRequest(saleID);
        setViewSale(res.data)
        return res;
    } catch (error) {
        return error;
    }
  }

  return (
    <div className="p-4">
      {viewSale && ( <SaleView sale={viewSale} onClose={() => setViewSale(null)}/> )}
      <h1 className="text-2xl font-semib+old mb-4">Vista de Ventas</h1>
      <SeeSalesMenuOption setSelectedOption={setSelectedOption} />
      {selectedOption === 'todaysSales' && 
        <TodaysSales 
            setError={setError} 
            getTodaysSales={getTodaysSales}
            setViewSale={getSale}
        >
        </TodaysSales>
      }
      {selectedOption === 'allSales' && 
        <AllSales 
            setError={setError} 
            getAllSales={getAllSales}
            setViewSale={getSale}
        >
        </AllSales>
      }
      {error && (
        <ErrorModal error={error}></ErrorModal>
      )}
    </div>
  );
};

export default SeeSales;
