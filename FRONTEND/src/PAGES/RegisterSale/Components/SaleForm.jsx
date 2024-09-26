import { useState } from "react";

const SaleForm = () => {
  const [form, setForm] = useState({
    productName: "",  // Estado inicial con el nombre del producto
    quantity: 1,      // Estado inicial para la cantidad del producto
    price: 0,         // Estado inicial para el precio del producto
    discount: 0,      // Estado inicial para el descuento aplicado
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
    console.log(form);  // Mostrar nombre, cantidad, precio y descuento en la consola al enviar
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

        <label>
          Precio <span>*</span>
        </label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <label>
          Descuento aplicado <span>*</span>
        </label>
        <input
          type="number"
          name="discount"
          value={form.discount}
          onChange={handleChange}
          required
        />

        <button type="submit">Registrar Venta</button>
      </form>
    </div>
  );
};

export default SaleForm;
