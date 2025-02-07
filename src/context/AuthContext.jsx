import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const username = localStorage.getItem("username");
        if (token && username) {
            setUser({ token, username });
        }
        setLoading(false); // Marca la carga como terminada
    }, []);

    const loginUser = (token, username) => {
        setUser({ token, username });
        localStorage.setItem("accessToken", token);
        localStorage.setItem("username", username);
    };

    const logoutUser = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("username");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
