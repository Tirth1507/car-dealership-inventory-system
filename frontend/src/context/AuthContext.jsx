import { createContext, useContext, useEffect, useState } from "react";
import { getToken, setToken, removeToken } from "../utils/token";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setAuthToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedToken = getToken();

        if (storedToken) {
            setAuthToken(storedToken);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (jwtToken) => {
        setToken(jwtToken);
        setAuthToken(jwtToken);
        setIsAuthenticated(true);
    };

    const logout = () => {
        removeToken();
        setAuthToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}