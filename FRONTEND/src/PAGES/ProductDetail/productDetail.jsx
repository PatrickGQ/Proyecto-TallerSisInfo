// src/pages/ProductDetails.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBranch } from '../../CONTEXTS/BranchContext';
import { deleteProductRequest, getProductsByBranchRequest } from '../../api/branch';
import { CartContext } from '../cart/cartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { selectedBranch, role } = useBranch();
  const { updateCartCount } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductsByBranchRequest(selectedBranch);
        const productData = response.data.products.find((p) => p._id === id);
        setProduct(productData);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };
    fetchProduct();
  }, [id, selectedBranch]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find((item) => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); // Llama a la función para actualizar el contador
  };

  const handleEdit = () => {
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = async () => {
    try {
      await deleteProductRequest(id);
      navigate('/products');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  if (!product) return <p>Cargando...</p>;

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg max-w-lg">
      {product.image && (
        <div className="mb-6">
          <img 
            src={`http://localhost:3000/uploads/${product.image}`}
            alt={product.nameProduct} 
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>
      )}
      <h1 className="text-4xl font-semibold text-gray-900 mb-2">{product.nameProduct}</h1>
      <p className="text-2xl font-medium text-green-600 mb-4">Precio: {product.price} BS</p>
      <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

      <button
        onClick={handleAddToCart}
        className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition duration-200 mb-4"
      >
        Añadir al Carrito
      </button>

      {role === 'admin' && (
        <div className="flex space-x-4">
          <button
            onClick={handleEdit}
            className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition duration-200"
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
