import axios from "axios";
import { API } from "../../../api/conf/routeApi";
import { useState } from "react";
import QuestionMessage from "../../../GENERALCOMPONENTS/QuestionMessage";
import AcceptMessage from "../../../GENERALCOMPONENTS/AcceptMessage";

const RegisterBranch = () => {
  const [nameBranch, setNameBranch] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [showQuestionMessage, setShowQuestionMessage] = useState(false);
  const [showAcceptMessage, setShowAcceptMessage] = useState(false);
  const [acceptMessageText, setAcceptMessageText] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${API}/branches`, {
        nameBranch,
        address,
        phone,
      });
      setAcceptMessageText(`Sucursal "${nameBranch}" creada exitosamente`);
      setShowAcceptMessage(true);
      window.location.reload();
      setNameBranch("");
      setAddress("");
      setPhone("");
    } catch (error) {
      setAcceptMessageText(
        error.response?.data?.message || "Error al registrar la sucursal"
      );
      setShowAcceptMessage(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowQuestionMessage(true);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-md w-full mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
        Registrar Sucursal
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Nombre:</label>
          <input
            type="text"
            value={nameBranch}
            onChange={(e) => setNameBranch(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Dirección:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Teléfono:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <button
          type="submit"
          className={`w-full font-semibold py-2 rounded-lg transition-colors ${
            nameBranch && address && phone
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!nameBranch || !address || !phone} // Deshabilitar si los campos están vacíos
        >
          Registrar Sucursal
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center font-medium text-green-600">{message}</p>
      )}

      {/* QuestionMessage para confirmar la creación de la sucursal */}
      {showQuestionMessage && (
        <QuestionMessage
          message={`¿Estás seguro que deseas crear esta sucursal?`}
          onConfirm={() => {
            setShowQuestionMessage(false);
            handleRegister();
          }}
          onCancel={() => setShowQuestionMessage(false)}
        />
      )}

      {/* AcceptMessage para mostrar el resultado de la creación */}
      {showAcceptMessage && (
        <AcceptMessage
          message={acceptMessageText}
          onAccept={() => setShowAcceptMessage(false)}
        />
      )}
    </div>
  );
};

export default RegisterBranch;
