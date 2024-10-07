import { useState } from "react";

const EmployeeForm = ({ onFormChange }) => {
  const [form, setForm] = useState({
    name: "",
    ci: "",
    phone: "",
    email: "",
    contractStart: "",
    contractEnd: "",
    salary: "",
    role: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "file" ? files[0] : value,
    }));
    onFormChange({ ...form, [name]: type === "file" ? files[0] : value });
  };

  const handleClear = () => {
    setForm({
      name: "",
      ci: "",
      phone: "",
      email: "",
      contractStart: "",
      contractEnd: "",
      salary: "",
      role: "",
      photo: null,
    });
    onFormChange({});
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-h-full overflow-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Registrar Nuevo Empleado</h2>
      <form className="space-y-4">

        {/* Nombre */}
        <div>
          <label className="block text-gray-700 font-medium">Nombre <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-red-500"
          />
        </div>

        {/* CI */}
        <div>
          <label className="block text-gray-700 font-medium">CI <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="ci"
            value={form.ci}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-red-500"
          />
        </div>

        {/* Celular */}
        <div>
          <label className="block text-gray-700 font-medium">Celular <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-red-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium">Email <span className="text-red-500">*</span></label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-red-500"
          />
        </div>

        {/* Fecha de inicio y fin de contrato */}
        <div>
          <label className="block text-gray-700 font-medium">Fecha de Inicio del Contrato <span className="text-red-500">*</span></label>
          <input
            type="date"
            name="contractStart"
            value={form.contractStart}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Fecha de Fin del Contrato <span className="text-red-500">*</span></label>
          <input
            type="date"
            name="contractEnd"
            value={form.contractEnd}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-red-500"
          />
        </div>

        {/* Salario */}
        <div>
          <label className="block text-gray-700 font-medium">Salario <span className="text-red-500">*</span></label>
          <input
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-red-500"
            min="0"
          />
        </div>

        {/* Rol */}
        <div>
          <label className="block text-gray-700 font-medium">Rol <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-red-500"
          />
        </div>

        {/* Subir foto */}
        <div>
          <label className="block text-gray-700 font-medium">Subir foto</label>
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer mt-1"
          />
        </div>

        {/* Botones */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-600 text-white p-2 rounded-md font-semibold hover:bg-gray-700 transition duration-300"
          >
            Borrar Todo
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
