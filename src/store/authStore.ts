import { create } from 'zustand';
import type { User } from '../types/user';
import { mockUsers } from '../data/mockUsers';

type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    login: (id: string, password: string, issueCode?: string) => Promise<boolean>;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,

    login: async (id: string, password: string, issueCode?: string) => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const user = mockUsers.find(
            (u) => u.id === id && u.password === password
        );

        if (user) {
            if (issueCode && user.issueCode !== issueCode) {
                return false;
            }

            const { password: _, ...userWithoutPassword } = user;
            set({ user: userWithoutPassword, isAuthenticated: true });

            localStorage.setItem('user', JSON.stringify(userWithoutPassword));
            localStorage.setItem('isAuthenticated', 'true');

            return true;
        }

        return false;
    },

    logout: () => {
        set({ user: null, isAuthenticated: false });
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
    },
}));

const storedUser = localStorage.getItem('user');
const storedAuth = localStorage.getItem('isAuthenticated');

if (storedUser && storedAuth === 'true') {
    useAuthStore.setState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
    });
}
