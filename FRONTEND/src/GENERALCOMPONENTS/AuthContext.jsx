import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, logoutRequest, validateTokenRequest } from "../api/authentication";
import Cookies from 'js-cookie';

// Creamos el contexto de autenticación
export const AuthContext = createContext();

// Hook para acceder al contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

// Componente que provee el contexto de autenticación
export const AuthProvider = ({ children }) => {
  // Inicializamos el estado con el token y los datos del usuario almacenados
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get("token"));
  const [isLoading, setIsLoading] = useState(true);

  // Función para iniciar sesión
  const signIn = async (data) => {
    try {
      const res = await loginRequest(data);
      if (res && res.data) {
        const { token, foundUser } = res.data;

        // Guardamos el token en una cookie y los datos del usuario en localStorage
        Cookies.set("token", token, { expires: 1 }); // El token dura 1 día
        localStorage.setItem("user", JSON.stringify({
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
          phone: foundUser.phone,
          university: foundUser.university,
          position: foundUser.position,
        }));

        setUser({
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
          phone: foundUser.phone,
          university: foundUser.university,
          position: foundUser.position,
        });
        setIsAuthenticated(true);
      }
      return res;
    } catch (e) {
      console.error("Error al iniciar sesión:", e);
      return { isError: true, error: e };
    }
  };

  // Función para cerrar sesión
  const logOut = async () => {
    try {
      await logoutRequest();
      Cookies.remove("token");
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
    } catch (e) {
      console.log("Error al cerrar sesión:", e);
    }
  };

  // Función para actualizar los datos del usuario
  const updateUser = (updatedUserData) => {
    setUser(updatedUserData); // Actualizamos el estado
    localStorage.setItem("user", JSON.stringify(updatedUserData)); // Guardamos en localStorage
  };

  // useEffect para verificar el token al recargar la página
  useEffect(() => {
    const verifyJWT = async () => {
      const token = Cookies.get("token");

      // Si no hay token, no hay usuario autenticado
      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        // Validar el token con la API
        const res = await validateTokenRequest();
        if (res && res.data) {
          const userData = {
            name: res.data.name,
            email: res.data.email,
            role: res.data.role,
            phone: res.data.phone,  // Suponiendo que también te pasen el teléfono y otros datos
            university: res.data.university,
            position: res.data.position,
          };

          // Si el token es válido, actualizamos el estado
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(userData)); // Guardamos en localStorage
        } else {
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.log("Error al validar el token:", error);
        setUser(null);
        setIsAuthenticated(false);
        Cookies.remove("token");
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    verifyJWT();
  }, []);

  return (
    <AuthContext.Provider value={{
      signIn,
      logOut,
      updateUser,
      user,
      isAuthenticated,
      isLoading,
    }}>
      {!isLoading ? children : <div>Loading...</div>} {/* Solo muestra los hijos si la carga se completó */}
    </AuthContext.Provider>
  );
};
