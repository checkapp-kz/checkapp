import { createContext, useState, useEffect, ReactNode } from "react";
import { login, logout, getUserProfile } from "../utils/authService";

interface AuthContextType {
    user: any | null;
    handleLogin: (email: string, password: string) => Promise<void>;
    handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUserProfile();
            setUser(userData);
        };
        fetchUser();
    }, []);

    const handleLogin = async (email: string, password: string) => {
        await login(email, password);
        const userData = await getUserProfile();
        setUser(userData);
    };

    const handleLogout = () => {
        logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
