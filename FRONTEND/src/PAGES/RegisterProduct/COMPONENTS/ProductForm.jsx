import { useState } from "react";
import { registerProductRequest } from "../../../api/product.js";

const ProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: null,
    id: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
  
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "file" ? files[0] : value, // Captura correctamente el archivo
    }));
  };  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Verificar el estado antes de crear el FormData
    console.log("Formulario actual:", form);
  
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    if (form.image) formData.append("image", form.image); // Verifica si la imagen está presente
  
    console.log("Datos a enviar:", form);
  
    console.log(form);
    try {
      const res = await registerProductRequest(form);
      console.log(res);
      // Limpiar el formulario
      setForm({ name: "", price: "", image: null, id: "", description: "" });
    } catch (error) {
      console.log(error);
    }
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
        type="text"
        name="id"
        value={form.id}
        onChange={handleChange}
        required
        />
        <label>
            Descripcion <span>*</span>
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="5"   
          cols="35"  
          required
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