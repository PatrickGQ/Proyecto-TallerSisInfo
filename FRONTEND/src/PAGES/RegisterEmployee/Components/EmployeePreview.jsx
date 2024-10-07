import { useEffect, useState } from "react";
import { registerEmployee } from "../../../../../BACKEND/controllers/employees.controller";

const EmployeePreview = ({ form }) => {
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Verifica si todos los campos requeridos están completos
  useEffect(() => {
    const requiredFields = ["name", "ci", "phone", "email", "contractStart", "contractEnd", "salary", "role"];
    const isComplete = requiredFields.every(field => form[field] && form[field] !== "");

    // Si la foto es obligatoria, incluirla en la verificación
    if (form.photo) {
      setIsFormComplete(isComplete && form.photo);
    } else {
      setIsFormComplete(isComplete);
    }
  }, [form]);

  const handleSaveEmployee = async () => {
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Preparamos el objeto de datos a enviar
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("ci", form.ci);
      formData.append("phone", form.phone);
      formData.append("email", form.email);
      formData.append("contractStart", form.contractStart);
      formData.append("contractEnd", form.contractEnd);
      formData.append("salary", form.salary);
      formData.append("role", form.role);

      // Si hay foto, la añadimos al formData
      if (form.photo) formData.append("image", form.photo);

      console.log(isFormComplete)
      // Hacemos la petición POST al servidor usando formData
      const response = await registerEmployee(isFormComplete); // <-- Aquí debes pasar formData

      if (!response.ok) {
        throw new Error("Error al guardar el empleado");
      }

      setSuccessMessage("Empleado guardado exitosamente");
      setIsSubmitting(false);
    } catch (error) {
      setErrorMessage("Hubo un problema al guardar el empleado");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 shadow-lg rounded-lg max-h-full overflow-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Vista Previa del Empleado</h2>

      {form.name && <p><strong>Nombre:</strong> {form.name}</p>}
      {form.ci && <p><strong>CI:</strong> {form.ci}</p>}
      {form.phone && <p><strong>Celular:</strong> {form.phone}</p>}
      {form.email && <p><strong>Email:</strong> {form.email}</p>}
      {form.contractStart && <p><strong>Fecha Inicio:</strong> {form.contractStart}</p>}
      {form.contractEnd && <p><strong>Fecha Fin:</strong> {form.contractEnd}</p>}
      {form.salary && <p><strong>Salario:</strong> {form.salary}</p>}
      {form.role && <p><strong>Rol:</strong> {form.role}</p>}
      {form.photo && (
        <div>
          <strong>Foto del Empleado:</strong>
          <img src={URL.createObjectURL(form.photo)} alt="Foto del empleado" className="mt-4 h-40 w-40 object-cover rounded-lg" />
        </div>
      )}

      <button
        onClick={handleSaveEmployee}
        disabled={!isFormComplete || isSubmitting}
        className={`mt-6 w-full p-2 rounded-md font-semibold transition duration-300 ${
          isFormComplete && !isSubmitting ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-400 text-gray-200 cursor-not-allowed"
        }`}
      >
        {isSubmitting ? "Guardando..." : "Guardar Empleado"}
      </button>

      {/* Mostrar mensajes de éxito o error */}
      {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default EmployeePreview;
