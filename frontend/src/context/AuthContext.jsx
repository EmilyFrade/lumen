import { createContext, useContext, useEffect, useState } from "react";
import { login as loginService, getCurrentUser } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const authenticated = !!user;

    async function login(email, password) {
        await loginService(email, password);

        const userData = await getCurrentUser();
        setUser(userData);
    }

    function logout() {
        localStorage.removeItem("auth");
        setUser(null);
    }

    useEffect(() => {
        async function loadUser() {
            const token = localStorage.getItem("auth");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const userData = await getCurrentUser();
                setUser(userData);
            } catch {
                logout();
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, authenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
