import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext<{
    isAuthenticated: boolean | undefined;
    login: (email: string, password: string) => void;
    logout: () => void;
    register: (email: string, password: string, username: string, profileUrl: string) => void;
    user: null;
}>({
    isAuthenticated: undefined,
    login: () => {},
    logout: () => {},
    register: () => {},
    user: null,
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        /** onAuthStateChanged */
        let timer: NodeJS.Timeout;

        timer = setTimeout(() => {
            setIsAuthenticated(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const login = async (email: string, password: string) => {
        try {
        } catch (error) {}
    };

    const logout = async () => {
        try {
        } catch (error) {}
    };

    const register = async (email: string, password: string, username: string, profileUrl: string) => {
        try {
        } catch (error) {}
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, register, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error('useAuth must be wrapped inside AuthProvider');
    }

    return { ...value };
};
