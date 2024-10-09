import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../AuthContext';
import { validatePasswordRequest } from '../../../api/authentication';
import ErrorModal from '../../ErrorModal';

const AuthenticationPassComponent = ({ setIsAuthenticated , onClose }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleContinue = async () => {
    try {
      const res = await validatePasswordRequest({ email: user.email, password: password });
      setIsAuthenticated();
      console.log(res);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Autenticación requerida</h2>
          <p className="mb-4">Digite la contraseña de la cuenta:</p>
          <div className="mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded"
              placeholder="Contraseña"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleContinue}
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Continuar
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
      {error && <ErrorModal error={error} setError={setError} />}
    </>
  );
};

export default AuthenticationPassComponent;
