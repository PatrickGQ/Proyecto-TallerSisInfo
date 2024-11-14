// src/pages/Cart.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../GENERALCOMPONENTS/AuthContext';
import { addSaleToBranchRequest } from '../../api/branch'; // Importa la función para registrar la venta

const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <div>Cargando...</div>;
  }

  const userRole = user.role;
  const [cartItems, setCartItems] = useState([]);

  // Obtener el carrito desde el `localStorage` al cargar el componente
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
  };

  const handleQuantityChange = (productId, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item._id === productId ? { ...item, quantity: parseInt(quantity) || 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  // Nueva función para manejar la compra
  const handlePurchase = async () => {

    const nameBranch = JSON.parse(localStorage.getItem('selectedBranch'));
    console.log(nameBranch);

    try {
      const saleData = {
        nameBranch,
        clientName: user.name,
        clientCI: "12345678", // Ajusta según tu implementación
        paymentMethod: "efectivo", // Ajusta según tu implementación
        saleDate: new Date().toISOString(),
        products: cartItems.map(item => ({
          productId: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        total: calculateTotal()
      };

      // Llama a la función para registrar la venta
      console.log(saleData);
      const res = await addSaleToBranchRequest(saleData);
      console.log("Venta registrada:", res);

      // Limpia el carrito después de la compra
      setCartItems([]);
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('storage'));

      alert("Venta registrada exitosamente");

    } catch (error) {
      console.error("Error al registrar la venta:", error);
      alert("Ocurrió un error al registrar la venta");
    }
  };

  return (
    <>
      {userRole === "client" && (
        <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg max-w-2xl">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Carrito de Compras</h1>

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-600">Tu carrito está vacío.</p>
          ) : (
            <div>
              <ul>
                {cartItems.map((item) => (
                  <li key={item._id} className="flex items-center justify-between mb-4 p-4 border-b border-gray-200">
                    <div className="flex items-center">
                      <img
                        src={`http://localhost:3000/uploads/${item.image}`}
                        alt={item.nameProduct}
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">{item.nameProduct}</h2>
                        <p className="text-gray-600">Precio: {item.price} BS</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                        className="w-16 p-1 border border-gray-300 rounded text-center"
                      />
                      <button
                        onClick={() => handleRemoveFromCart(item._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <div className="flex justify-between text-xl font-semibold text-gray-800 mb-4">
                  <span>Total:</span>
                  <span>{calculateTotal()} BS</span>
                </div>
                <button
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition duration-200"
                  onClick={handlePurchase} // Llama a handlePurchase
                >
                  Comprar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
