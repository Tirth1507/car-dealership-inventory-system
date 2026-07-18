import { createContext, useContext, useEffect, useState } from "react";
import { getToken, setToken, removeToken } from "../utils/token";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setAuthToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {

        const storedToken = getToken();
        const storedUser = localStorage.getItem("user");

        if (storedToken) {

            setAuthToken(storedToken);

            setIsAuthenticated(true);

        }

        if (storedUser) {

            setUser(JSON.parse(storedUser));

        }

    }, []);

    const login = (jwtToken, userData) => {

        setToken(jwtToken);

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        setAuthToken(jwtToken);

        setUser(userData);

        setIsAuthenticated(true);

    };

    const logout = () => {

        removeToken();

        localStorage.removeItem("user");

        setAuthToken(null);

        setUser(null);

        setIsAuthenticated(false);

    };

    return (

        <AuthContext.Provider
            value={{
                token,
                user,
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