import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductsRequest } from '../api/product.js';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Función para obtener los productos del backend
    const fetchProducts = async () => {
      try {
        const response = await getProductsRequest();
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, []);



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Productos</h1>
     
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product, index) => (
          <div
            key={product._id}
            className={`p-4 border rounded-lg shadow-lg hover:shadow-xl cursor-pointer transform transition duration-300 ease-in-out ${
              index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
            }`}
            onClick={() => navigate(`/viewProduct/${product._id}`)}
          >
            <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-gray-600">Precio: {product.price} BS</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
