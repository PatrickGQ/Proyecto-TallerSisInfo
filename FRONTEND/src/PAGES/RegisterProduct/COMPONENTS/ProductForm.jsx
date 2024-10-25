import { useEffect, useState } from "react";
import { addProductToBranchRequest } from "../../../api/branch.js";
import { useBranch } from "../../../CONTEXTS/BranchContext.tsx";

const ProductForm = () => {
  const { selectedBranch } = useBranch();

  useEffect(() => {
  },[selectedBranch]);

  const [form, setForm] = useState({
    nameProduct: "",
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
    try {
      const formData = new FormData();
      formData.append("nameProduct", form.nameProduct);
      formData.append("price", form.price);
      formData.append("id", form.id);
      formData.append("description", form.description);
      formData.append("nameBranch", selectedBranch)

      if (form.image) formData.append("image", form.image);

      const res = await addProductToBranchRequest(formData);
      console.log(res);

      setForm({ nameProduct: "", price: "", image: null, id: "", description: "" });
      //window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Agregar Nuevo Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-gray-700 font-medium">Nombre del Producto <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="nameProduct"
            value={form.nameProduct}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Precio <span className="text-red-500">*</span></label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            min="0"
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">ID para el producto<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="id"
            value={form.id}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Descripción <span className="text-red-500">*</span></label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="5"
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Subir imagen <span className="text-red-500">*</span></label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            required
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white p-2 rounded-md font-semibold hover:bg-red-700 transition duration-300"
        >
          Agregar Producto
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
