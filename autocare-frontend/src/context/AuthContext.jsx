import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {

        const savedUser = localStorage.getItem("user");

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

    }, []);

    const login = (loginResponse) => {

        localStorage.setItem("token", loginResponse.token);

        localStorage.setItem(
            "user",
            JSON.stringify({
                fullName: loginResponse.fullName,
                email: loginResponse.email,
                role: loginResponse.role,
            })
        );

        setToken(loginResponse.token);

        setUser({
            fullName: loginResponse.fullName,
            email: loginResponse.email,
            role: loginResponse.role,
        });

    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>

    );
}

export function useAuth() {
    return useContext(AuthContext);
}