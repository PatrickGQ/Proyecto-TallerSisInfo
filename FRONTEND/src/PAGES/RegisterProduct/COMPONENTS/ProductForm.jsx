import { useState } from "react";

const ProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm({
      ...form,
      [name]: type === "file" ? files[0] : value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
            Nombre del Producto <span>*</span>
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
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
            ID para el producto<span>*</span>
        </label>
        <input
        />
        <label>
            Descripcion <span>*</span>
        </label>
        <input
        />
          <label>
            Subir imagen <span>*</span>
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            required
          />
        <button
            type="submit">
            Agregar Producto
          </button>      
      </form>
    </div>
  );
};

export default ProductForm;