import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBranch } from '../../CONTEXTS/BranchContext';
import { getProductsByBranchRequest } from '../../api/branch';


const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { selectedBranch } = useBranch();

  useEffect(() => {
    console.log("Prouctosssssssss", selectedBranch);
    const fetchProducts = async () => {
      try {
        const response = await getProductsByBranchRequest(selectedBranch);
        await console.log(response)
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, [selectedBranch]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const isNumber = !isNaN(lowerCaseSearchTerm);

    if (isNumber) {
      return product.price.toString().includes(lowerCaseSearchTerm);
    } else {
      return product.nameProduct.toLowerCase().includes(lowerCaseSearchTerm);
    }
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Productos</h1>
      <input
        type="text"
        placeholder="Buscar productos por nombre o precio..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-3 mb-6 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="flex flex-col border rounded-lg shadow hover:shadow-lg cursor-pointer transition-shadow duration-300"
            onClick={() => navigate(`/viewProduct/${product._id}`)}
          >
            {product.image && (
              <img 
              src={`http://localhost:3000/uploads/${product.image}`}
                alt={product.nameProduct} 
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            <hr className="border-t-2 border-gray-200" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.nameProduct}</h2>
              <p className="text-gray-600 mb-1"><strong>ID:</strong> {product.id}</p>
              <p className="text-gray-600 mb-1"><strong>Precio:</strong> {product.price} BS</p>
              <p className="text-gray-600"><strong>Descripción:</strong> {product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProducts;