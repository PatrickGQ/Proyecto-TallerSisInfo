import { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { deleteBranchRequest, getBranchsRequest } from '../../../api/branch';
import AcceptMessage from '../../../GENERALCOMPONENTS/AcceptMessage';
import QuestionMessage from '../../../GENERALCOMPONENTS/QuestionMessage';


const BranchList = () => {
  const [branches, setBranches] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null); // Estado para almacenar la sucursal seleccionada para eliminar

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await getBranchsRequest();
        setBranches(response.data);
      } catch (error) {
        setErrorMessage('Error al obtener las sucursales');
        console.error('Error al obtener las sucursales:', error);
      }
    };
    fetchBranches();
  }, []);

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      const resp = await deleteBranchRequest(id);
      setBranches(branches.filter(branch => branch._id !== id)); // Eliminar la sucursal de la lista
      setSuccessMessage('Sucursal eliminada exitosamente');
      setIsDeleting(false);
    } catch (error) {
      setErrorMessage('Error al eliminar la sucursal');
      setIsDeleting(false);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedBranch) {
      handleDelete(selectedBranch._id);
      setSelectedBranch(null); 
    }
  };

  const handleCancelDelete = () => {
    setIsDeleting(false);
    setSelectedBranch(null); // Cancelar y limpiar la sucursal seleccionada
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Sucursales Creadas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {branches.map((branch) => (
          <Link
            key={branch._id}
            to={`/sucursal/${branch._id}`}
            className="bg-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition-all"
          >
            <h3 className="text-xl font-semibold text-gray-800">{branch.nameBranch}</h3>
            <p className="mt-2 text-gray-600">{branch.address}</p>
            <p className="mt-2 text-gray-500">{branch.phone}</p>

            {/* Contenedor de los botones de edición y eliminación */}
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => alert(`Editar sucursal ${branch.nameBranch}`)}
                className="text-yellow-500 hover:text-yellow-700"
              >
                <FaEdit className="text-xl" />
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedBranch(branch); // Almacenar la sucursal seleccionada
                  setIsDeleting(true); // Activar la confirmación de eliminación
                }}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrashAlt className="text-xl" />
              </button>
            </div>
          </Link>
        ))}
      </div>

      {/* Mensajes de error y éxito */}
      {errorMessage && (
        <AcceptMessage
          message={errorMessage}
          onAccept={() => setErrorMessage('')}
        />
      )}

      {successMessage && (
        <AcceptMessage
          message={successMessage}
          onAccept={() => {
            setSuccessMessage('');
            window.location.reload(); // Recargar la página al aceptar
          }}
        />
      )}

      {/* Mensaje de confirmación antes de eliminar */}
      {isDeleting && selectedBranch && (
        <QuestionMessage
          message="¿Estás seguro de que deseas eliminar esta sucursal?"
          onConfirm={handleConfirmDelete} // Confirmar eliminación
          onCancel={handleCancelDelete} // Cancelar eliminación
        />
      )}
    </div>
  );
};

export default BranchList;
