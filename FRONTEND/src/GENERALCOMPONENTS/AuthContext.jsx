import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, logoutRequest } from "../api/authentication.js";
import { getProductsRequest } from "../api/product";
import { validateTokenRequest } from "../api/authentication";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error("Use Auth must be used within an AuthProvider");
    return context;
};


export const AuthProvider = ( { children } ) => {
    const [ user, setUser ] = useState(null);
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);  
    const [ isLoading, setIsLoading ] = useState(true);

    const signIn = async (data) => {
        try {
            const res = await loginRequest(data);
            console.log(res);
            setIsAuthenticated(true);
            return res;
        } catch(e){
            return {isError: true, error: e};
        }
    }

    const logOut = async () => {
        try{
            const res = await logoutRequest();
            setUser(null);
            setIsAuthenticated(false);
        } catch(e){
            console.log(e);
        }
    }

    const getProducts = async () => {
        try {
            const res = await getProductsRequest();
            return res;
        } catch (e) {
            return {isError: true, error: e};
        }
    }
    
    useEffect( () => {
        const verifyJWT = async () => {
            const cookies = Cookies.get();
            if(!cookies.token) {
                setUser(null),
                setIsAuthenticated(false);
                setIsLoading(false);
            }
            try {
                const res = await validateTokenRequest();
                setUser({name: res.data.name, email: res.data.email})
                setIsAuthenticated(true);
                setIsLoading(false);
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false);
                setIsLoading(false);
            }    
        }
        verifyJWT();
    },[]);

    return (
        <>
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
            { children }
        </AuthContext.Provider>
        </>
    )
};