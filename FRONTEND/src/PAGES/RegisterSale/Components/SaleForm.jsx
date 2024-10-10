import { useState, useEffect } from "react";
import { getProductsRequest } from '../../../api/product.js';
import { registerSaleRequest } from "../../../api/sale.js";

const SaleForm = () => {
  const [form, setForm] = useState({
    clientName: "",
    clientCI: "",
    paymentMethod: "",
    discount: 0,
    saleDate: new Date().toISOString(),
  });
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [discountMessage, setDiscountMessage] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await getProductsRequest();
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  // Nuevo useEffect para manejar descuentos
  useEffect(() => {
    // Comprobar si es jueves para aplicar descuento
    const today = new Date();
    const isThursday = today.getDay() === 2;
    
    if (isThursday) {
      setForm(prev => ({
        ...prev,
        discount: 2
      }));
      setDiscountMessage("¡Hoy es jueves! Tienes un descuento del 2% en tu compra.");
    } else {
      setDiscountMessage("");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!form.clientName.trim() || !form.clientCI.trim() || !form.paymentMethod || cart.length === 0) {
      alert("Por favor, complete todos los campos requeridos y agregue al menos un producto al carrito");
      return;
    }

    try {
        const productsData = cart.map(item => ({
            productId: item._id,
            quantity: item.quantity,
            price: item.price
        }));
        
        const saleData = {
            clientName: form.clientName,
            clientCI: form.clientCI,
            paymentMethod: form.paymentMethod,
            discount: form.discount,
            saleDate: form.saleDate,
            products: productsData,  // Ya no necesitamos JSON.stringify aquí
            total: calculateCartTotal()
        };

        console.log(saleData)

        const res = await registerSaleRequest(saleData);
        console.log("Venta registrada:", res);

        // Reset form and cart after successful submission
        setForm({
            clientName: "",
            clientCI: "",
            paymentMethod: "",
            discount: 0,
            saleDate: new Date().toISOString(),
        });
        setCart([]);
        
    } catch (error) {
        console.error("Error al registrar la venta:", error);
    }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleQuantityChange = (index, newQuantity) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index].quantity = parseInt(newQuantity);
      return updatedCart;
    });
  };

  const handleRemoveFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === product.name);
      if (existingItem) {
        return prevCart.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const calculateCartTotal = () => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const discountAmount = (form.discount / 100) * subtotal;
    return (subtotal - discountAmount).toFixed(2);
  };

  const filterProducts = (products, searchTerm) => {
    const isNumber = !isNaN(parseFloat(searchTerm)) && isFinite(searchTerm);

    return products.filter(product => {
      if (isNumber) {
        const priceStr = product.price.toString();
        return priceStr.includes(searchTerm);
      } else {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
      }
    });
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-3 gap-8">
        {/* Formulario de Venta */}
        <div className="col-span-1 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Formulario de Venta</h2>
          
          <form className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre del Cliente</label>
              <input
                type="text"
                name="clientName"
                value={form.clientName}
                onChange={handleChange}
                required
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">CI del Cliente</label>
              <input
                type="text"
                name="clientCI"
                value={form.clientCI}
                onChange={handleChange}
                required
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Buscar Producto</label>
              <input
                type="text"
                placeholder="Buscar por nombre o precio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Seleccionar Producto</label>
              <div className="flex space-x-4 overflow-x-auto py-2">
                {filterProducts(products, searchTerm).map((product) => (
                  <div
                    key={product._id}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
                    onClick={() => handleAddToCart(product)}
                  >
                    <p>{product.name}</p>
                    <p>{product.price.toFixed(2)} Bs.</p>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Carrito */}
        <div className="col-span-1 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Carrito</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">El carrito está vacío.</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrar</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.price.toFixed(2)} Bs.</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                        className="border rounded-md p-1 w-12"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleRemoveFromCart(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <hr className="my-4" />
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-lg font-semibold">{calculateCartTotal()} Bs.</p>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Método de Pago</label>
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              required
              className="mt-1 block w-full border rounded-md p-2"
            >
              <option value="">Seleccionar Método de Pago</option>
              <option value="efectivo">Efectivo</option>
              <option value="qr">QR</option>
              <option value="tarjeta">Tarjeta</option>
            </select>
          </div>
        </div>

        {/* Factura */}
        <div className="col-span-1 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Factura</h2>
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <p>{item.name}</p>
              <p>{item.quantity} x {item.price.toFixed(2)} Bs.</p>
              <p>{(item.quantity * item.price).toFixed(2)} Bs.</p>
            </div>
          ))}

          <hr className="my-4" />
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-base">Subtotal:</p>
              <p className="text-base">
                {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)} Bs.
              </p>
            </div>
            {form.discount > 0 && (
              <div className="flex justify-between items-center text-green-600">
                <p className="text-base">Descuento ({form.discount}%):</p>
                <p className="text-base">
                  -{((form.discount / 100) * cart.reduce((total, item) => total + item.price * item.quantity, 0)).toFixed(2)} Bs.
                </p>
              </div>
            )}
          </div>

          <hr className="my-4" />
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-lg font-semibold">{calculateCartTotal()} Bs.</p>
          </div>
          <button 
            onClick={handleSubmit}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md w-full hover:bg-green-600 transition duration-300"
          >
            Confirmar Venta
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaleForm;