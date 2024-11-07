import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaBuilding, FaUniversity, FaChevronDown } from 'react-icons/fa';
import { useAuth } from '../GENERALCOMPONENTS/AuthContext';
import { getBranchsRequest } from '../api/branch.js'; // Asegúrate de tener esta función de API importada

const UserProfile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Estado para los campos editables
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedEmail, setEditedEmail] = useState(user?.email || '');
  const [editedPhone, setEditedPhone] = useState(user?.phone || '');
  const [editedUniversity, setEditedUniversity] = useState(user?.university || '');
  const [editedPosition, setEditedPosition] = useState(user?.position || '');
  const [selectedBranch, setSelectedBranch] = useState(user?.branch || '');
  const [selectedRole, setSelectedRole] = useState(user?.role || ''); // Estado para el rol
  const [showBranches, setShowBranches] = useState(false); // Para controlar si se muestra el listado de sucursales
  const [showRoleDropdown, setShowRoleDropdown] = useState(false); // Para controlar si se muestra el dropdown del rol
  const branchesRef = useRef(null);

  // Lista de sucursales (esto debería venir de una fuente de datos o API real)
  const [branches, setBranches] = useState([]);

  // Obtener las sucursales desde la API cuando el componente se monte
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await getBranchsRequest(); // Llamada a la API para obtener las sucursales
        setBranches(response.data); // Asigna las sucursales al estado
      } catch (error) {
        console.error('Error al obtener las sucursales:', error);
      }
    };

    fetchBranches();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // Manejo del clic fuera del dropdown de sucursales
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

  // Maneja el envío del formulario de edición (solo en la vista, no en el backend)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Actualiza el usuario solo en el estado local
    const updatedUser = {
      ...user,
      name: editedName,
      email: editedEmail,
      phone: editedPhone,
      university: editedUniversity,
      position: editedPosition,
      branch: selectedBranch,
      role: selectedRole || user.role, // Usa el rol actual si no se selecciona uno nuevo
    };

    updateUser(updatedUser); // Actualiza el estado del usuario

    setIsEditing(false); // Termina la edición
  };

  // Función para manejar el cambio de sucursal
  const handleBranchChange = (branch) => {
    setSelectedBranch(branch);
    setShowBranches(false); // Cierra el dropdown una vez se selecciona una sucursal
  };

  // Función para manejar el cambio de rol
  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setShowRoleDropdown(false); // Cierra el dropdown de roles una vez se selecciona un rol
  };

  // Lista de roles
  const roleList = ['Admin', 'Worker', 'Client']; // Los roles permitidos

  if (!user) {
    return <div>No estás autenticado</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-2/3 bg-white p-8 rounded-lg shadow-lg flex">
        {/* Left Section - User Information */}
        <div className="w-1/2 border-r border-gray-300 p-6">
          <div className="flex items-center mb-4">
            <FaUser className="text-6xl text-gray-400" />
            <div className="ml-4">
              <h2 className="text-xl font-bold">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="border-b border-gray-300 focus:outline-none"
                  />
                ) : (
                  editedName
                )}
                <span className="text-gray-500">(He/Him)</span>
              </h2>
              <button className="text-blue-600 hover:underline text-sm">Verify now</button>
            </div>
          </div>
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedPosition}
                onChange={(e) => setEditedPosition(e.target.value)}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                placeholder="Position"
              />
              <input
                type="text"
                value={editedPhone}
                onChange={(e) => setEditedPhone(e.target.value)}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                placeholder="Phone"
              />
              <input
                type="text"
                value={editedUniversity}
                onChange={(e) => setEditedUniversity(e.target.value)}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                placeholder="University"
              />
              <input
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                placeholder="Email"
              />
            </>
          ) : (
            <>
              <p className="text-gray-600 text-lg mb-1">{editedPosition}</p>
              <p className="text-gray-500">{editedPhone}</p>
              <p className="text-gray-500">{editedUniversity}</p>
              <p className="text-gray-500">{editedEmail}</p>
              <p className="text-gray-500 mt-4"><strong>Role:</strong> {selectedRole || user.role}</p> {/* Mostrar el rol */}
            </>
          )}

          <button className="text-blue-600 hover:underline text-sm">Contact info</button>
          <p className="text-gray-600 text-lg mt-4">{editedPhone}</p>

          {/* Edit and Save buttons */}
          <div className="flex space-x-4 mt-6">
            {isEditing ? (
              <button onClick={handleSubmit} className="border border-black py-2 px-4 rounded hover:bg-gray-200">
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="border border-black py-2 px-4 rounded hover:bg-gray-200"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="border border-black py-2 px-4 rounded hover:bg-gray-200"
            >
              Change Role
            </button>
          </div>
        </div>

        {/* Right Section - Additional Information */}
        <div className="w-1/2 p-6">
          <div className="flex items-center mb-4">
            <FaBuilding className="text-xl text-black" />
            <button
              type="button"
              onClick={() => setShowBranches(!showBranches)}
              className="ml-2 p-2 border border-gray-300 rounded w-full flex justify-between"
            >
              {selectedBranch || 'Seleccionar Sucursal'}
              <FaChevronDown className="text-gray-500" />
            </button>
            {showBranches && (
              <div
                ref={branchesRef}
                className="absolute w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-40 overflow-auto z-10"
              >
                {branches.length > 0 ? (
                  branches.map((branch) => (
                    <div
                      key={branch._id || branch.nameBranch} // Usa _id o nameBranch como key
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleBranchChange(branch.nameBranch)}
                    >
                      {branch.nameBranch}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">No branches available</div>
                )}
              </div>
            )}
          </div>

          {/* Role Dropdown */}
          {showRoleDropdown && (
            <div className="absolute bg-white border border-gray-300 rounded shadow-lg mt-1 z-10">
              {roleList.map((role) => (
                <div
                  key={role}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleRoleChange(role)}
                >
                  {role}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
