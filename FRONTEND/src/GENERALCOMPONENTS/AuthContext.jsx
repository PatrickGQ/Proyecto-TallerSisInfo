import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, logoutRequest } from "../api/authentication.js";
import { getProductsRequest } from "../api/product";
import { validateTokenRequest } from "../api/authentication";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("Use Auth must be used within an AuthProvider");
    return context;
};
export const useUser = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useUser must be used within an AuthProvider");
    return context.user; // o context según como lo quieras manejar
};
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);  
    const [isLoading, setIsLoading] = useState(true);

    const signIn = async (data) => {
        try {
            const res = await loginRequest(data);
            if (res && res.data) { // Asegúrate de que la respuesta tenga datos
                setUser({ 
                    name: res.data.name, 
                    email: res.data.email, 
                    role: res.data.role // Asegúrate de que estás guardando el rol aquí
                });
                setIsAuthenticated(true);
            }
            return res;
        } catch (e) {
            return { isError: true, error: e };
        }
    };
    
    

    const logOut = async () => {
        try {
            const res = await logoutRequest();
            setUser(null);
            setIsAuthenticated(false);
        } catch(e) {
            console.log(e);
        }
    }

    const getProducts = async () => {
        try {
            const res = await getProductsRequest();
            return res;
        } catch (e) {
            return { isError: true, error: e };
        }
    }
    
    useEffect(() => {
        const verifyJWT = async () => {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setUser(null);
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }
            try {
                const res = await validateTokenRequest();
                // Asegúrate de que la respuesta contenga el rol de usuario
                setUser({ 
                    name: res.data.name, 
                    email: res.data.email,
                    role: res.data.role // Agregar el rol del usuario
                });
                setIsAuthenticated(true);
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        }
        verifyJWT();
    }, []);

    return (
        <AuthContext.Provider 
            value={{
                signIn,
                logOut,
                getProducts,
                setUser,
                user,
                isAuthenticated,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
