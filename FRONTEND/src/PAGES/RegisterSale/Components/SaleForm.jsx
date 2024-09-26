import { useState } from "react";

const SaleForm = () => {
  const [form, setForm] = useState({
    productName: "",  // Estado inicial con el nombre del producto
    quantity: 1,      // Estado inicial para la cantidad del producto
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value, 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);  // Mostrar los detalles del producto y la cantidad en la consola al enviar
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del Producto <span>*</span>
        </label>
        <input
          type="text"
          name="productName"
          value={form.productName}
          onChange={handleChange}
          required
        />

        <label>
          Cantidad <span>*</span>
        </label>
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />

        <button type="submit">Registrar Venta</button>
      </form>
    </div>
  );
};

export default SaleForm;
