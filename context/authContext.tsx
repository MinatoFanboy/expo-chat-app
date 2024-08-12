import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { auth, db } from '@/firebaseConfig';

interface IUser {
    username: string;
    profileUrl: string;
    userId: string;
}

interface AuthContextType {
    isAuthenticated: boolean | undefined;
    login: (email: string, password: string) => void;
    logout: () => void;
    register: (email: string, password: string, username: string, profileUrl: string) => void;
    user: IUser | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        /** onAuthStateChanged */
        const unSubscriber = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUser(user as any);
                updateUserData(user.uid);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });

        return unSubscriber;
    }, []);

    const updateUserData = async (userId: string) => {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let data = docSnap.data();

            setUser((prev) => {
                if (prev) {
                    return { ...prev, username: data.username, profileUrl: data.profileUrl, userId: data.userId };
                }
                return null;
            });
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);

            return { data: response?.user, success: true };
        } catch (error: any) {
            let msg = error.message;
            if (msg.include('(auth/invalid-email)')) {
                msg = 'Invalid email';
            }
            if (msg.include('(auth/invalid-credential)')) {
                msg = 'Invalid credential';
            }

            return { msg, success: false };
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);

            return { success: true };
        } catch (error: any) {
            return { error, msg: error.message, success: false };
        }
    };

    const register = async (email: string, password: string, username: string, profileUrl: string) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);

            await setDoc(doc(db, 'users', response?.user?.uid), {
                username,
                profileUrl,
                userId: response?.user?.uid,
            });

            return { data: response?.user, success: true };
        } catch (error: any) {
            let msg = error.message;
            if (msg.include('(auth/invalid-email)')) {
                msg = 'Invalid email';
            }
            if (msg.include('(auth/email-already-in-use)')) {
                msg = 'Email already in use';
            }

            return { msg, success: false };
        }
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
