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
      [name]: type === "file" ? files[0] : value,
    }));
  };  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    console.log("Formulario actual:", form);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("id", form.id);
      formData.append("description", form.description);

      if (form.image) formData.append("image", form.image);

      const res = await registerProductRequest(formData);
      console.log(res);

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
        <br />
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br />
        <label>
            Precio <span>*</span>
        </label>
        <br />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <br />
        <label>
            ID para el producto<span>*</span>
        </label>
        <br />
        <input
        type="text"
        name="id"
        value={form.id}
        onChange={handleChange}
        required
        />
        <br />
        <label>
            Descripcion <span>*</span>
        </label>
        <br />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="5"   
          cols="35"  
          required
        />
        <br />
        <label>
          Subir imagen <span>*</span>
        </label>
        <br />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          required
        />
        <br />
        <button
          type="submit">
          Agregar Producto
        </button>      
      </form>
    </div>
  );
};

export default ProductForm;