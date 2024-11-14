import { useState } from 'react';
import BranchList from './Components/BranchList';
import RegisterBranch from './Components/RegisterBranch';
import { FaImage, FaTextWidth, FaEdit } from 'react-icons/fa';

const BranchesPage = () => {
  const [showManageBranches, setShowManageBranches] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleManageBranchesClick = () => {
    setShowManageBranches(!showManageBranches);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Gestión de Sucursales</h1>
        
        <div className="text-center mb-8">
          <button
            onClick={handleManageBranchesClick}
            className="bg-blue-600 text-white py-3 px-8 rounded-full hover:bg-blue-700 transition-all shadow-lg"
          >
            <FaEdit className="inline-block mr-2" /> Gestionar Sucursales
          </button>
        </div>

        {/* Sección de gestión de sucursales */}
        {showManageBranches && (
          <div className="bg-white p-6 rounded-lg shadow-xl mb-10">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">¿Qué deseas hacer?</h2>
            <div className="flex justify-center gap-8">
              <button
                onClick={() => setSelectedOption('image')}
                className={`${
                  selectedOption === 'image' ? 'bg-green-500' : 'bg-green-400'
                } text-white py-3 px-8 rounded-full hover:bg-green-600 transition-all`}
              >
                <FaImage className="mr-2" /> Subir Imagen
              </button>
              <button
                onClick={() => setSelectedOption('text')}
                className={`${
                  selectedOption === 'text' ? 'bg-blue-500' : 'bg-blue-400'
                } text-white py-3 px-8 rounded-full hover:bg-blue-600 transition-all`}
              >
                <FaTextWidth className="mr-2" /> Subir Texto
              </button>
            </div>

            {/* Selección de imagen o texto */}
            {selectedOption === 'image' && (
              <div className="mt-6">
                <input type="file" className="block w-full mb-4 p-2" />
                <label className="text-lg">Selecciona las sucursales a las que deseas publicar esta imagen</label>
                <select className="block w-full mt-2 p-2 border rounded-md">
                  <option value="all">Todas las sucursales</option>
                  <option value="specific">Seleccionar sucursales</option>
                </select>
              </div>
            )}

            {selectedOption === 'text' && (
              <div className="mt-6">
                <textarea
                  rows="4"
                  placeholder="Escribe tu mensaje aquí..."
                  className="block w-full p-2 border rounded-md"
                ></textarea>
                <label className="text-lg mt-4">Selecciona las sucursales a las que deseas publicar este mensaje</label>
                <select className="block w-full mt-2 p-2 border rounded-md">
                  <option value="all">Todas las sucursales</option>
                  <option value="specific">Seleccionar sucursales</option>
                </select>
              </div>
            )}

            {/* Botón de confirmación */}
            <div className="mt-8 text-center">
              <button className="bg-yellow-500 text-white py-3 px-8 rounded-full hover:bg-yellow-600 transition-all">
                Confirmar
              </button>
            </div>
          </div>
        )}

        {/* Lista de sucursales y registro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BranchList />
          <RegisterBranch />
        </div>
      </div>
    </div>
  );
};

export default BranchesPage;
