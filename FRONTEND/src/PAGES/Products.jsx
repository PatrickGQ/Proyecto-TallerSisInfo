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

  // Función para manejar la búsqueda
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrar productos según el término de búsqueda
  const filteredProducts = products.filter((product) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const isNumber = !isNaN(lowerCaseSearchTerm);

    if (isNumber) {
      return product.price.toString().includes(lowerCaseSearchTerm);
    } else {
      return product.name.toLowerCase().includes(lowerCaseSearchTerm);
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
            <p className="text-gray-600">Descripción: {product.description}</p>
            {product.image && (
              <img 
              src={`http://localhost:3000/uploads/${product.image}`} // Cambia 'localhost:puerto' por tu dominio y puerto
              alt={product.name} 
              style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
            />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
