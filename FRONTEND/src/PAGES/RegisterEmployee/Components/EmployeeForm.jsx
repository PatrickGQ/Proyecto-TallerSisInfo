import { useState, useEffect, useRef } from "react";
import { FaEye, FaEyeSlash, FaChevronDown } from "react-icons/fa"; // Importa los íconos necesarios
import { useBranch } from "../../../CONTEXTS/BranchContext"; // Asegúrate de que este sea el contexto correcto

const EmployeeForm = ({ onFormChange }) => {
  const [form, setForm] = useState({
    branchName: "", // Nuevo campo para la sucursal
    name: "",
    ci: "",
    phone: "",
    email: "",
    password: "",
    contractStart: "",
    contractEnd: "",
    salary: "",
    role: "",
    photo: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showBranches, setShowBranches] = useState(false); // Estado para mostrar/ocultar el menú de sucursales
  const branchesRef = useRef(null);
  const { branches, selectedBranch, setSelectedBranch } = useBranch(); // Obtener sucursales desde el contexto

  // Manejo de clics fuera del menú de sucursales para cerrar el desplegable
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (branchesRef.current && !branchesRef.current.contains(event.target)) {
        setShowBranches(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      branchName: "",
      name: "",
      ci: "",
      phone: "",
      email: "",
      password: "",
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

        {/* Password */}
        <div>
          <label className="block text-gray-700 font-medium">Password <span className="text-red-500">*</span></label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-red-500"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 transform -translate-y-1/2">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Selección de sucursal */}
        <div className="relative" ref={branchesRef}>
          <label className="block text-gray-700 font-medium">Sucursal <span className="text-red-500">*</span></label>
          <button
            type="button"
            onClick={() => setShowBranches(!showBranches)}
            className="w-full p-2 border border-gray-300 rounded mt-1 flex items-center justify-between focus:outline-none"
          >
            {selectedBranch || "Seleccionar Sucursal"}
            <FaChevronDown />
          </button>
          {showBranches && (
            <div className="absolute w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-40 overflow-auto z-10">
              {branches.length > 0 ? (
                branches.map((branch) => (
                  <div
                    key={branch._id}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setSelectedBranch(branch.nameBranch);
                      console.log(branch.nameBranch);
                      setForm({ ...form, branchName: branch.nameBranch });
                      console.log(form);
                      setShowBranches(false);
                    }}
                  >
                    {branch.nameBranch}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2">No hay sucursales disponibles</div>
              )}
            </div>
          )}
        </div>

        {/* Fecha de Inicio del Contrato */}
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

        {/* Fecha de Fin del Contrato */}
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
          />
        </div>

        {/* Rol */}
        <div>
          <label className="block text-gray-700 font-medium">Rol <span className="text-red-500">*</span></label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-red-500"
          >
            <option value="">Seleccionar Rol</option>
            <option value="Cajero">Cajero</option>
            <option value="Cocinero">Cocinero</option>
            <option value="Mesero">Mesero</option>
          </select>
        </div>

        {/* Foto */}
        <div>
          <label className="block text-gray-700 font-medium">Foto</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-red-500"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button type="button" onClick={handleClear} className="p-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition duration-300">Limpiar</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
