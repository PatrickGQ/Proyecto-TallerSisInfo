import { useState } from "react";

const SaleForm = () => {
  // Estado inicial con solo el nombre del producto
  const [form, setForm] = useState({
    productName: "",
  });

  // Maneja cambios en el input del nombre del producto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);  // Simula el envío mostrando solo el nombre del producto en consola
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
        <button type="submit">Registrar Venta</button>
      </form>
    </div>
  );
};

export default SaleForm;
